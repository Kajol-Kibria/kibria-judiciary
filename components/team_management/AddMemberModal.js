'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IoClose } from "react-icons/io5";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { FaUser, FaEnvelope, FaWhatsapp } from "react-icons/fa";

export default function AddMemberModal({showInviteModal, setShowInviteModal}) {
  

  const [inviteForm, setInviteForm] = useState({
    fullName: '',
    whatsappNumber: '',
    email: '',
    role: 'Junior Associate',
    permissions: {
      viewCases: true,
      editCases: false,
      deleteCases: false,
      viewDocuments: true,
      uploadDocuments: false,
      deleteDocuments: false,
      viewCalendar: true,
      addEvents: false,
      viewFinancialData: false,
      manageFinancialData: false,
      viewTeam: true,
      manageTeam: false
    }
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInviteForm({
      ...inviteForm,
      [name]: value
    });
  };

  const handlePermissionChange = (permission) => {
    setInviteForm({
      ...inviteForm,
      permissions: {
        ...inviteForm.permissions,
        [permission]: !inviteForm.permissions[permission]
      }
    });
  };

  const handleSendInvitation = () => {
    // Process form submission here
    console.log('Invitation form submitted:', inviteForm);
    // Reset form and close modal
    setInviteForm({
      fullName: '',
      whatsappNumber: '',
      email: '',
      role: 'Junior Associate',
      permissions: {
        viewCases: true,
        editCases: false,
        deleteCases: false,
        viewDocuments: true,
        uploadDocuments: false,
        deleteDocuments: false,
        viewCalendar: true,
        addEvents: false,
        viewFinancialData: false,
        manageFinancialData: false,
        viewTeam: true,
        manageTeam: false
      }
    });
    setShowInviteModal(false);
  };
  
  const roleOptions = [
    'Junior Associate',
    'Senior Advocate',
    'Paralegal',
    'Intern',
    'Legal Assistant'
  ];


  const closeModal = () => {
    setShowInviteModal(false);
  };

  return (
    <AnimatePresence>
    {showInviteModal && (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        onClick={closeModal}
      >
        <motion.div 
          className="bg-white rounded-xl w-full max-w-md mx-4"
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
        >
          <div className="h-[90vh] overflow-y-auto p-5 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <style jsx>{`
              .scrollbar-hide::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-xl font-bold text-[#171717] flex items-center">
                <FaUser className="mr-2" size={20} />
                Invite Team Member
              </h3>
              <button 
                onClick={closeModal} 
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <IoClose className="text-xl text-gray-500" />
              </button>
            </div>
            
            {/* Info banner */}
            <div className="bg-[#171717]/5 rounded-lg p-4 mb-6 flex items-start">
              <IoMdInformationCircleOutline className="text-[#171717] text-xl mt-0.5 mr-3 flex-shrink-0" />
              <p className="text-[#171717] text-sm">
                Invite a team member to collaborate on cases and tasks. They will receive an invitation via Email and WhatsApp.
              </p>
            </div>

            {/* Form fields */}
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaUser className="text-gray-500" />
                </div>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={inviteForm.fullName}
                  onChange={handleInputChange}
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#171717]"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaWhatsapp className="text-gray-500" />
                </div>
                <input
                  type="text"
                  name="whatsappNumber"
                  placeholder="WhatsApp Number"
                  value={inviteForm.whatsappNumber}
                  onChange={handleInputChange}
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#171717]"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaEnvelope className="text-gray-500" />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={inviteForm.email}
                  onChange={handleInputChange}
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#171717]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <div className="relative">
                  <select
                    name="role"
                    value={inviteForm.role}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-1 focus:ring-[#171717]"
                  >
                    {roleOptions.map((role) => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Permissions</label>
                <div className="border border-gray-300 rounded-lg p-4 space-y-3">
                  {[
                    { key: 'viewCases', label: 'View Cases' },
                    { key: 'editCases', label: 'Edit Cases' },
                    { key: 'deleteCases', label: 'Delete Cases' },
                    { key: 'viewDocuments', label: 'View Documents' },
                    { key: 'uploadDocuments', label: 'Upload Documents' },
                    { key: 'deleteDocuments', label: 'Delete Documents' },
                    { key: 'viewCalendar', label: 'View Calendar' },
                    { key: 'addEvents', label: 'Add Events' },
                    { key: 'viewFinancialData', label: 'View Financial Data' },
                    { key: 'manageFinancialData', label: 'Manage Financial Data' },
                    { key: 'viewTeam', label: 'View Team' },
                    { key: 'manageTeam', label: 'Manage Team' }
                  ].map((permission) => (
                    <div key={permission.key} className="flex items-center justify-between">
                      <span className="text-gray-700">{permission.label}</span>
                      <div 
                        onClick={() => handlePermissionChange(permission.key)}
                        className={`w-5 h-5 border ${inviteForm.permissions[permission.key] ? 'bg-[#171717] border-[#171717]' : 'bg-white border-gray-300'} rounded flex items-center justify-center cursor-pointer`}
                      >
                        {inviteForm.permissions[permission.key] && (
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                          </svg>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-6">
              <button 
                onClick={closeModal}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSendInvitation}
                disabled={!inviteForm.fullName.trim() || !inviteForm.email.trim()}
                className={`flex-1 px-4 py-2 rounded-lg text-white transition-colors ${
                  inviteForm.fullName.trim() && inviteForm.email.trim()
                    ? 'bg-[#171717] hover:bg-gray-800' 
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                Send Invitation
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
  )
}
