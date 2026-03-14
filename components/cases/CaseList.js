'use client'
import Image from 'next/image';
import React, { useState } from 'react';
import { FaCalendarAlt, FaGavel } from 'react-icons/fa';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function CaseList({ cases }) {
    const getClientInitial = (name) => {
        return name ? name.charAt(0).toUpperCase() : '?';
    };
   
    // Function to format date
    const formatDate = (dateString) => {
        if (!dateString) return 'Not scheduled';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
        });
    };
    
    // Animation variants
    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          when: "beforeChildren",
          staggerChildren: 0.2,
          delayChildren: 0.1
        }
      }
    };
    
    const cardVariants = {
      hidden: { 
        opacity: 0, 
        y: 50,
        scale: 0.8,
        rotateX: 10
      },
      visible: index => ({ 
        opacity: 1, 
        y: 0,
        scale: 1,
        rotateX: 0,
        transition: { 
          type: "spring", 
          stiffness: 80,
          damping: 12,
          delay: index * 0.1,
          duration: 0.5
        }
      }),
      hover: {
        y: -8,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        transition: {
          type: "spring",
          stiffness: 200,
          damping: 25
        }
      },
      exit: {
        opacity: 0,
        scale: 0.8,
        y: 30,
        transition: {
          duration: 0.3
        }
      }
    };

    const staggerDelay = 0.1;

  return (
    <div>
      <AnimatePresence mode="wait">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key="case-container"
        >
          {cases.map((caseItem, index) => (
            <Link href={`/case_details`} key={index}>
            <motion.div 
              key={caseItem.caseId || index} 
              className="bg-white rounded-2xl flex flex-col h-full shadow-sm overflow-hidden cursor-pointer"
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              whileHover="hover"
              layoutId={`case-card-${caseItem.caseId || index}`}
              style={{
                transformOrigin: "center bottom"
              }}
            >
              <motion.div 
                className="m-4 pb-4 border-b"
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  transition: { delay: index * staggerDelay + 0.3, duration: 0.5 } 
                }}
              >
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">{caseItem.caseId}</span>
                  <motion.span 
                    className={`${caseItem.status === 'Closed' ? 'bg-gray-500/10 text-gray-800' : caseItem.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-800' : caseItem.status === 'Active' ? 'bg-green-500/10 text-green-800' : 'bg-red-500/10 text-red-800'} text-xs px-2 py-1 rounded-full`}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ 
                      scale: 1, 
                      opacity: 1,
                      transition: { 
                        delay: index * staggerDelay + 0.5,
                        type: "spring", 
                        stiffness: 300 
                      } 
                    }}
                  >
                    {caseItem.status}
                  </motion.span>
                </div>
              </motion.div>
              
              <motion.div 
                className="p-4 flex-1"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: 1, 
                  transition: { delay: index * staggerDelay + 0.4 } 
                }}
              >
                <div className="flex items-center mb-4">
                  {caseItem.clientPicture ? (
                    <div>
                      <Image 
                        width={48}
                        height={48} 
                        src={caseItem.clientPicture} 
                        alt={caseItem.client} 
                        className="w-12 h-12 rounded-full mr-4 object-cover"
                      />
                    </div>
                  ) : (
                    <div 
                      className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-4 font-bold text-xl"
                    >
                      {getClientInitial(caseItem.client)}
                    </div>
                  )}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ 
                      opacity: 1, 
                      x: 0, 
                      transition: { delay: index * staggerDelay + 0.7 } 
                    }}
                  >
                    <h3 className="font-medium text-gray-800">{caseItem.client}</h3>
                    <div className="flex items-center text-sm text-gray-600">
                      <FaGavel className="mr-1" />
                      <span>{caseItem.courtName}</span>
                    </div>
                  </motion.div>
                </div>
                
                <motion.div 
                  className="flex items-center text-sm text-gray-600 mb-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0, 
                    transition: { delay: index * staggerDelay + 0.8 } 
                  }}
                >
                  <FaCalendarAlt className="mr-2" />
                  <span>Next Hearing: {formatDate(caseItem.nextHearingDate)}</span>
                </motion.div>
              </motion.div>

              <div className="px-4 pb-4 mt-auto group">
                <button className="w-full mybtn mt-2 text-sm flex items-center justify-center gap-2 group transition-all duration-300 hover:bg-transparent hover:text-[#171717]">
                  Details
                  <HiOutlineArrowNarrowRight className="text-lg transition-all duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </motion.div>
            </Link>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
