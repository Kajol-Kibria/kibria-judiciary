'use client'
import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IoAdd, IoDocumentOutline, IoEllipsisVertical, IoClose } from 'react-icons/io5'
import { FiDownload, FiEdit, FiShare2, FiTrash2, FiEye, FiUpload, FiCheck } from 'react-icons/fi'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { FaFilePdf, FaFileWord, FaFilePowerpoint, FaFileImage } from 'react-icons/fa'
import Image from 'next/image'
import AddDocument from './AddDocument'

export default function CaseDocuments() {
  const [showUploadModal, setShowUploadModal] = useState(false);

  
  const getFileIcon = (fileName) => {
    if (fileName.endsWith('.pdf')) {
      return <FaFilePdf className="text-red-500" />;
    } else if (fileName.endsWith('.docx') || fileName.endsWith('.doc')) {
      return <FaFileWord className="text-blue-600" />;
    } else if (fileName.endsWith('.pptx') || fileName.endsWith('.ppt')) {
      return <FaFilePowerpoint className="text-orange-600" />;
    } else if (fileName.endsWith('.png')) {
      return <FaFileImage className="text-purple-500" />;
    } else if (fileName.endsWith('.jpg') || fileName.endsWith('.jpeg')) {
      return <FaFileImage className="text-green-500" />;
    } else {
      return <IoDocumentOutline className="text-gray-500" />;
    }
  };

  const [documents, setDocuments] = useState({
    petitions: [
      {
        id: 1,
        name: 'Initial Petition.pdf',
        date: 'Jan 15, 2023',
        size: '1.2 MB'
      },
      {
        id: 2,
        name: 'Amended Petition.docx',
        date: 'Feb 10, 2023',
        size: '1.5 MB'
      }
    ],
    orders: [
      {
        id: 3,
        name: 'Court Order #1.pdf',
        date: 'Feb 22, 2023',
        size: '0.8 MB'
      },
      {
        id: 4,
        name: 'Restraining Order.pptx',
        date: 'Mar 05, 2023',
        size: '1.1 MB'
      }
    ],
    evidence: [
      {
        id: 5,
        name: 'Evidence Report.docx',
        date: 'Mar 10, 2023',
        size: '3.5 MB'
      },
      {
        id: 6,
        name: 'Witness Photo.jpg',
        date: 'Mar 15, 2023',
        size: '2.8 MB'
      },
      {
        id: 7,
        name: 'Crime Scene.png',
        date: 'Mar 16, 2023',
        size: '4.2 MB'
      }
    ],
    miscellaneous: [
      {
        id: 8,
        name: 'Case Brief.pdf',
        date: 'Jan 20, 2023',
        size: '1.7 MB'
      },
      {
        id: 9,
        name: 'Meeting Notes.docx',
        date: 'Feb 05, 2023',
        size: '0.5 MB'
      }
    ]
  });

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div className='w-full'>
        <div className='flex items-center justify-between my-4'>
          <h2 className="text-2xl font-bold text-[#171717]">Documents</h2>
          <button 
            onClick={() => setShowUploadModal(true)}
            className="mybtn text-sm flex items-center justify-center gap-2 group transition-all duration-300 hover:bg-transparent hover:text-[#171717]"
          >
            <IoAdd className="text-lg transition-all duration-300 group-hover:scale-110" />
            Add Document
          </button>
        </div>
        
        <AddDocument showUploadModal={showUploadModal} setShowUploadModal={setShowUploadModal} />
        
        <div className="bg-white rounded-xl p-5">
          {/* Petitions Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-[#171717] mb-3 border-b pb-2">Petitions</h3>
            {documents.petitions.length > 0 ? (
              <div className="space-y-3">
                {documents.petitions.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-200 rounded-full">
                        {getFileIcon(doc.name)}
                      </div>
                      <div>
                        <p className="font-medium text-[#171717]">{doc.name}</p>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span>{doc.date}</span>
                          <span>{doc.size}</span>
                        </div>
                      </div>
                    </div>
                    
                    <Popover>
                      <PopoverTrigger>
                        <p className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                          <IoEllipsisVertical className="text-gray-500" />
                        </p>
                      </PopoverTrigger>
                      <PopoverContent className="w-48 p-2">
                        <div className="space-y-1">
                          <button className="w-full flex items-center gap-2 p-2 text-sm hover:bg-gray-100 rounded-md transition-colors">
                            <FiEye className="text-blue-500" />
                            <span>View Document</span>
                          </button>
                          <button className="w-full flex items-center gap-2 p-2 text-sm hover:bg-gray-100 rounded-md transition-colors">
                            <FiDownload className="text-green-500" />
                            <span>Download</span>
                          </button>
                          <button className="w-full flex items-center gap-2 p-2 text-sm hover:bg-gray-100 rounded-md transition-colors">
                            <FiShare2 className="text-blue-500" />
                            <span>Share</span>
                          </button>
                          <button className="w-full flex items-center gap-2 p-2 text-sm hover:bg-gray-100 rounded-md transition-colors">
                            <FiEdit className="text-orange-500" />
                            <span>Rename</span>
                          </button>
                          <button className="w-full flex items-center gap-2 p-2 text-sm hover:bg-gray-100 rounded-md transition-colors">
                            <FiTrash2 className="text-red-500" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No petition documents available</p>
            )}
          </div>
          
          {/* Orders Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-[#171717] mb-3 border-b pb-2">Orders</h3>
            {documents.orders.length > 0 ? (
              <div className="space-y-3">
                {documents.orders.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-200 rounded-full">
                        {getFileIcon(doc.name)}
                      </div>
                      <div>
                        <p className="font-medium text-[#171717]">{doc.name}</p>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span>{doc.date}</span>
                          <span>{doc.size}</span>
                        </div>
                      </div>
                    </div>
                    
                    <Popover>
                      <PopoverTrigger>
                        <p className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                          <IoEllipsisVertical className="text-gray-500" />
                        </p>
                      </PopoverTrigger>
                      <PopoverContent className="w-48 p-2">
                        <div className="space-y-1">
                          <button className="w-full flex items-center gap-2 p-2 text-sm hover:bg-gray-100 rounded-md transition-colors">
                            <FiEye className="text-blue-500" />
                            <span>View Document</span>
                          </button>
                          <button className="w-full flex items-center gap-2 p-2 text-sm hover:bg-gray-100 rounded-md transition-colors">
                            <FiDownload className="text-green-500" />
                            <span>Download</span>
                          </button>
                          <button className="w-full flex items-center gap-2 p-2 text-sm hover:bg-gray-100 rounded-md transition-colors">
                            <FiShare2 className="text-blue-500" />
                            <span>Share</span>
                          </button>
                          <button className="w-full flex items-center gap-2 p-2 text-sm hover:bg-gray-100 rounded-md transition-colors">
                            <FiEdit className="text-orange-500" />
                            <span>Rename</span>
                          </button>
                          <button className="w-full flex items-center gap-2 p-2 text-sm hover:bg-gray-100 rounded-md transition-colors">
                            <FiTrash2 className="text-red-500" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No order documents available</p>
            )}
          </div>
          
          {/* Evidence Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-[#171717] mb-3 border-b pb-2">Evidence</h3>
            {documents.evidence.length > 0 ? (
              <div className="space-y-3">
                {documents.evidence.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-200 rounded-full">
                        {getFileIcon(doc.name)}
                      </div>
                      <div>
                        <p className="font-medium text-[#171717]">{doc.name}</p>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span>{doc.date}</span>
                          <span>{doc.size}</span>
                        </div>
                      </div>
                    </div>
                    
                    <Popover>
                      <PopoverTrigger>
                        <p className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                          <IoEllipsisVertical className="text-gray-500" />
                        </p>
                      </PopoverTrigger>
                      <PopoverContent className="w-48 p-2">
                        <div className="space-y-1">
                          <button className="w-full flex items-center gap-2 p-2 text-sm hover:bg-gray-100 rounded-md transition-colors">
                            <FiEye className="text-blue-500" />
                            <span>View Document</span>
                          </button>
                          <button className="w-full flex items-center gap-2 p-2 text-sm hover:bg-gray-100 rounded-md transition-colors">
                            <FiDownload className="text-green-500" />
                            <span>Download</span>
                          </button>
                          <button className="w-full flex items-center gap-2 p-2 text-sm hover:bg-gray-100 rounded-md transition-colors">
                            <FiShare2 className="text-blue-500" />
                            <span>Share</span>
                          </button>
                          <button className="w-full flex items-center gap-2 p-2 text-sm hover:bg-gray-100 rounded-md transition-colors">
                            <FiEdit className="text-orange-500" />
                            <span>Rename</span>
                          </button>
                          <button className="w-full flex items-center gap-2 p-2 text-sm hover:bg-gray-100 rounded-md transition-colors">
                            <FiTrash2 className="text-red-500" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No evidence documents available</p>
            )}
          </div>
          
          {/* Miscellaneous Section */}
          <div>
            <h3 className="text-lg font-semibold text-[#171717] mb-3 border-b pb-2">Miscellaneous</h3>
            {documents.miscellaneous.length > 0 ? (
              <div className="space-y-3">
                {documents.miscellaneous.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-200 rounded-full">
                        {getFileIcon(doc.name)}
                      </div>
                      <div>
                        <p className="font-medium text-[#171717]">{doc.name}</p>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span>{doc.date}</span>
                          <span>{doc.size}</span>
                        </div>
                      </div>
                    </div>
                    
                    <Popover>
                      <PopoverTrigger>
                        <p className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                          <IoEllipsisVertical className="text-gray-500" />
                        </p>
                      </PopoverTrigger>
                      <PopoverContent className="w-48 p-2">
                        <div className="space-y-1">
                          <button className="w-full flex items-center gap-2 p-2 text-sm hover:bg-gray-100 rounded-md transition-colors">
                            <FiEye className="text-blue-500" />
                            <span>View Document</span>
                          </button>
                          <button className="w-full flex items-center gap-2 p-2 text-sm hover:bg-gray-100 rounded-md transition-colors">
                            <FiDownload className="text-green-500" />
                            <span>Download</span>
                          </button>
                          <button className="w-full flex items-center gap-2 p-2 text-sm hover:bg-gray-100 rounded-md transition-colors">
                            <FiShare2 className="text-blue-500" />
                            <span>Share</span>
                          </button>
                          <button className="w-full flex items-center gap-2 p-2 text-sm hover:bg-gray-100 rounded-md transition-colors">
                            <FiEdit className="text-orange-500" />
                            <span>Rename</span>
                          </button>
                          <button className="w-full flex items-center gap-2 p-2 text-sm hover:bg-gray-100 rounded-md transition-colors">
                            <FiTrash2 className="text-red-500" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No miscellaneous documents available</p>
            )}
          </div>
          
          {/* Show empty state if no documents at all */}
          {Object.values(documents).every(category => category.length === 0) && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <IoDocumentOutline className="text-gray-400 text-2xl" />
              </div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">No documents yet</h3>
              <p className="text-gray-500 text-sm mb-4">Upload case documents to keep everything organized</p>
              <button 
                onClick={() => setShowUploadModal(true)}
                className="mybtn text-sm  inline-flex items-center justify-center gap-2 group transition-all duration-300 hover:bg-transparent hover:text-[#171717]"
                >
                <IoAdd className="text-lg transition-all duration-300 group-hover:scale-110" />
                Add Document
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
