import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { HiOutlineDocumentText } from 'react-icons/hi'
import { FaClipboardList, FaRegBuilding, FaUserTie, FaRegCalendarAlt } from 'react-icons/fa'
import { BsBuilding } from 'react-icons/bs'
import { MdModeEdit } from 'react-icons/md'

export default function CaseSummery() {
    const [isEditingStatus, setIsEditingStatus] = useState(false)
    const [caseSummary, setCaseSummary] = useState({
        caseTitle: "Johnson vs. Smith Enterprises",
        status: "Active",
        caseType: "Civil - Consumer Dispute",
        courtType: "District Consumer Court",
        clientName: "Robert Johnson",
        fillingDate: "16 Jan 2025",
        courtName: "National Consumer Forum"
    })
    
    const handleStatusChange = (e) => {
      setCaseSummary({
        ...caseSummary,
        status: e.target.value
      })
    }

  return (

    <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className='lg:w-2/3 w-full'
  >
    <div className='flex items-center justify-between'>
      <p className='text-2xl font-bold my-5 text-[#171717]'>Case Summary</p>
      <div className='flex items-center gap-2'>
        {isEditingStatus ? (
          <select 
            value={caseSummary.status}
            onChange={handleStatusChange}
            onBlur={() => setIsEditingStatus(false)}
            autoFocus
            className="w-full px-3 py-2 border rounded-md text-sm appearance-none"
            >
            <option value="" disabled selected>Update Case Status</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Urgent">Urgent</option>
            <option value="Closed">Closed</option>
          </select>
        ) : (
          <div 
            className="flex items-center gap-2 py-3 px-4 rounded-lg cursor-pointer bg-[#171717] text-white hover:bg-white hover:text-black border border-[#171717] transition-all duration-300 "
            onClick={() => setIsEditingStatus(true)}
          >
            <div className={`w-3 h-3 rounded-full ${
              caseSummary.status === 'Active' ? 'bg-green-500' : 
              caseSummary.status === 'Pending' ? 'bg-yellow-500' :
              caseSummary.status === 'Urgent' ? 'bg-red-500' : 'bg-gray-500'
            }`}></div>
            <span className="font-medium text-sm">{caseSummary.status}</span>
            <MdModeEdit/>
          </div>
        )}
      </div>
    </div>
    <div className='bg-white rounded-2xl p-5'>
        <div 
        className="flex items-center  gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all"
      >
          <div className="p-2.5 bg-blue-50 rounded-lg">
            <HiOutlineDocumentText className="text-blue-600 text-xl" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Case Title</p>
            <p className="font-semibold text-gray-800">{caseSummary.caseTitle}</p>
          </div>
        </div>
        
          <div 
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all"
        >
          <div className="p-2.5 bg-indigo-50 rounded-lg">
            <FaClipboardList className="text-indigo-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Case Type</p>
            <p className="font-semibold text-gray-800">{caseSummary.caseType}</p>
          </div>
        </div>
        
        <div 
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all"
        >
          <div className="p-2.5 bg-amber-50 rounded-lg">
            <FaRegBuilding className="text-amber-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Court Type</p>
            <p className="font-semibold text-gray-800">{caseSummary.courtType}</p>
          </div>
        </div>
        
        <div 
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all"
        >
          <div className="p-2.5 bg-red-50 rounded-lg">
            <FaUserTie className="text-red-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Client Name</p>
            <p className="font-semibold text-gray-800">{caseSummary.clientName}</p>
          </div>
        </div>
        
        <div 
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all"
        >
          <div className="p-2.5 bg-teal-50 rounded-lg">
            <FaRegCalendarAlt className="text-teal-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Filing Date</p>
            <p className="font-semibold text-gray-800">{caseSummary.fillingDate}</p>
          </div>
        </div>
        
        <div 
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all"
        >
          <div className="p-2.5 bg-cyan-50 rounded-lg">
            <BsBuilding className="text-cyan-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Court Name</p>
            <p className="font-semibold text-gray-800">{caseSummary.courtName}</p>
          </div>
        </div>
    </div>
  </motion.div>
  

  )
}
