'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from "react-icons/io5";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaIdCard, FaStar, FaBriefcase, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { LuPencil } from "react-icons/lu";
export default function ProfileSection() {
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState({
    fullName: 'Rahul Kumar',
    email: 'rahul.kumar@lawgenie.com',
    phone: '+91 9876543210',
    address: '123 Legal Avenue, New Delhi, 110001',
    barCouncilId: 'BCI/DEL/12345/2015',
    specialties: 'Constitutional Law, Corporate Law',
    yearsOfExperience: '8',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSave = () => {
    // Save the updated user data
    console.log('Updated user data:', userData);
    handleClose();
  };

  return (
    <div className='py-5'>
      {/* Profile Card */}
      <div className="mb-6 rounded-xl overflow-hidden shadow-md">
        <div className="p-6 bg-[#f5d742] flex flex-col sm:flex-row items-center relative">
          <div className="w-20 h-20 rounded-full bg-white text-[#f5d742] flex items-center justify-center text-2xl font-bold mb-4 sm:mb-0 sm:mr-4">
            RK
          </div>
          <div>
            <h2 className="text-xl font-bold mb-1">{userData.fullName}</h2>
            <p className="opacity-80">Senior Advocate</p>
            <span className="inline-block bg-white/30 px-3 py-1 rounded-full text-sm font-medium mt-2">
              ★ Premium Plan
            </span>
          </div>
          <button 
            className="absolute right-4 top-4 w-9 h-9 rounded-full bg-white flex items-center justify-center transition-colors hover:bg-white/80"
            onClick={handleClickOpen}
            aria-label="Edit profile"
          >
            <LuPencil className="text-gray-700" />
          </button>
        </div>
      </div>

      {/* Personal Information */}
      <div className="mb-6 bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-medium mb-4 flex items-center text-gray-800">
          Personal Information
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-4 text-gray-500">
              <FaUser />
            </div>
            <div>
              <span className="text-sm text-gray-500">Full Name</span>
              <div className="text-gray-800">{userData.fullName}</div>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-4 text-gray-500">
              <FaEnvelope />
            </div>
            <div>
              <span className="text-sm text-gray-500">Email Address</span>
              <div className="text-gray-800">{userData.email}</div>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-4 text-gray-500">
              <FaPhone />
            </div>
            <div>
              <span className="text-sm text-gray-500">Phone Number</span>
              <div className="text-gray-800">{userData.phone}</div>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-4 text-gray-500">
              <FaMapMarkerAlt />
            </div>
            <div>
              <span className="text-sm text-gray-500">Address</span>
              <div className="text-gray-800">{userData.address}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Details */}
      <div className="mb-6 bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-medium mb-4 flex items-center text-gray-800">
          Professional Details
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-4 text-gray-500">
              <FaIdCard />
            </div>
            <div>
              <span className="text-sm text-gray-500">Bar Council ID</span>
              <div className="text-gray-800">{userData.barCouncilId}</div>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-4 text-gray-500">
              <FaStar />
            </div>
            <div>
              <span className="text-sm text-gray-500">Specialties</span>
              <div className="text-gray-800">{userData.specialties}</div>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-4 text-gray-500">
              <FaBriefcase />
            </div>
            <div>
              <span className="text-sm text-gray-500">Years of Experience</span>
              <div className="text-gray-800">{userData.yearsOfExperience}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Dialog */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={handleClose}
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
                    <FaUser className="mr-2" />
                    Edit Profile
                  </h3>
                  <button 
                    onClick={handleClose} 
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    <IoClose className="text-xl text-gray-500" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <FaUser className="mr-2" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={userData.fullName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="w-full bg-white border border-gray-300 rounded-md p-2 text-gray-700"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <FaEnvelope className="mr-2" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={userData.email}
                      onChange={handleChange}
                      placeholder="Enter your email address"
                      className="w-full bg-white border border-gray-300 rounded-md p-2 text-gray-700"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <FaPhone className="mr-2" />
                      Phone Number
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={userData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      className="w-full bg-white border border-gray-300 rounded-md p-2 text-gray-700"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <FaMapMarkerAlt className="mr-2" />
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={userData.address}
                      onChange={handleChange}
                      placeholder="Enter your address"
                      className="w-full bg-white border border-gray-300 rounded-md p-2 text-gray-700"
                    />
                  </div>
                  
                  <hr className="my-4 border-gray-200" />
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <FaIdCard className="mr-2" />
                      Bar Council ID
                    </label>
                    <input
                      type="text"
                      name="barCouncilId"
                      value={userData.barCouncilId}
                      onChange={handleChange}
                      placeholder="Enter your Bar Council ID"
                      className="w-full bg-white border border-gray-300 rounded-md p-2 text-gray-700"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <FaStar className="mr-2" />
                      Specialties
                    </label>
                    <input
                      type="text"
                      name="specialties"
                      value={userData.specialties}
                      onChange={handleChange}
                      placeholder="Enter your specialties"
                      className="w-full bg-white border border-gray-300 rounded-md p-2 text-gray-700"
                    />
                    <small className="text-xs text-gray-500 mt-1 block">Separate specialties with commas</small>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <FaBriefcase className="mr-2" />
                      Years of Experience
                    </label>
                    <input
                      type="text"
                      name="yearsOfExperience"
                      value={userData.yearsOfExperience}
                      onChange={handleChange}
                      placeholder="Enter years of experience"
                      className="w-full bg-white border border-gray-300 rounded-md p-2 text-gray-700"
                    />
                  </div>
                  
                  <hr className="my-4 border-gray-200" />
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <FaLock className="mr-2" />
                      Current Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="currentPassword"
                        value={userData.currentPassword}
                        onChange={handleChange}
                        placeholder="Enter current password"
                        className="w-full bg-white border border-gray-300 rounded-md p-2 text-gray-700 pr-10"
                      />
                      <button
                        type="button"
                        onClick={handleTogglePasswordVisibility}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                        <FaLock className="mr-2" />
                        New Password
                      </label>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="newPassword"
                        value={userData.newPassword}
                        onChange={handleChange}
                        placeholder="Enter new password"
                        className="w-full bg-white border border-gray-300 rounded-md p-2 text-gray-700"
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                        <FaLock className="mr-2" />
                        Confirm Password
                      </label>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={userData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm new password"
                        className="w-full bg-white border border-gray-300 rounded-md p-2 text-gray-700"
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-2 pt-4">
                    <button 
                      onClick={handleClose}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={!userData.fullName.trim()}
                      className={`flex-1 px-4 py-2 rounded-lg text-white transition-colors ${
                        userData.fullName.trim() 
                          ? 'bg-[#171717] hover:bg-gray-800' 
                          : 'bg-gray-400 cursor-not-allowed'
                      }`}
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 