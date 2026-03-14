'use client'
import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IoClose } from 'react-icons/io5'
import { FiUpload } from 'react-icons/fi'
import { Checkbox } from '@/components/ui/checkbox'
import Image from 'next/image'



export default function AddDocument({ showUploadModal, setShowUploadModal }) {




    const [documentTitle, setDocumentTitle] = useState('');
    const [documentType, setDocumentType] = useState('');
    const [dragActive, setDragActive] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedTags, setSelectedTags] = useState([]);
    const [customTag, setCustomTag] = useState('');
    const fileInputRef = useRef(null);


  // Document type options
  const documentTypes = [
    "Petition",
    "Order",
    "Evidence",
    "Miscellaneous"
  ];

  // Suggested tags based on document type
  const suggestedTags = {
    "Petition": ["Initial", "Amended", "Supplemental", "Reply", "Emergency"],
    "Order": ["Temporary", "Final", "Consent", "Default", "Dismissal"],
    "Evidence": ["Photograph", "Statement", "Medical", "Expert", "Exhibit"],
    "Miscellaneous": ["Brief", "Memo", "Letter", "Receipt", "Notice"]
  };

  // Add a tag to selected tags
  const addTag = (tag) => {
    if (!selectedTags.includes(tag) && tag.trim() !== '') {
      setSelectedTags([...selectedTags, tag]);
    }
    setCustomTag('');
  };

  // Remove a tag
  const removeTag = (tagToRemove) => {
    setSelectedTags(selectedTags.filter(tag => tag !== tagToRemove));
  };

  // Handle custom tag input
  const handleCustomTagKeyDown = (e) => {
    if (e.key === 'Enter' && customTag.trim() !== '') {
      e.preventDefault();
      addTag(customTag);
    }
  };

  // Handle drag events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // Handle drop event
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      handleFileValidation(file);
    }
  };

  // Handle file input change
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      handleFileValidation(file);
    }
  };

  // Validate file type
  const handleFileValidation = (file) => {
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png'];
    const fileExtension = file.name.split('.').pop().toLowerCase();
    const validExtensions = ['pdf', 'docx', 'jpg', 'jpeg', 'png'];
    
    if (validTypes.includes(file.type) || validExtensions.includes(fileExtension)) {
      setSelectedFile(file);
    } else {
      alert('Please upload a valid file (PDF, DOCX, JPG, PNG)');
    }
  };

  // Handle button click to open file dialog
  const onButtonClick = () => {
    fileInputRef.current.click();
  };

  // Toggle individual user access
  const toggleUserAccess = (userId) => {
    const updatedUsers = accessControl.users.map(user => 
      user.id === userId ? { ...user, checked: !user.checked } : user
    );
    
    // Check if all users are selected
    const allChecked = updatedUsers.every(user => user.checked);
    
    setAccessControl({
      allUsers: allChecked,
      users: updatedUsers
    });
  };

  // Toggle all users access
  const toggleAllAccess = () => {
    const newAllUsersState = !accessControl.allUsers;
    
    setAccessControl({
      allUsers: newAllUsersState,
      users: accessControl.users.map(user => ({
        ...user,
        checked: newAllUsersState
      }))
    });
  };

  // Update the handleSubmit function
  const handleSubmit = () => {
    if (documentTitle && documentType && selectedFile) {
      // Extract just the access control state for submission
      const accessPermissions = accessControl.users.reduce((acc, user) => {
        acc[user.id] = user.checked;
        return acc;
      }, {});
      
      // Here you would typically upload the file to your server
      console.log('Uploading:', {
        title: documentTitle,
        type: documentType,
        file: selectedFile,
        tags: selectedTags,
        access: accessPermissions
      });
      
      // Reset form
      setDocumentTitle('');
      setDocumentType('');
      setSelectedFile(null);
      setSelectedTags([]);
      setCustomTag('');
      setAccessControl({
        allUsers: false,
        users: [
          { id: 'client1', name: 'Robert Johnson', role: 'Client', checked: true, avatar: null, initials: 'RJ' },
          { id: 'team1', name: 'Sarah Williams', role: 'Lead Attorney', checked: true, avatar: '/avatars/sarah.png', initials: 'SW' },
          { id: 'team2', name: 'David Chen', role: 'Paralegal', checked: true, avatar: null, initials: 'DC' },
          { id: 'judge1', name: 'Hon. Maria Rodriguez', role: 'Judge', checked: false, avatar: null, initials: 'MR' },
          { id: 'opposing1', name: 'James Wilson', role: 'Opposing Counsel', checked: false, avatar: '/avatars/james.png', initials: 'JW' },
          { id: 'public', name: 'Public Access', role: 'Anyone with link', checked: false, avatar: null, initials: 'PA' }
        ]
      });
      setShowUploadModal(false);
    } else {
      alert('Please fill all required fields and upload a file');
    }
  };

  const [accessControl, setAccessControl] = useState({
    allUsers: false,
    users: [
      { id: 'client1', name: 'Robert Johnson', role: 'Client', checked: true, avatar: null, initials: 'RJ' },
      { id: 'team1', name: 'Sarah Williams', role: 'Lead Attorney', checked: true, avatar: '/avatars/sarah.png', initials: 'SW' },
      { id: 'team2', name: 'David Chen', role: 'Paralegal', checked: true, avatar: null, initials: 'DC' },
      { id: 'judge1', name: 'Hon. Maria Rodriguez', role: 'Judge', checked: false, avatar: null, initials: 'MR' },
      { id: 'opposing1', name: 'James Wilson', role: 'Opposing Counsel', checked: false, avatar: '/avatars/james.png', initials: 'JW' },
      { id: 'public', name: 'Public Access', role: 'Anyone with link', checked: false, avatar: null, initials: 'PA' }
    ]
  });




  return (
<AnimatePresence>
          {showUploadModal && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
              onClick={() => setShowUploadModal(false)}
            >
              <motion.div 
                className="bg-white rounded-xl w-full max-w-md"
                onClick={(e) => e.stopPropagation()}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
              >
                <div className="h-[90vh] overflow-y-auto p-5">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-[#171717]">Add Document</h3>
                  <button 
                    onClick={() => setShowUploadModal(false)}
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    <IoClose className="text-xl text-gray-500" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  {/* Document Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Document Title
                    </label>
                    <input
                      type="text"
                      value={documentTitle}
                      onChange={(e) => setDocumentTitle(e.target.value)}
                      placeholder="Enter document title"
                      className="w-full p-2 border rounded-md text-sm appearance-none"
                    />
                  </div>
                  
                  {/* Document Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Document Type
                    </label>
                    <select
                      value={documentType}
                      onChange={(e) => setDocumentType(e.target.value)}
                      className="w-full p-2 border rounded-md text-sm appearance-none"
                    >
                      <option value="">Select document type</option>
                      {documentTypes.map((type, index) => (
                        <option key={index} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  
                  {/* File Upload Area */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Upload File
                    </label>
                    <div 
                      className={`border-2 border-dashed rounded-lg p-6 text-center ${dragActive ? 'border-[#171717] bg-gray-50' : 'border-gray-300'}`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        onChange={handleFileChange}
                        accept=".pdf,.docx,.jpg,.jpeg,.png"
                        className="hidden"
                      />
                      
                      {selectedFile ? (
                        <div className="flex items-center justify-center gap-3">
                          <div className="p-2 bg-gray-100 rounded-full">
                            {getFileIcon(selectedFile.name)}
                          </div>
                          <div className="text-left">
                            <p className="font-medium text-[#171717] text-sm truncate max-w-[200px]">
                              {selectedFile.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                            </p>
                          </div>
                          <button 
                            onClick={() => setSelectedFile(null)}
                            className="p-1 hover:bg-gray-200 rounded-full ml-auto"
                          >
                            <IoClose className="text-gray-500" />
                          </button>
                        </div>
                      ) : (
                        <div>
                          <FiUpload className="mx-auto text-gray-400 text-3xl mb-2" />
                          <p className="text-gray-500 mb-1">Drag & drop your file here</p>
                          <p className="text-gray-400 text-xs mb-3">Supported formats: PDF, DOCX, JPG, PNG</p>
                          <button
                            type="button"
                            onClick={onButtonClick}
                            className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
                          >
                            Browse Files
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Tags Section */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tags
                    </label>
                    
                    {/* Selected Tags */}
                    <div className="flex flex-wrap gap-2 mb-2">
                      {selectedTags.map((tag, index) => (
                        <div 
                          key={index} 
                          className="bg-gray-100 rounded-full px-3 py-1 text-sm flex items-center"
                        >
                          <span className="text-gray-800">{tag}</span>
                          <button 
                            onClick={() => removeTag(tag)}
                            className="ml-1 text-gray-500 hover:text-gray-700"
                          >
                            <IoClose className="text-xs" />
                          </button>
                        </div>
                      ))}
                    </div>
                    
                    {/* Custom Tag Input */}
                    <div className="flex mb-2">
                      <input
                        type="text"
                        value={customTag}
                        onChange={(e) => setCustomTag(e.target.value)}
                        onKeyDown={handleCustomTagKeyDown}
                        placeholder="Add a custom tag (press Enter)"
                        className="w-full p-2 border rounded-md text-sm appearance-none"
                      />
                      {customTag && (
                        <button
                          onClick={() => addTag(customTag)}
                          className="ml-2 px-3 py-1 bg-gray-100 rounded-md text-sm"
                        >
                          Add
                        </button>
                      )}
                    </div>
                    
                    {/* Suggested Tags */}
                    {documentType && suggestedTags[documentType] && (
                      <div>
                        <p className="text-xs text-gray-500 mb-2">Suggested tags for {documentType}:</p>
                        <div className="flex flex-wrap gap-2">
                          {suggestedTags[documentType].map((tag, index) => (
                            <button
                              key={index}
                              onClick={() => addTag(tag)}
                              className={`px-3 py-1 text-xs rounded-full transition-colors ${
                                selectedTags.includes(tag) 
                                  ? 'bg-gray-300 text-gray-700 cursor-default' 
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                              disabled={selectedTags.includes(tag)}
                            >
                              {tag}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Access Control Section */}
                  <div>
                    <div className="">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label htmlFor="all-access" className="text-sm flex items-center">
                            <span className="font-medium">Access Control</span>
                          </label>
                          <Checkbox 
                            id="all-access"
                            checked={accessControl.allUsers}
                            onCheckedChange={toggleAllAccess}
                          />
                        </div>

                        <div className="border-t border-gray-200 my-2"></div>
                        
                        {/* User list */}
                        <div>
                          {accessControl.users.map((user) => (
                            <div key={user.id} className="flex items-center justify-between py-2">
                              <div className="flex items-center gap-3">
                                {user.avatar ? (
                                  <Image 
                                    width={32}
                                    height={32}
                                    src={user.avatar} 
                                    alt={user.name} 
                                    className="w-8 h-8 rounded-full object-cover"
                                  />
                                ) : (
                                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium">
                                    {user.initials}
                                  </div>
                                )}
                                <div>
                                  <p className="text-sm font-medium">{user.name}</p>
                                  <p className="text-xs text-gray-500">{user.role}</p>
                                </div>
                              </div>
                              <Checkbox 
                                checked={user.checked}
                                onCheckedChange={() => toggleUserAccess(user.id)}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="border-t border-gray-200 mt-3 pt-3">
                        <div className="flex items-center justify-between">
                          <label htmlFor="notify-access" className="text-sm">
                            Notify users when document is uploaded
                          </label>
                          <Checkbox 
                            id="notify-access"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 pt-2">
                    <button 
                      onClick={() => setShowUploadModal(false)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleSubmit}
                      disabled={!documentTitle || !documentType || !selectedFile}
                      className={`flex-1 px-4 py-2 rounded-lg text-white transition-colors ${documentTitle && documentType && selectedFile ? 'bg-[#171717] hover:bg-gray-800' : 'bg-gray-400 cursor-not-allowed'}`}
                    >
                      Upload
                    </button>
                  </div>
                </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
  )
}
