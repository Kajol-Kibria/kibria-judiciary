'use client'
import React, { useState } from 'react'
import { motion } from "framer-motion";
import { MdArrowDropDown, MdOutlineAnalytics } from "react-icons/md";
import { IoReceiptOutline } from "react-icons/io5";
import { FaMoneyBillWave } from "react-icons/fa";
import { BiMoneyWithdraw } from "react-icons/bi";
import { MdAttachMoney, MdDescription } from "react-icons/md";
import { FaGavel, FaCar, FaFileAlt, FaFileInvoiceDollar } from "react-icons/fa";
import { GiInjustice } from "react-icons/gi";
import { CiCalendar } from "react-icons/ci";
import { CustomDateRangePicker } from '../common/CustomDateRangePicker';
import { FaFileExcel } from "react-icons/fa";
import { MdPrint } from "react-icons/md";
import { FiDownload } from "react-icons/fi";
import { FaPrint } from "react-icons/fa";
import Image from 'next/image';
import { RevenueVsExpenses } from '../Dashboard/RevenueVsExpenses';
import { CommonGraphTable } from './CommonGraphTable';
import Reports from './Reports';

export default function CaseFinance() {


    const [selectedTab, setSelectedTab] = useState(1)
    
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
    
    // Fee items data
    const feeItems = [
      {
        id: 1,
        title: "Initial Consultation Fee",
        description: "Fee for initial case assessment and consultation",
        amount: "₹5,000.00",
        status: "Paid",
        dueDate: "18 Apr, 2025",
        icon: <MdAttachMoney className="h-5 w-5 text-blue-600" />
      },
      {
        id: 2,
        title: "Document Preparation",
        description: "Preparation of legal documents and filings",
        amount: "₹15,000.00",
        status: "Paid",
        dueDate: "23 Apr, 2025",
        icon: <MdDescription className="h-5 w-5 text-green-600" />
      },
      {
        id: 3,
        title: "Court Representation",
        description: "Representation in court hearings",
        amount: "₹25,000.00",
        status: "Pending",
        dueDate: "08 May, 2025",
        icon: <FaGavel className="h-5 w-5 text-amber-600" />
      }
    ];
    
    // Expense items data
    const expenseItems = [
      {
        id: 1,
        title: "Court Filing Fees",
        category: "Court Fees",
        description: "Fees paid to the court for case filing",
        amount: "₹5,000.00",
        date: "13 Apr, 2025",
        icon: <GiInjustice className="h-5 w-5 text-purple-600" />
      },
      {
        id: 2,
        title: "Document Processing",
        category: "Document Preparation",
        description: "Costs for printing, notarization, and certification of documents",
        amount: "₹2,500.00",
        date: "15 Apr, 2025",
        icon: <FaFileAlt className="h-5 w-5 text-teal-600" />
      },
      {
        id: 3,
        title: "Travel to Court",
        category: "Travel",
        description: "Travel expenses for court visits",
        amount: "₹1,500.00",
        date: "22 Apr, 2025",
        icon: <FaCar className="h-5 w-5 text-amber-500" />
      }
    ];
    
    // Invoice items data
    const invoiceItems = [
      {
        id: 1,
        invoiceNumber: "INV001",
        description: "Invoice for initial consultation and document preparation",
        amount: "₹20,000.00",
        status: "Paid",
        dueDate: "23 Apr, 2025",
        icon: <FaFileInvoiceDollar className="h-5 w-5 text-blue-600" />
      },
      {
        id: 2,
        invoiceNumber: "INV002",
        description: "Invoice for court representation and filing fees",
        amount: "₹25,000.00",
        status: "Pending",
        dueDate: "13 May, 2025",
        icon: <FaFileInvoiceDollar className="h-5 w-5 text-blue-600" />
      }
    ];
    
  return (
    <div>
        <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-transparent"
            >
            <div className='sm:flex items-center justify-between gap-5'>
              <h2 className="text-2xl font-bold text-gray-800 my-5">Finance</h2>
              <div className='sm:flex items-center gap-5'>
                <button className={` transition-all duration-300 py-2.5 px-4 text-sm rounded-xl flex items-center gap-2 w-full sm:w-auto ${selectedTab === 1 ? 'bg-[#171717] text-white hover:bg-[#171717]' : 'hover:bg-gray-500/30'}`} onClick={() => setSelectedTab(1)}>
                  <FaMoneyBillWave className="text-lg" />Fees
                </button>
                <button className={` transition-all duration-300 py-2.5 px-4 text-sm rounded-xl flex items-center gap-2 w-full sm:w-auto ${selectedTab === 2 ? 'bg-[#171717] text-white hover:bg-[#171717]' : 'hover:bg-gray-500/30'}`} onClick={() => setSelectedTab(2)}>
                  <BiMoneyWithdraw className="text-lg" />Expenses
                </button>
                <button className={` transition-all duration-300 py-2.5 px-4 text-sm rounded-xl flex items-center gap-2 w-full sm:w-auto ${selectedTab === 3 ? 'bg-[#171717] text-white hover:bg-[#171717]' : 'hover:bg-gray-500/30'}`} onClick={() => setSelectedTab(3)}>
                  <IoReceiptOutline className="text-lg" />Invoices
                </button>
                <button className={` transition-all duration-300 py-2.5 px-4 text-sm rounded-xl flex items-center gap-2 w-full sm:w-auto ${selectedTab === 4 ? 'bg-[#171717] text-white hover:bg-[#171717]' : 'hover:bg-gray-500/30'}`} onClick={() => setSelectedTab(4)}>
                  <MdOutlineAnalytics className="text-lg" />Reports
                </button>
               </div>
            </div>

            {/* Tab Contents */}
            <div>
              {/* Fees Tab */}
              {selectedTab === 1 && (
                <motion.div 
                  className="space-y-4"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {/* Fee Cards */}
                  {feeItems.map((fee) => (
                    <motion.div 
                      key={fee.id} 
                      className="flex items-start border-gray-100 rounded-2xl bg-white p-5 transition-colors cursor-pointer"
                      variants={itemVariants}
                      whileHover="hover"
                    >
                      <div className="flex-shrink-0 mr-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                          {fee.icon}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium text-gray-900">{fee.title}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${fee.status === 'Paid' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}>{fee.status}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{fee.description}</p>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-lg font-bold text-gray-800">{fee.amount}</span>
                          <div className="flex items-center text-xs text-gray-500">
                            <CiCalendar className="mr-1 text-lg" />
                            Due: {fee.dueDate}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* Expenses Tab */}
              {selectedTab === 2 && (
                <motion.div 
                  className="space-y-4"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {/* Expense Cards */}
                  {expenseItems.map((expense) => (
                    <motion.div 
                      key={expense.id} 
                      className="flex items-start border-gray-100 rounded-2xl bg-white p-5 transition-colors cursor-pointer"
                      variants={itemVariants}
                      whileHover="hover"
                    >
                      <div className="flex-shrink-0 mr-3">
                        <div className={`w-10 h-10 rounded-full ${
                          expense.id === 1 ? 'bg-purple-100' : 
                          expense.id === 2 ? 'bg-teal-100' : 
                          'bg-amber-100'
                        } flex items-center justify-center`}>
                          {expense.icon}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-gray-900">{expense.title}</h3>
                            <p className={`text-xs mt-0.5 ${
                              expense.id === 1 ? 'text-purple-500' : 
                              expense.id === 2 ? 'text-teal-500' : 
                              'text-amber-500'
                            }`}>{expense.category}</p>
                          </div>
                          <span className="text-lg font-bold text-gray-800">{expense.amount}</span>
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <p className="text-sm text-gray-600">{expense.description}</p>
                          <div className="flex items-center text-xs text-gray-500">
                            <CiCalendar className="mr-1 text-lg" />
                            Date: {expense.date}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
              
              {/* Invoices Tab */}
              {selectedTab === 3 && (
                <motion.div 
                  className="space-y-4"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {/* Invoice Cards */}
                  {invoiceItems.map((invoice) => (
                    <motion.div 
                      key={invoice.id} 
                      className="flex items-start border-gray-100 rounded-2xl bg-white p-5 transition-colors cursor-pointer"
                      variants={itemVariants}
                      whileHover="hover"
                    >
                      <div className="flex-shrink-0 mr-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                          {invoice.icon}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium text-gray-900">Invoice #{invoice.invoiceNumber}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${invoice.status === 'Paid' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}>{invoice.status}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{invoice.description}</p>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-lg font-bold text-gray-800">{invoice.amount}</span>
                          <div className="flex items-center text-xs text-gray-500">
                            <CiCalendar className="mr-1 text-lg" />
                            Due: {invoice.dueDate}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
              
              {/* Reports Tab */}
              {selectedTab === 4 && (
                <Reports />
              )}
            </div>
          </motion.div>
    </div>
  )
}
