'use client'
import React from 'react'
import { MdHistory } from "react-icons/md";
import { FaGavel, FaMoneyBillWave, FaCalendarAlt } from "react-icons/fa";
import { motion } from "framer-motion";

export default function RecentActivities() {
  // Array of notification items
  const notifications = [
    {
      id: 1,
      title: "New case added",
      description: "Smith vs Johnson - High Court, Room 12",
      time: "2h ago",
      date: "14/04/2025, 09:30",
      icon: <FaGavel className="h-5 w-5 text-blue-600" />
    },
    {
      id: 2,
      title: "Payment received",
      description: "Client John Doe - CRL/123/2023",
      time: "5h ago",
      date: "14/04/2025, 11:00",
      icon: <FaMoneyBillWave className="h-5 w-5 text-green-600" />
    },
    {
      id: 3,
      title: "Hearing rescheduled",
      description: "Smith vs Johnson - High Court, Room 12",
      time: "1d ago",
      date: "16/04/2025, 10:30",
      icon: <FaCalendarAlt className="h-5 w-5 text-red-600" />
    }
  ];

  // Animation variants - only keep card animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 80,
        damping: 12
      }
    },
    hover: {
      y: -5,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  return (
    <div className="">
      <div className='flex justify-between items-center mb-5'>
        <p className="text-2xl font-bold flex items-center gap-2">
          <MdHistory className='text-3xl'/> Recent Activities
        </p>
        <button className='mybtn text-xs hover:bg-transparent hover:text-[#171717] transition-all duration-300'>
          View All
        </button>
      </div>
      <motion.div 
        className="space-y-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Notification Cards */}
        {notifications.map((notification) => (
          <motion.div 
            key={notification.id} 
            className="flex items-start border-gray-100 rounded-2xl bg-white p-5 transition-colors cursor-pointer"
            variants={itemVariants}
            whileHover="hover"
          >
            <div className="flex-shrink-0 mr-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                {notification.icon}
              </div>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h3 className="font-medium text-gray-900">{notification.title}</h3>
                <span className="text-xs text-gray-500">{notification.time}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{notification.description}</p>
              <div className="mt-2 flex items-center">
                <span className="text-xs text-gray-500">{notification.date}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
