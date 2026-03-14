'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { IoAdd } from "react-icons/io5";
import { MdOutlinePreview } from "react-icons/md";
import { IoCalendarOutline } from "react-icons/io5";
import { IoDocumentTextOutline } from "react-icons/io5";
import { MdOutlineTaskAlt } from "react-icons/md";
import { IoWalletOutline } from "react-icons/io5";
import { IoShareSocialOutline } from "react-icons/io5";
import { MdModeEditOutline } from "react-icons/md";
import Link from 'next/link';
import { useCaseDetailsMenu } from '../store' 
import AddCaseModal from './cases/AddCaseModal'
import { useFinanceMenu } from '../store'
export default function SectionTop() {
  const pathname = usePathname()
  const [showAddCase, setShowAddCase] = useState(false);
  const { caseDetailsMenu, setCaseDetailsMenu } = useCaseDetailsMenu()
  const { financeMenu, setFinanceMenu } = useFinanceMenu()
  const orderCategories = [
    {
      title: "Active Cases",
      count: 18,
      image: "/images/activecases.png",
    },
    {
      title: "Pending Payments",
      count: 2,
      image: "/images/pendingpayments.png",
    },
    {
      title: "Upcoming Hearings",
      count: 7,
      image: "/images/upcominghearings.png",
    },
    {
      title: "Tasks Due",
      count: 3,
      image: "/images/tastdue.png",
    }
  ]
  const financialSummary = [
    {
      title: "Total Fees",
      count: 45000,
      image: "/images/fees.png",
    },
    {
      title: "Total Expenses",
      count: 18000,
      image: "/images/expenses.png",
    },
    {
      title: "Total Paid",
      count: 27000,
      image: "/images/paid.png",
    },
    {
      title: "Total Due",
      count: 12000,
      image: "/images/due.png",
    },
    
  ]

  const handleAddCase = (caseData) => {
    // Here you would typically save the case data to your backend
    console.log('New case added:', caseData);
  };

  return (
    <div>
      <AnimatePresence>
        {pathname === '/' ? (
         <motion.div
         style={{ overflow: "hidden" }}
         initial={{ height: 0 }}
         animate={{ height: "auto" }}
         transition={{ duration: 0.3 }}
         exit={{ height: 0 }}
         >
             <div className='mt-6'>
               <h1 className="sm:text-3xl text-xl font-medium sm:mb-6 mb-2">Quick Stats</h1>
               <div className="grid sm:grid-cols-4 grid-cols-2 gap-4">
                 {orderCategories.map((category, index) => (
                   <div key={index} className={`bg-gray-500/30 hover:bg-gray-500/50 transition-all duration-300 py-4 px-5 rounded-xl flex justify-between items-center`}>
                     <div className='w-full'>
                       <div className="text-gray-200 text-sm">{category.title}</div>
                         <div className="flex items-center justify-between w-full sm:text-3xl text-xl font-bold mt-1">
                             <p>{category.count}</p>
                             <div>
                                 <Image src={category.image} alt={category.title} width={30} height={30} />
                             </div>
                         </div>
                     </div>
                   </div>
                 ))}
               </div>
             </div>
         </motion.div>
        ) : null}
    </AnimatePresence>


      <AnimatePresence>
        {pathname === '/cases' ? (
         <motion.div
         style={{ overflow: "hidden" }}
         initial={{ height: 0 }}
         animate={{ height: "auto" }}
         transition={{ duration: 0.3 }}
         exit={{ height: 0 }}
         >
             <div className='mt-6'>
             <div className='flex items-center justify-between gap-5'>
               <p className="sm:text-3xl text-xl font-medium mb-2 w-1/2 sm:w-auto">Cases</p>
               <button onClick={() => setShowAddCase(true)} className='w-1/2 sm:w-auto bg-gray-500/30 hover:bg-gray-500/50 transition-all duration-300 py-2.5 px-4 text-sm rounded-xl flex justify-between items-center gap-2'><IoAdd className='text-xl'/>Add Cases</button>
              </div>
             </div>
         </motion.div>
        ) : null}
    </AnimatePresence>


      <AnimatePresence>
        {pathname === '/add_case' ? (
         <motion.div
         style={{ overflow: "hidden" }}
         initial={{ height: 0 }}
         animate={{ height: "auto" }}
         transition={{ duration: 0.3 }}
         exit={{ height: 0 }}
         >
             <div className='mt-6'>
             <div className='flex items-center justify-between gap-5'>
               <p className="sm:text-3xl text-xl font-medium mb-2 w-1/2 sm:w-auto">Add Case</p>
               <Link href='/add_case' className='w-1/2 sm:w-auto bg-gray-500/30 hover:bg-gray-500/50 transition-all duration-300 py-2.5 px-4 text-sm rounded-xl flex justify-between items-center gap-2'><IoAdd className='text-xl'/>Save Case</Link>
              </div>
             </div>
         </motion.div>
        ) : null}
    </AnimatePresence>

    {/* top section for case details */}
      <AnimatePresence>
        {pathname === '/case_details' ? (
         <motion.div
         style={{ overflow: "hidden" }}
         initial={{ height: 0 }}
         animate={{ height: "auto" }}
         transition={{ duration: 0.3 }}
         exit={{ height: 0 }}
         >
             <div className='mt-6'>
             <div className='sm:flex items-center justify-between gap-5'>
               <p className="sm:text-3xl text-xl font-medium mb-2 w-1/2 sm:w-auto">Case details</p>
               <div className='sm:flex items-center gap-5'>
                <button className={`hover:bg-gray-500/30 transition-all duration-300 py-2.5 px-4 text-sm rounded-xl flex items-center gap-2 w-full sm:w-auto ${caseDetailsMenu === 1 ? 'bg-gray-500/30' : ''}`} onClick={() => setCaseDetailsMenu(1)}>
                  <MdOutlinePreview className="text-lg" />Overview
                </button>
                <button className={`hover:bg-gray-500/30 transition-all duration-300 py-2.5 px-4 text-sm rounded-xl flex items-center gap-2 w-full sm:w-auto ${caseDetailsMenu === 2 ? 'bg-gray-500/30' : ''}`} onClick={() => setCaseDetailsMenu(2)}>
                  <IoDocumentTextOutline className="text-lg" />Documents
                </button>
                <button className={`hover:bg-gray-500/30 transition-all duration-300 py-2.5 px-4 text-sm rounded-xl flex items-center gap-2 w-full sm:w-auto ${caseDetailsMenu === 3 ? 'bg-gray-500/30' : ''}`} onClick={() => setCaseDetailsMenu(3)}>
                  <MdOutlineTaskAlt className="text-lg" />Tasks
                </button>
                <button className={`hover:bg-gray-500/30 transition-all duration-300 py-2.5 px-4 text-sm rounded-xl flex items-center gap-2 w-full sm:w-auto ${caseDetailsMenu === 4 ? 'bg-gray-500/30' : ''}`} onClick={() => setCaseDetailsMenu(4)}>
                  <IoWalletOutline className="text-lg" />Finance
                </button>
               </div>
               <div className='flex items-center gap-3'>
                  <button className='hover:bg-gray-500/30 transition-all duration-300 py-2.5 px-4 text-sm rounded-xl flex justify-between items-center gap-2'>
                    <IoShareSocialOutline className="text-lg" />Share
                  </button>
                  <button className='hover:bg-gray-500/30 transition-all duration-300 py-2.5 px-4 text-sm rounded-xl flex justify-between items-center gap-2'>
                    <MdModeEditOutline className="text-lg" />Edit
                  </button>
                </div>
              </div>
             </div>
         </motion.div>
        ) : null}
    </AnimatePresence>


    <AnimatePresence>
        {caseDetailsMenu === 4 && pathname === '/case_details' ? (
         <motion.div
         style={{ overflow: "hidden" }}
         initial={{ height: 0 }}
         animate={{ height: "auto" }}
         transition={{ duration: 0.3 }}
         exit={{ height: 0 }}
         >
             <div className='mt-6'>
              <p className='sm:text-3xl text-xl font-medium mb-2 w-1/2 sm:w-auto'>Financial Overview</p>
               <div className="grid sm:grid-cols-4 grid-cols-2 gap-4">
                 {financialSummary.map((category, index) => (
                   <div key={index} className={`bg-gray-500/30 hover:bg-gray-500/50 transition-all duration-300 py-4 px-5 rounded-xl flex justify-between items-center`}>
                     <div className='w-full'>
                       <div className="text-gray-200 text-sm">{category.title}</div>
                         <div className="flex items-center justify-between w-full sm:text-3xl text-xl font-bold mt-1">
                             <p>₹{category.count}</p>
                             <div>
                                 <Image src={category.image} alt={category.title} width={40} height={40} quality={100}/>
                             </div>
                         </div>
                     </div>
                   </div>
                 ))}
               </div>
             </div>
         </motion.div>
        ) : null}
    </AnimatePresence>

 {/* finance menu */}
    <AnimatePresence>
        { pathname === '/finance' ? (
         <motion.div
         style={{ overflow: "hidden" }}
         initial={{ height: 0 }}
         animate={{ height: "auto" }}
         transition={{ duration: 0.3 }}
         exit={{ height: 0 }}
         >
             <div className='mt-6'>
               <div className='sm:flex items-center justify-center gap-5'>
                <button className={`hover:bg-gray-500/30 transition-all duration-300 py-2.5 px-4 text-sm rounded-xl flex items-center gap-2 w-full sm:w-auto ${financeMenu === 1 ? 'bg-gray-500/30' : ''}`} onClick={() => setFinanceMenu(1)}>
                  Fees
                </button>
                <button className={`hover:bg-gray-500/30 transition-all duration-300 py-2.5 px-4 text-sm rounded-xl flex items-center gap-2 w-full sm:w-auto ${financeMenu === 2 ? 'bg-gray-500/30' : ''}`} onClick={() => setFinanceMenu(2)}>
                  Expenses
                </button>
                <button className={`hover:bg-gray-500/30 transition-all duration-300 py-2.5 px-4 text-sm rounded-xl flex items-center gap-2 w-full sm:w-auto ${financeMenu === 3 ? 'bg-gray-500/30' : ''}`} onClick={() => setFinanceMenu(3)}>
                  Invoices
                </button>
                <button className={`hover:bg-gray-500/30 transition-all duration-300 py-2.5 px-4 text-sm rounded-xl flex items-center gap-2 w-full sm:w-auto ${financeMenu === 4 ? 'bg-gray-500/30' : ''}`} onClick={() => setFinanceMenu(4)}>
                  Reports
                </button>
               </div>
             </div>
         </motion.div>
        ) : null}
    </AnimatePresence>

    {/* Add Case Modal */}
    <AddCaseModal 
      showModal={showAddCase}
      closeModal={() => setShowAddCase(false)}
      handleAddCase={handleAddCase}
    />
  </div>
          
  )
}
