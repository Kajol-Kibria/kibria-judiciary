"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { MdArrowDropDown } from "react-icons/md";
import { FiDownload } from "react-icons/fi";
import { MdPrint } from "react-icons/md";
import { MdAdd } from "react-icons/md";
import { CustomDateRangePicker } from '../common/CustomDateRangePicker';
import Fees from './Fees';
import Expenses from './Expenses';
import Invoices from './Invoices';
import Reports from '../case_details/Reports';
import { useFinanceMenu } from '../../store'
export default function FinanceContainer() {
  const { financeMenu, setFinanceMenu } = useFinanceMenu()
    const financialSummary = [
        {
            title: 'Total Earnings',
            count: 1000000,
            image: '/images/finance/assets.png'
        },
        {
            title: 'Pending Payments',
            count: 1000000,
            image: '/images/finance/assets.png'
        },
        {
            title: 'Total Expenses',
            count: 1000000,
            image: '/images/finance/assets.png'
        },
        {
            title: 'Profit',
            count: 1000000,
            image: '/images/finance/assets.png'
        },
        
        
    ]
  return (
    <div>  
        {/* Financial Summary Cards */}
        <div className='flex flex-col sm:flex-row items-center justify-between my-5'>
            <h2 className="text-2xl font-bold">Financial Overview</h2>
            <div className='flex items-center gap-5'>
                <button className={`hover:bg-gray-500/30 transition-all duration-300 py-2.5 px-4 text-sm rounded-xl flex items-center gap-2 w-full sm:w-auto`}>
                <FiDownload className="text-lg" />Export
                </button>
                <button className={`hover:bg-gray-500/30 transition-all duration-300 py-2.5 px-4 text-sm rounded-xl flex items-center gap-2 w-full sm:w-auto`}>
                <MdPrint className="text-lg" />Print
                </button>
                <CustomDateRangePicker />
            </div>
         </div>
        <div className="grid grid-cols-2 gap-4 mb-5">
          {/* Total Revenue Card */}
          <div className="p-5 bg-white rounded-xl shadow-sm">
              <h3 className="text-gray-500 font-medium text-sm sm:text-base">Total Revenue</h3>
            <div className="flex items-center justify-between mt-4">
              <p className="text-base sm:text-2xl font-bold">₹1,20,000.00</p>
              <Image src='/images/revenue.png' alt='revenue' width={40} height={40} className='hidden sm:block'/>
            </div>
          </div>

          {/* Total Expenses Card */}
          <div className="p-5 bg-white rounded-xl shadow-sm">
            <h3 className="text-gray-500 font-medium text-sm sm:text-base">Total Expenses</h3>
            <div className="flex items-center justify-between mt-4">
              <p className="text-base sm:text-2xl font-bold">₹45,000.00</p>
              <Image src='/images/expenses.png' alt='expense' width={40} height={40} className='hidden sm:block'/>
            </div>
          </div>

          {/* Net Profit Card */}
          <div className="p-5 bg-white rounded-xl shadow-sm">
              <h3 className="text-gray-500 font-medium text-sm sm:text-base">Net Profit</h3>
            <div className="flex items-center justify-between mt-4">
              <p className="text-base sm:text-2xl font-bold">₹75,000.00</p>
              <Image src='/images/profits.png' alt='profit' width={40} height={40} className='hidden sm:block'/>
            </div>
          </div>

          {/* Pending Payments Card */}
          <div className="p-5 bg-white rounded-xl shadow-sm">
              <h3 className="text-gray-500 font-medium text-sm sm:text-base">Pending Payments</h3>
            <div className="flex items-center justify-between mt-4">
              <p className="text-base sm:text-2xl font-bold">₹35,000.00</p>
              <Image src='/images/pendingpayments.png' alt='pending' width={40} height={40} className='hidden sm:block'/>
            </div>
          </div>
        </div>
        <div>
          <div className={`${financeMenu === 4 ? 'hidden' : 'flex'}  items-center justify-between`}>
            <p className='text-2xl font-bold'>{financeMenu === 1 ? 'Fees' : financeMenu === 2 ? 'Expenses' : financeMenu === 3 ? 'Invoices' : ''}</p>
            <div className='flex items-center gap-2'>
              <button className={`bg-[#171717] text-white py-2.5 px-4 text-sm rounded-xl flex items-center gap-1 w-full sm:w-auto`}>
               <MdAdd className="text-lg" /> Add
              </button>
            </div>
          </div>
        </div>
        {financeMenu === 1 &&  <Fees />}
        {financeMenu === 2 &&  <Expenses />}
        {financeMenu === 3 &&  <Invoices />}
        {financeMenu === 4 &&  <Reports />}
    </div>
  )
}
