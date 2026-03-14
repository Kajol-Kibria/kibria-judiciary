'use client'
import React from 'react'
import moment from 'moment'
import { motion, AnimatePresence } from 'framer-motion'
import { IoClose, IoLocationOutline, IoCalendarClearOutline } from "react-icons/io5"
import { HiOutlineClipboardCheck, HiOutlineUser, HiOutlineStatusOnline } from "react-icons/hi"
import { MdOutlineEventNote } from "react-icons/md"
import { GiGavel } from "react-icons/gi"
import { FaBalanceScale } from "react-icons/fa"

export default function AddHearingsModal({ 
  showModal,
  closeModal,
  selectedDate,
  setSelectedDate,
  eventTitle,
  setEventTitle,
  eventDescription,
  setEventDescription,
  eventLocation,
  setEventLocation,
  eventCourt,
  setEventCourt,
  handleAddEvent,
  selectedEvent,
  courtCategories,
  eventClient,
  setEventClient,
  eventStatus,
  setEventStatus,
  hearingStatusOptions
}) {
  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <motion.div 
            className="bg-white rounded-xl w-full max-w-md"
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
              
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-[#171717] flex items-center">
                  <GiGavel className="mr-2" size={24} />
                  {selectedEvent ? 'Edit Hearing' : 'Add New Hearing'}
                </h3>
                <button 
                  onClick={closeModal} 
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <IoClose className="text-xl text-gray-500" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <IoCalendarClearOutline className="mr-2" />
                    Date & Time
                  </label>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Date</p>
                      <input 
                        type="date" 
                        value={selectedDate ? moment(selectedDate).format('YYYY-MM-DD') : ''} 
                        onChange={(e) => {
                          const date = new Date(e.target.value);
                          const time = selectedDate ? selectedDate : new Date();
                          date.setHours(time.getHours(), time.getMinutes());
                          setSelectedDate(date);
                        }}
                        className="w-full bg-white border border-gray-300 rounded-md p-2 text-gray-700"
                      />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Time</p>
                      <input 
                        type="time" 
                        value={selectedDate ? moment(selectedDate).format('HH:mm') : ''} 
                        onChange={(e) => {
                          const [hours, minutes] = e.target.value.split(':').map(Number);
                          const date = selectedDate ? new Date(selectedDate) : new Date();
                          date.setHours(hours, minutes);
                          setSelectedDate(date);
                        }}
                        className="w-full bg-white border border-gray-300 rounded-md p-2 text-gray-700"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <HiOutlineClipboardCheck className="mr-2" />
                    Title
                  </label>
                  <input
                    type="text"
                    value={eventTitle}
                    onChange={(e) => setEventTitle(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-md p-2 text-gray-700"
                    placeholder="Hearing title"
                  />
                </div>
                
                <div>
                  <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <IoLocationOutline className="mr-2" />
                    Location
                  </label>
                  <input
                    type="text"
                    value={eventLocation}
                    onChange={(e) => setEventLocation(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-md p-2 text-gray-700"
                    placeholder="Hearing location (optional)"
                  />
                </div>
                
                <div>
                  <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <HiOutlineUser className="mr-2" />
                    Client
                  </label>
                  <input
                    type="text"
                    value={eventClient}
                    onChange={(e) => setEventClient(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-md p-2 text-gray-700"
                    placeholder="Client name (optional)"
                  />
                </div>
                
                <div>
                  <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <HiOutlineStatusOnline className="mr-2" />
                    Status
                  </label>
                  <div className="w-full border border-gray-300 rounded-md p-2">
                    <div className="flex flex-wrap">
                      {hearingStatusOptions.map(status => (
                        <div 
                          key={status.name}
                          onClick={() => setEventStatus(status)}
                          className="m-1"
                        >
                          <span 
                            className="px-3 py-1 rounded-full text-sm cursor-pointer inline-block"
                            style={ eventStatus.name === status.name ? { 
                              backgroundColor: status.bgColor,
                              color: status.value
                            } : {
                              backgroundColor: 'white',
                              border: '1px solid #e5e7eb',
                              color: 'gray'
                            }}
                          >
                            {status.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <MdOutlineEventNote className="mr-2" />
                    Description
                  </label>
                  <textarea
                    value={eventDescription}
                    onChange={(e) => setEventDescription(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-md p-2 text-gray-700 h-24"
                    placeholder="Add details (optional)"
                  ></textarea>
                </div>
                
                <div>
                  <label className=" text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <FaBalanceScale className="mr-2" />
                    Court Category
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {courtCategories.map(court => (
                      <div 
                        key={court.name}
                        onClick={() => setEventCourt(court)}
                        className={`flex items-center p-2 rounded-md cursor-pointer transition-all ${
                          eventCourt.name === court.name 
                            ? 'bg-[#171717] border border-[#171717] text-white' 
                            : 'bg-white border border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        <div className="mr-2 text-lg" style={{ color: eventCourt.name === court.name ? 'white' : court.value }}>
                          <court.icon size={20} />
                        </div>
                        <div className="text-sm">{court.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-2 pt-4">
                  <button 
                    onClick={closeModal}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddEvent}
                    disabled={!eventTitle.trim()}
                    className={`flex-1 px-4 py-2 rounded-lg text-white transition-colors ${
                      eventTitle.trim() 
                        ? 'bg-[#171717] hover:bg-gray-800' 
                        : 'bg-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {selectedEvent ? 'Update Hearing' : 'Add Hearing'}
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