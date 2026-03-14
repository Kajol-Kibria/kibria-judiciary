'use client'
import React, { useState } from 'react'
import { IoAdd } from "react-icons/io5";
import AddMemberModal from './AddMemberModal';
import Link from 'next/link';
export default function TeamManagementContainer() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showInviteModal, setShowInviteModal] = useState(false);


  const teamMembers = [
    {
      id: 1,
      name: 'Rahul Sharma',
      initials: 'RS',
      role: 'Senior Advocate',
      email: 'rahul.sharma@lawgenie.com',
      phone: '+91 9876543210',
      status: 'active'
    },
    {
      id: 2,
      name: 'Priya Patel',
      initials: 'PP',
      role: 'Junior Associate',
      email: 'priya.patel@lawgenie.com',
      phone: '+91 9876543211',
      status: 'active'
    },
    {
      id: 3,
      name: 'Ajay Verma',
      initials: 'AV',
      role: 'Paralegal',
      email: 'ajay.verma@lawgenie.com',
      phone: '+91 9876543212',
      status: 'inactive'
    },
    {
      id: 4,
      name: 'Neha Singh',
      initials: 'NS',
      role: 'Intern',
      email: 'neha.singh@lawgenie.com',
      phone: '+91 9876543213',
      status: 'active'
    }
  ];


  return (
    <div className="max-w-7xl mx-auto py-5">
      {/* Search bar */}
      <div className='flex justify-between mb-5'>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
          </svg>
        </div>
        <input 
          type="search" 
          className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#171717]"
          placeholder="Search team members" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
        <button 
            onClick={() => setShowInviteModal(true)}
            className="mybtn text-sm flex items-center justify-center gap-2 group transition-all duration-300 hover:bg-transparent hover:text-[#171717]"
          >
            <IoAdd className="text-lg transition-all duration-300 group-hover:scale-110" />
            Add Member
          </button>
      </div>
      
      {/* Team members list */}
      <div className="space-y-4">
        {teamMembers.map((member) => (
          <Link href={`/member_details`} key={member.id} className="bg-white rounded-lg shadow p-4 flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <div className="relative">
                <div className={`w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-medium`}>
                  {member.initials}
                </div>
                <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 ${member.status === 'active' ? 'bg-green-500' : 'bg-gray-400'} border-2 border-white rounded-full`}></span>
              </div>
              <div>
                <h3 className="font-bold text-base">{member.name}</h3>
                <div className="flex flex-col space-y-1">
                  <div className="flex items-center text-gray-500 text-sm">
                    <svg className="w-3.5 h-3.5 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                    {member.email}
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <svg className="w-3.5 h-3.5 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                    {member.phone}
                  </div>
                  <div className="flex items-center">
                    <span className={`inline-flex items-center ${member.status === 'active' ? 'text-green-500' : 'text-gray-400'} text-xs`}>
                      <span className={`w-1.5 h-1.5 mr-1 rounded-full ${member.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                      {member.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="bg-blue-100 text-blue-700 text-xs font-medium py-1 px-2.5 rounded-full mb-2">
                {member.role}
              </span>
              <svg className="w-5 h-5 text-gray-400 mt-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </div>
          </Link>
        ))}
      </div>

      <AddMemberModal showInviteModal={showInviteModal} setShowInviteModal={setShowInviteModal} />
    </div>
  )
}
