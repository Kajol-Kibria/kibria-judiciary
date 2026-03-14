'use client'
import React from 'react'
import { FaBell, FaCalendarAlt, FaCheck, FaFileAlt, FaComment, FaGavel } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Notifications() {
  const todayNotifications = [
    {
      id: 1,
      title: "Upcoming Hearing",
      description: "Hearing for Singh vs. Mehta scheduled tomorrow at 10:30 AM",
      time: "2h ago",
      icon: <FaCalendarAlt className="h-5 w-5" />,
      action: "View hearing"
    },
    {
      id: 2,
      title: "Task Completed",
      description: "Rajesh marked \"Draft Contract Review\" as completed",
      time: "4h ago",
      icon: <FaCheck className="h-5 w-5" />,
      action: "View task"
    }
  ];

  const yesterdayNotifications = [
    {
      id: 3,
      title: "Document Updated",
      description: "Property Deed was updated with new signatures",
      time: "1d ago",
      icon: <FaFileAlt className="h-5 w-5" />,
      action: "View document"
    },
    {
      id: 4,
      title: "New Comment",
      description: "Priya commented on Singh vs. Mehta case",
      time: "1d ago",
      icon: <FaComment className="h-5 w-5" />,
      action: "View case"
    }
  ];

  const thisWeekNotifications = [
    {
      id: 5,
      title: "Case Update",
      description: "State vs. Kapoor: Judge granted motion for continuance",
      time: "3d ago",
      icon: <FaGavel className="h-5 w-5" />,
    }
  ];

  // Animation variants
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

  // Function to render notification cards
  const renderNotificationCards = (notifications) => {
    return notifications.map((notification) => (
      <motion.div 
        key={notification.id} 
        className="flex items-start border-gray-100 rounded-2xl bg-white p-5 mb-4 transition-colors cursor-pointer"
        variants={itemVariants}
        whileHover="hover"
      >
        <div className="flex-shrink-0 mr-3">
          <div className={`w-10 h-10 rounded-full bg-[#171717]/5 flex items-center justify-center`}>
            {notification.icon}
          </div>
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3 className="font-medium text-gray-900">{notification.title}</h3>
            <span className="text-xs text-gray-500">{notification.time}</span>
          </div>
          <p className="text-sm text-gray-600 mt-1">{notification.description}</p>
          {notification.action && (
            <div className="mt-2">
              <a href="#" className="text-sm text-[#171717] hover:underline">
                {notification.action}
              </a>
            </div>
          )}
        </div>
      </motion.div>
    ));
  };

  return (
    <div className="max-w-7xl mx-auto rounded-lg overflow-hidden">
      <div className="px-6 py-4">
        <div className="flex justify-between items-center mb-5">
          <p className="text-2xl font-bold flex items-center gap-2">
            <FaBell className="text-2xl text-[#171717]" /> Notifications
          </p>
          <button className="text-xs px-3 py-1 bg-[#171717] text-white rounded-md transition-all duration-300">
            Mark all as read
          </button>
        </div>

        <div className="mb-6">
          <h2 className="text-sm font-semibold text-gray-600 mb-4">Today</h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {renderNotificationCards(todayNotifications)}
          </motion.div>
        </div>

        <div className="mb-6">
          <h2 className="text-sm font-semibold text-gray-600 mb-4">Yesterday</h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {renderNotificationCards(yesterdayNotifications)}
          </motion.div>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-gray-600 mb-4">This Week</h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {renderNotificationCards(thisWeekNotifications)}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
