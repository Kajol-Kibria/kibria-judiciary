import React from 'react'
import { motion } from 'framer-motion'

export default function CaseTimeline() {
    const timelineData = [
        {
          date: "16 jan 2025",
          title: "Case Filed",
          description: "Case was files on national consumer forum",
        },
        {
          date: "16 feb 2025",
          title: "First Hearing",
          description: "Initial hearing Scheduled",
        },
        {
          date: "16 mar 2025",
          title: "Evidence Submission",
          description: "Evidence submitted by both parties",
        },
        {
          date: "16 apr 2025",
          title: "Status Update",
          description: "Case is in progress",
        },
      ]
  return (
    <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.2 }}
    className='lg:w-1/3 w-full'
  >
    <div className='flex items-center gap-3 mb-2'>
      <p className='text-2xl font-bold my-5 text-[#171717]'>Case Timeline</p>
    </div>
    <div className="relative transition-all duration-300">
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
  )
}
