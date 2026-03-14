'use client'
import React, { useState } from 'react'
import moment from 'moment'
import { motion, AnimatePresence } from 'framer-motion'
import { IoClose, IoAdd } from "react-icons/io5"
import { HiOutlineClipboardCheck } from "react-icons/hi"
import { FaBalanceScale } from "react-icons/fa"
import { Calendar } from "@/components/ui/calendar"
export default function AddCaseModal({ 
  showModal,
  closeModal,
  handleAddCase,
}) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [caseTitle, setCaseTitle] = useState('');
  const [caseNumber, setCaseNumber] = useState('');
  const [caseType, setCaseType] = useState('');
  const [caseStatus, setCaseStatus] = useState('');
  const [courtType, setCourtType] = useState('');
  const [courtName, setCourtName] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientMobile, setClientMobile] = useState('');
  const [opposingParty, setOpposingParty] = useState('');
  const [description, setDescription] = useState('');

  // Handle form submission
  const submitForm = () => {
    const caseData = {
      date: selectedDate,
      title: caseTitle,
      number: caseNumber,
      type: caseType,
      status: caseStatus,
      courtType,
      courtName,
      clientName,
      clientMobile,
      opposingParty,
      description
    };
    
    handleAddCase(caseData);
    closeModal();
  };

  const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const currentMonth = selectedDate.getMonth();
  const currentYear = selectedDate.getFullYear();
  
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  
  // Previous month days to display
  const prevMonthDays = [];
  const prevMonthLastDay = new Date(currentYear, currentMonth, 0).getDate();
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    prevMonthDays.push(prevMonthLastDay - i);
  }
  
  // Current month days
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  
  // Next month days to fill the calendar
  const totalCells = 42; // 6 rows x 7 columns
  const nextMonthDays = Array.from(
    { length: totalCells - (prevMonthDays.length + days.length) },
    (_, i) => i + 1
  );

  const isSelectedDate = (day) => {
    return selectedDate.getDate() === day && 
           selectedDate.getMonth() === currentMonth && 
           selectedDate.getFullYear() === currentYear;
  };

  const selectDay = (day) => {
    const newDate = new Date(currentYear, currentMonth, day);
    setSelectedDate(newDate);
  };

  const prevMonth = () => {
    setSelectedDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const nextMonth = () => {
    setSelectedDate(new Date(currentYear, currentMonth + 1, 1));
  };

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 "
          onClick={closeModal}
        >
          <motion.div 
            className="bg-white rounded-xl w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
          >
            <div className="overflow-y-auto p-5 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-[#171717] flex items-center">
                  <FaBalanceScale className="mr-2" size={24} />
                  Add New Case
                </h3>
                <button 
                  onClick={closeModal} 
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <IoClose className="text-xl text-gray-500" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Filing Date Section */}
                
                <div className="sm:w-[300px]">
                <p className="text-lg font-semibold text-[#171717] mb-4">Filling Date</p>
                <div className="bg-white rounded-lg">
                  <div className="relative z-0">
                    <div className="rounded-md p-3 border border-[#171717]/40">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => {
                          setSelectedDate(date);
                        }}
                        className="rounded-md flex justify-center items-center text-[#171717]"
                        disabled={false}
                      />
                    </div>
                    <div className="flex items-center justify-between my-5">
                      <p className="text-sm text-gray-500">Select filing date</p>
                      <p className="text-sm font-medium text-[#171717]">
                        {moment(selectedDate).format('D MMMM YYYY')}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 pb-3 pt-5">
                    Add a description for this case
                  </p>
                  <textarea className="w-full h-32 border border-[#171717]/40 rounded-md p-2 placeholder:text-gray-500 placeholder:text-sm" placeholder="Enter description here..."/>
                </div>
              </div>
                {/* Case Information Section */}
                <div className="sm:w-[300px]">
                  <h2 className="text-lg font-semibold text-[#171717] mb-4">Case Information</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-[#171717] mb-1">
                        Case Title
                      </label>
                      <input
                        type="text"
                        value={caseTitle}
                        onChange={(e) => setCaseTitle(e.target.value)}
                        className="w-full bg-white border border-gray-300 rounded-md p-2 text-[#171717]"
                        placeholder="Enter case title"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-[#171717] mb-1">
                        Case Number
                      </label>
                      <input
                        type="text"
                        value={caseNumber}
                        onChange={(e) => setCaseNumber(e.target.value)}
                        className="w-full bg-white border border-gray-300 rounded-md p-2 text-[#171717]"
                        placeholder="Enter case number"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-[#171717] mb-1">
                        Case Type
                      </label>
                      <input
                        type="text"
                        value={caseType}
                        onChange={(e) => setCaseType(e.target.value)}
                        className="w-full bg-white border border-gray-300 rounded-md p-2 text-[#171717]"
                        placeholder="Enter case type"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-[#171717] mb-1">
                        Case Status
                      </label>
                      <input
                        type="text"
                        value={caseStatus}
                        onChange={(e) => setCaseStatus(e.target.value)}
                        className="w-full bg-white border border-gray-300 rounded-md p-2 text-[#171717]"
                        placeholder="Enter case status"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Court Information and Party Information Sections */}
                <div className="sm:w-[300px] space-y-8">
                  <div>
                    <h2 className="text-lg font-semibold text-[#171717] mb-4">Party Information</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-[#171717] mb-1">
                          Client Name
                        </label>
                        <input
                          type="text"
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                          className="w-full bg-white border border-gray-300 rounded-md p-2 text-[#171717]"
                          placeholder="Enter client name"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-[#171717] mb-1">
                          Client Mobile No.
                        </label>
                        <input
                          type="text"
                          value={clientMobile}
                          onChange={(e) => setClientMobile(e.target.value)}
                          className="w-full bg-white border border-gray-300 rounded-md p-2 text-[#171717]"
                          placeholder="Enter client mobile number"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-[#171717] mb-1">
                          Opposing Party
                        </label>
                        <input
                          type="text"
                          value={opposingParty}
                          onChange={(e) => setOpposingParty(e.target.value)}
                          className="w-full bg-white border border-gray-300 rounded-md p-2 text-[#171717]"
                          placeholder="Enter opposing party name"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="text-lg font-semibold text-[#171717] mb-4">Court Information</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-[#171717] mb-1">
                          Court Type
                        </label>
                        <input
                          type="text"
                          value={courtType}
                          onChange={(e) => setCourtType(e.target.value)}
                          className="w-full bg-white border border-gray-300 rounded-md p-2 text-[#171717]"
                          placeholder="Enter court type"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-[#171717] mb-1">
                          Court Name
                        </label>
                        <input
                          type="text"
                          value={courtName}
                          onChange={(e) => setCourtName(e.target.value)}
                          className="w-full bg-white border border-gray-300 rounded-md p-2 text-[#171717]"
                          placeholder="Enter court name"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2 pt-6 justify-end">
                <button 
                  onClick={closeModal}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-[#171717] hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={submitForm}
                  disabled={!caseTitle.trim()}
                  className={`px-6 py-2 rounded-lg text-white transition-colors ${
                    caseTitle.trim() 
                      ? 'bg-[#171717] hover:bg-gray-800' 
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  Add Case
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 