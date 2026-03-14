'use client'
import React from 'react'
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { FaUser } from "react-icons/fa";
import { FaGavel } from "react-icons/fa";
import { todaysHearings } from '../../alldatafiles/todayshearings';
import { ImHammer2 } from "react-icons/im";
import { motion } from "framer-motion";

export default function TodaysHearings() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 70,
        damping: 12
      }
    },
    hover: {
      y: -8,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 25
      }
    }
  };

  return (
    <div className="">
        <div className='flex justify-between items-center mb-5'>
            <h2 className='text-2xl font-bold flex items-center gap-2'>
              <FaGavel /> Today&apos;s Hearings 
            </h2>
            <button className='mybtn text-xs hover:bg-transparent hover:text-[#171717] transition-all duration-300'>
              View All
            </button>
        </div>
        <motion.div 
          className='grid grid-cols-1 sm:grid-cols-2 gap-5'
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
            {todaysHearings.slice(0, 2).map((hearing, i) => (
            <motion.div 
              key={i}
              variants={itemVariants}
              custom={i}
              whileHover="hover"
              className="cursor-pointer"
            >
            <div className='p-5 rounded-2xl bg-white'>
                <div className='flex justify-between items-center pb-5 text-sm font-light'>
                    <div className='bg-blue-600 text-white rounded-full px-4 py-1.5 flex items-center shadow-md'>
                        <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        {hearing.time}
                    </div>
                    <div className='bg-indigo-600 text-white rounded-full px-4 py-2 shadow-md'>
                      {hearing.court}
                    </div>
                </div>
                <div className='pb-5 border-b border-[#171717]/50'>
                    <h3 className='text-2xl font-extrabold text-gray-900'>
                      {hearing.caseNumber}
                    </h3>
                    <div className='flex items-center gap-2 mt-3'>
                        <FaUser className='' />
                        <p className='text-sm text-gray-600'>Client: <span className='font-semibold text-gray-900 ml-1'>{hearing.client}</span></p>
                    </div>
                </div>
                <div className='flex justify-between gap-5 py-5'>
                    <div className='w-1/2 rounded-2xl bg-purple-50/50 py-4 px-5 group'>
                        <p className='text-gray-600 text-xs font-medium uppercase'>Court Name:</p>
                        <p className='text-3xl font-bold text-gray-900 mt-2 group-hover:text-purple-800 transition-colors'>{hearing.court}</p>
                    </div>
                    <div className='w-1/2 rounded-2xl bg-blue-50/50 py-4 px-5 group'>
                        <p className='text-gray-600 text-xs font-medium uppercase'>Room No:</p>
                        <p className='text-3xl font-bold text-gray-900 mt-2 group-hover:text-blue-800 transition-colors'>{hearing.roomNumber}</p>
                    </div>
                </div>
                <button className='w-full mybtn mt-2 text-sm flex items-center justify-center gap-2 group hover:bg-transparent hover:text-[#171717] transition-all duration-300'>
                  Details
                  <HiOutlineArrowNarrowRight className='text-lg group-hover:translate-x-1 transition-all duration-300' />
                </button>
            </div>
            </motion.div>
            ))}
        </motion.div>
    </div>
  )
}
