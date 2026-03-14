'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { IoCalendarOutline, IoClose, IoAdd } from 'react-icons/io5'
import { BsCheck2 } from 'react-icons/bs'
import CustomSlideCheck from '../common/CustomSlideCheck'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

export default function CaseHearings() {
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [selectedDate, setSelectedDate] = useState('')
    const [selectedTime, setSelectedTime] = useState('')
    const [hearingPurpose, setHearingPurpose] = useState('')
    const [courtName, setCourtName] = useState('')
    const [judgeName, setJudgeName] = useState('')
    const [scheduledHearings, setScheduledHearings] = useState([])
    const hearingPurposes = [
        "Hearing",
        "First Hearing",
        "Final Hearing",
        "Motion Hearing",
        "Evidence Submission",
        "Arguments",
        "Judgment",
        "Other"
    ]
    
    const handleScheduleHearing = () => {
        if (selectedDate && selectedTime && courtName && judgeName && hearingPurpose) {
            setScheduledHearings([
                ...scheduledHearings,
                { 
                    date: selectedDate, 
                    time: selectedTime,
                    court: courtName,
                    judge: judgeName,
                    purpose: hearingPurpose
                }
            ])
            setSelectedDate('')
            setSelectedTime('')
            setCourtName('')
            setJudgeName('')
            setHearingPurpose('')
            setShowDatePicker(false)
        }
    }
    
  return (
<motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className='w-full'
            >
                <div className='w-full'>
                    <p className='text-2xl font-bold text-[#171717] my-5'>Case Hearings</p>
                    <div className='bg-white rounded-xl p-5 text-center flex flex-col items-center'>
                        {scheduledHearings.length > 0 ? (
                            <>
                                <h2 className="text-xl font-bold text-[#171717] mb-4">Upcoming Hearings</h2>
                                {scheduledHearings.map((hearing, index) => (
                                    <div key={index} className="w-full bg-gray-50 p-4 rounded-lg mb-3">
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-[#171717]/10 rounded-full">
                                                    <IoCalendarOutline className="text-[#171717]" />
                                                </div>
                                                <div className="text-left">
                                                    <p className="font-bold text-[#171717]">{hearing.date}</p>
                                                    <p className="text-gray-500 text-sm">{hearing.time}</p>
                                                </div>
                                            </div>
                                            <button className="text-gray-400 hover:text-red-500">
                                                <IoClose />
                                            </button>
                                        </div>
                                        <div className="mt-3 text-left border-t border-gray-200 pt-3">
                                            <p className="text-sm"><span className="font-medium">Purpose:</span> {hearing.purpose}</p>
                                            <p className="text-sm"><span className="font-medium">Court:</span> {hearing.court}</p>
                                            <p className="text-sm"><span className="font-medium">Judge:</span> {hearing.judge}</p>
                                        </div>
                                    </div>
                                ))}
                                <div className="px-4 pb-4 mt-6 w-full">
                                    <button 
                                        onClick={() => setShowDatePicker(true)}
                                        className="w-full mybtn mt-2 text-sm flex items-center justify-center gap-2 group transition-all duration-300 hover:bg-transparent hover:text-[#171717]"
                                    >
                                        Add Another Hearing
                                        <IoAdd className="text-lg transition-all duration-300 group-hover:scale-110" />
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="w-24 h-24 bg-[#171717]/5 rounded-full flex items-center justify-center mb-4">
                                    <div className="w-16 h-16 bg-[#171717]/15 rounded-full flex items-center justify-center">
                                        <IoCalendarOutline className="text-[#171717] text-3xl" />
                                    </div>
                                </div>
                                
                                <h2 className="text-xl font-bold text-[#171717] mb-3">No Hearings Scheduled</h2>
                                
                                <p className="text-gray-500 mb-8 max-w-xs mx-auto">
                                    Track all upcoming hearings for this case here. Add your first hearing to get started.
                                </p>
                            </>
                        )}
                        
                        {!showDatePicker && scheduledHearings.length === 0 && (
                            <div className="px-4 pb-4 mt-auto group w-full">
                                <button 
                                    onClick={() => setShowDatePicker(true)}
                                    className="w-full mybtn mt-2 text-sm flex items-center justify-center gap-2 group transition-all duration-300 hover:bg-transparent hover:text-[#171717]"
                                >
                                    Schedule Hearing
                                    <IoAdd className="text-lg transition-all duration-300 group-hover:scale-110" />
                                </button>
                            </div>
                        )}
                        
                        {showDatePicker && (
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="w-full p-5 rounded-lg mt-4"
                            >
                                <h3 className="font-bold text-[#171717] mb-4 text-left">Schedule New Hearing</h3>
                                
                                <div className="mb-4">
                                    <label className="block text-left text-sm font-medium text-gray-600 mb-1">
                                        Date
                                    </label>
                                    <div 
                                        className="relative w-full cursor-pointer"
                                        onClick={() => {
                                            const dateInput = document.getElementById('hearing-date');
                                            if (dateInput) dateInput.showPicker();
                                        }}
                                    >
                                        <input 
                                            id="hearing-date"
                                            type="date" 
                                            value={selectedDate}
                                            onChange={(e) => setSelectedDate(e.target.value)}
                                            className="w-full p-2 border rounded-md text-sm appearance-none cursor-pointer"
                                        />
                                    </div>
                                </div>
                                
                                <div className="mb-4">
                                    <label className="block text-left text-sm font-medium text-gray-600 mb-1">
                                        Time
                                    </label>
                                    <div 
                                        className="relative w-full cursor-pointer"
                                        onClick={() => {
                                            const timeInput = document.getElementById('hearing-time');
                                            if (timeInput) timeInput.showPicker();
                                        }}
                                    >
                                        <input 
                                            id="hearing-time"
                                            type="time" 
                                            value={selectedTime}
                                            onChange={(e) => setSelectedTime(e.target.value)}
                                            className="w-full p-2 border rounded-md text-sm appearance-none cursor-pointer"
                                        />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-left text-sm font-medium text-gray-600 mb-1">
                                        Purpose
                                    </label>
                                    <select
                                        value={hearingPurpose}
                                        onChange={(e) => setHearingPurpose(e.target.value)}
                                       className="w-full p-2 border rounded-md text-sm appearance-none"
                                    >
                                        <option value="">Select a purpose</option>
                                        {hearingPurposes.map((purpose, index) => (
                                            <option key={index} value={purpose}>{purpose}</option>
                                        ))}
                                    </select>
                                </div>
                                
                                <div className="mb-4">
                                    <label className="block text-left text-sm font-medium text-gray-600 mb-1">
                                        Court Name
                                    </label>
                                    <input 
                                        type="text" 
                                        placeholder="Enter court name"
                                        value={courtName}
                                        onChange={(e) => setCourtName(e.target.value)}
                                        className="w-full p-2 border rounded-md text-sm appearance-none"
                                    />
                                </div>
                                
                                <div className="mb-4">
                                    <label className="block text-left text-sm font-medium text-gray-600 mb-1">
                                        Judge Name
                                    </label>
                                    <input 
                                        type="text" 
                                        placeholder="Enter judge name"
                                        value={judgeName}
                                        onChange={(e) => setJudgeName(e.target.value)}
                                        className="w-full p-2 border rounded-md text-sm appearance-none"
                                    />
                                </div>
                                
                                <p className="text-sm text-gray-500 pb-2 text-left">Add a description for this Hearing</p>
                                <textarea
                                    className="w-full border border-gray-700/40 rounded-md p-2"
                                />
                                
                                <div className="mt-4">
                                  <div className='flex justify-between items-center my-4'>
                                    <h4 className="font-medium text-[#171717]">Set Reminders</h4>
                                    <CustomSlideCheck />
                                  </div>
                                    
                                    <div className="bg-gray-50 rounded-md p-3 border border-gray-200 space-y-5">
                                        <div className="flex items-center gap-2">
                                            <Checkbox 
                                                id="emailReminder" 
                                                className="data-[state=checked]:bg-black data-[state=checked]:border-black border-gray-300"
                                            />
                                            <Label
                                                htmlFor="emailReminder"
                                                className="text-sm font-medium leading-none cursor-pointer"
                                            >
                                                Email notification
                                            </Label>
                                        </div>
                                        
                                        <div className="flex items-center gap-2">
                                        <Checkbox 
                                            id="smsReminder" 
                                            className="data-[state=checked]:bg-black data-[state=checked]:border-black border-gray-300"
                                          />
                                          <Label
                                            htmlFor="smsReminder"
                                            className="text-sm font-medium leading-none cursor-pointer"
                                          >
                                            SMS notification
                                          </Label>
                                        </div>
                                        
                                        <div className="flex flex-col text-left">
                                            <Label className="text-sm mb-1">
                                                Reminder timing
                                            </Label>
                                            <div className="flex gap-2">
                                                <select className="w-full p-2 border rounded-md text-sm appearance-none">
                                                    <option value="1hour">1 Hour before</option>
                                                    <option value="3hours">3 Hours before</option>
                                                    <option value="12hours">12 Hours before</option>
                                                    <option value="24hours">24 Hours before</option>
                                                    <option value="48hours">48 Hours before</option>
                                                    <option value="72hours">72 Hours before</option>
                                                </select>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1">
                                                You&apos;ll receive a reminder before the scheduled hearing
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex gap-2 mt-5">
                                    <button 
                                        onClick={() => setShowDatePicker(false)}
                                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        onClick={handleScheduleHearing}
                                        disabled={!selectedDate || !selectedTime || !courtName || !judgeName || !hearingPurpose}
                                        className={`flex items-center gap-1 px-4 py-2 rounded-lg text-white transition-colors ${selectedDate && selectedTime && courtName && judgeName && hearingPurpose ? 'bg-[#171717] hover:bg-gray-800' : 'bg-gray-400 cursor-not-allowed'}`}
                                    >
                                        <BsCheck2 className="text-lg" /> Save
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </motion.div>
  )
}
