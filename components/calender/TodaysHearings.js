'use client'
import React from 'react'
import moment from 'moment'
import { IoLocationOutline } from "react-icons/io5"
import { HiOutlineCalendar, HiOutlineClipboardCheck, HiOutlineUser } from "react-icons/hi"
import { FiCalendar, FiFileText } from "react-icons/fi"

export default function TodaysHearings({ events, handleCheckIn }) {
  // Filter events for today
  const getTodayHearings = () => {
    const today = new Date();
    return events.filter(event => {
      const eventDate = new Date(event.start);
      return (
        eventDate.getDate() === today.getDate() &&
        eventDate.getMonth() === today.getMonth() &&
        eventDate.getFullYear() === today.getFullYear()
      );
    }).sort((a, b) => new Date(a.start) - new Date(b.start));
  }

  // Function to get the status badge component
  const getStatusBadge = (status) => {
    const statusOptions = [
      { name: 'Scheduled', value: '#8B5CF6', bgColor: '#EDE9FE' },
      { name: 'In Progress', value: '#F59E0B', bgColor: '#FEF3C7' },
      { name: 'Checked In', value: '#10B981', bgColor: '#D1FAE5' },
      { name: 'Urgent', value: '#EF4444', bgColor: '#FEE2E2' },
      { name: 'Cancelled', value: '#6B7280', bgColor: '#F3F4F6' }
    ];
    
    const statusOption = statusOptions.find(s => s.name === status) || statusOptions[0];
    
    return (
      <span 
        className="px-3 py-1 rounded-full text-sm font-medium"
        style={{ 
          backgroundColor: statusOption.bgColor,
          color: statusOption.value
        }}
      >
        {status}
      </span>
    );
  }

  const todayHearings = getTodayHearings();
  const formattedDate = moment().format('dddd, D MMMM, YYYY');
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-2 my-1">
        <h1 className="text-xl font-bold flex items-center">
          Today&apos;s Hearings
        </h1>
        <div className="flex items-center">
          <HiOutlineCalendar className="mr-2 text-gray-600" size={18} />
          <span className="font-medium">{formattedDate}</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto pt-4 pr-2 space-y-4 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <style jsx>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        {todayHearings.length === 0 ? (
          <div className="text-center py-8">
            <HiOutlineCalendar size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">No hearings scheduled for today</p>
          </div>
        ) : (
          todayHearings.map(hearing => (
            <div key={hearing.id} className="bg-white rounded-lg shadow-sm p-4 relative">
              <div className="flex items-center justify-between mb-3">
                <div className="px-3 py-1 rounded-full bg-[#171717] text-white text-sm">
                  {moment(hearing.start).format('hh:mm A')}
                </div>
                {getStatusBadge(hearing.status)}
              </div>
              
              <div className="text-gray-500 text-sm font-medium mb-1">
                {hearing.caseNumber}
              </div>
              
              <h3 className="text-lg font-semibold mb-3">
                {hearing.title}
              </h3>
              
              <div className="space-y-2 mb-6">
                <div className="flex items-center text-gray-600">
                  <IoLocationOutline className="mr-2" size={16} />
                  <span>{hearing.location}, {hearing.courtroom}</span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <HiOutlineUser className="mr-2" size={16} />
                  <span>{hearing.client}</span>
                </div>
              </div>
              
              <div className="flex justify-center border-t pt-3 space-x-6">
                <button 
                  className="flex flex-col items-center w-20"
                  onClick={() => handleCheckIn(hearing.id)}
                >
                  <div className="w-8 h-8 flex items-center justify-center bg-[#171717]/10 rounded-full mb-1">
                    <HiOutlineClipboardCheck size={18} />
                  </div>
                  <span className="text-xs">Check-in</span>
                </button>
                
                <button className="flex flex-col items-center w-20">
                  <div className="w-8 h-8 flex items-center justify-center bg-[#171717]/10 rounded-full mb-1">
                    <FiCalendar size={18} />
                  </div>
                  <span className="text-xs">Reschedule</span>
                </button>
                
                <button className="flex flex-col items-center w-20">
                  <div className="w-8 h-8 flex items-center justify-center bg-[#171717]/10 rounded-full mb-1">
                    <FiFileText size={18} />
                  </div>
                  <span className="text-xs">Add Outcome</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}