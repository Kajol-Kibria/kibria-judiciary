'use client'
import React, { useState } from 'react'
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaCheck, FaTimes } from "react-icons/fa";
import { motion } from 'framer-motion'

export default function MemberDetailsCantainer() {
    const [userData, setUserData] = useState({
        fullName: 'Rahul Sharma',
        email: 'rahul.sharma@lawgenie.com',
        phone: '+91 9876543210',
        status: 'Active',
        joined: '15 May, 2023'
    });
    const timelineData = [
        {
          date: "16 jan 2025",
          title: "Logged in",
          description: "Rahul Sharma logged in at 10:00 AM",
        },
          {
            date: "16 jan 2025",
            title: "Case Assigned",
            description: "Rahul Sharma assigned to case 1234567890",
          },
          {
            date: "16 jan 2025",
            title: "Created task",
            description: "Rahul Sharma created a task for case 1234567890",
          },
          {
            date: "16 jan 2025",
            title: "Logged out",
            description: "Rahul Sharma logged out at 10:00 PM",
          },
      ]
      
    const permissionsData = [
      { name: "View Cases", granted: true },
      { name: "Edit Cases", granted: true },
      { name: "Delete Cases", granted: false },
      { name: "View Documents", granted: true },
      { name: "Upload Documents", granted: true },
      { name: "Delete Documents", granted: false },
      { name: "View Calendar", granted: true },
      { name: "Add Events", granted: true },
      { name: "View Financial Data", granted: false },
      { name: "Manage Financial Data", granted: false },
      { name: "View Team", granted: true },
      { name: "Manage Team", granted: false },
    ]
    
  return (
    <div className='max-w-7xl mx-auto py-5'>
        {/* Profile Card */}
      <div className="mb-6 rounded-xl overflow-hidden shadow-sm">
        <div className="p-6 bg-white flex flex-col sm:flex-row items-center relative">
          <div className="w-20 h-20 rounded-full bg-[#e8ecf9] text-[#4a63c8] flex items-center justify-center text-2xl font-bold mb-4 sm:mb-0 sm:mr-4">
            RS
          </div>
          <div>
            <h2 className="text-xl font-bold mb-1">{userData.fullName}</h2>
            <div className="flex items-center">
              <span className="bg-[#e8ecf9] text-[#4a63c8] px-3 py-1 rounded-full text-sm">Senior Advocate</span>
              <button className="ml-2 p-1">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                </svg>
              </button>
            </div>
            <div className="mt-2 flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              <span>{userData.status}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="mb-6 bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-medium mb-4 flex items-center text-gray-800">
          Personal Information
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-4 text-gray-500">
              <FaEnvelope />
            </div>
            <div>
              <span className="text-sm text-gray-500">Email</span>
              <div className="text-gray-800">{userData.email}</div>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-4 text-gray-500">
              <FaPhone />
            </div>
            <div>
              <span className="text-sm text-gray-500">Phone</span>
              <div className="text-gray-800">{userData.phone}</div>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-4 text-gray-500">
              <FaCalendarAlt />
            </div>
            <div>
              <span className="text-sm text-gray-500">Joined</span>
              <div className="text-gray-800">{userData.joined}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Assigned Cases */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Assigned Cases (2)</h3>
        
        <div className="space-y-4">
          {/* Case Card 1 */}
          <div className="bg-white rounded-xl shadow-sm p-5">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-lg font-medium">Singh vs. Mehta</h4>
                <p className="text-gray-700 mt-1">CIVIL/2023/12345</p>
                <p className="text-gray-500 text-sm mt-1">District Court, Delhi</p>
              </div>
              <span className="bg-blue-100 text-blue-500 px-3 py-1 rounded-full text-sm">Active</span>
            </div>
          </div>
          
          {/* Case Card 2 */}
          <div className="bg-white rounded-xl shadow-sm p-5">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-lg font-medium">State vs. Kapoor</h4>
                <p className="text-gray-700 mt-1">CRIM/2023/7890</p>
                <p className="text-gray-500 text-sm mt-1">High Court, Mumbai</p>
              </div>
              <span className="bg-blue-100 text-blue-500 px-3 py-1 rounded-full text-sm">Active</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Assigned Tasks */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Assigned Tasks (2)</h3>
        
        <div className="space-y-4">
          {/* Task Card 1 */}
          <div className="bg-white rounded-xl shadow-sm p-5 relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500"></div>
            <div className="flex justify-between items-start ml-3">
              <div>
                <h4 className="text-lg font-medium">Prepare draft for petition</h4>
                <p className="text-gray-700 mt-1">Case: Singh vs. Mehta</p>
                <p className="text-gray-500 text-sm mt-1">Due: 07 May, 2025</p>
              </div>
              <div className="flex gap-2 items-center">
                <span className="bg-blue-100 text-blue-500 px-3 py-1 rounded-full text-sm">In Progress</span>
                <span className="text-red-500 text-sm rounded-full bg-red-100 px-3 py-1 font-medium">High</span>
              </div>
            </div>
          </div>
          
          {/* Task Card 2 */}
          <div className="bg-white rounded-xl shadow-sm p-5 relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-400"></div>
            <div className="flex justify-between items-start ml-3">
              <div>
                <h4 className="text-lg font-medium">Review witness statements</h4>
                <p className="text-gray-700 mt-1">Case: State vs. Kapoor</p>
                <p className="text-gray-500 text-sm mt-1">Due: 10 May, 2025</p>
              </div>
              <div className="flex gap-2 items-center">
                <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-sm">Pending</span>
                <span className="text-orange-500 text-sm rounded-full bg-orange-100 px-3 py-1 font-medium">Medium</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='sm:flex justify-between gap-8'>
        {/* activity */}
       <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className='lg:w-1/3 w-full'
        >
          <div className='flex items-center gap-3'>
            <p className='text-2xl font-bold my-5 text-[#171717]'>Activity</p>
          </div>
          <div className="relative transition-all duration-300 bg-white rounded-xl p-5">
            {timelineData.map((item, index) => (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
                key={index} 
                className="mb-8 flex"
              >
                {/* Left side with dot and line */}
                <div className="flex flex-col items-center">
                  <div className="min-w-3 min-h-3 bg-gray-700 rounded-full"></div>
                  {index !== timelineData.length - 1 && (
                    <div className="w-0.5 h-full bg-gray-700"></div>
                  )}
                </div>
                
                {/* Right side content */}
                <div
                  className="ml-6 transition-all duration-300 w-full"
                >
                  <div className="flex items-center gap-4 rounded-3xl backdrop-blur-sm">
                    <div>
                      <h3 className="font-semibold text-gray-800">{item.title}</h3>
                      <div className="text-sm font-medium text-gray-600">
                        {item.date}
                    </div>
                      <p className="text-gray-600 text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        {/* Permissions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className='lg:w-2/3 w-full'
        >
          <div className='flex items-center gap-3'>
            <p className='text-2xl font-bold my-5 text-[#171717]'>Permissions</p>
          </div>
          <div className="bg-white shadow-sm rounded-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {permissionsData.map((permission, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 + 0.5 }}
                  className="flex items-center justify-between py-3 border-b border-gray-100"
                >
                  <span className="text-gray-700">{permission.name}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${permission.granted ? 'bg-green-100 text-green-500' : 'bg-gray-200 text-gray-400'}`}>
                    {permission.granted ? <FaCheck size={14} /> : <FaTimes size={14} />}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
