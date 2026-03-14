"use client"
import React, { useState } from 'react'
import { MdArrowDropDown } from "react-icons/md";
import { FiDownload } from "react-icons/fi";
import { MdPrint } from "react-icons/md";
import Image from 'next/image';
import { CustomDateRangePicker } from '../common/CustomDateRangePicker';
import { CommonGraphTable } from './CommonGraphTable';

export default function Reports() {

    const chartData = [
        { month: "January", revenue: 186, expenses: 80 },
        { month: "February", revenue: 305, expenses: 200 },
        { month: "March", revenue: 237, expenses: 120 },
        { month: "April", revenue: 73, expenses: 190 },
        { month: "May", revenue: 209, expenses: 130 },
        { month: "June", revenue: 214, expenses: 140 },
      ]
      
      const chartConfig = {
        revenue: {
          label: "Revenue",
          color: "#171717",
        },
        expenses: {
          label: "Expenses",
          color: "#888888",
        },
      }
      const [isTable, setIsTable] = useState(false);
      const [selectedReport, setSelectedReport] = useState('Revenue vs Expenses');
  return (
    <div>
                        <div className='flex flex-col sm:flex-row items-center justify-between gap-5 mb-5'>
                        <div className='relative w-full sm:w-auto'>
                          <select 
                            className='w-full pl-2 pr-10 py-2 border rounded-md text-sm appearance-none bg-transparent shadow-sm'
                            onChange={(e) => setSelectedReport(e.target.options[e.target.selectedIndex].text)}
                          >
                            <option value="1">Select report type</option>
                            <option value="2">Revenue vs Expenses</option>
                            <option value="3">Case profitability</option>
                            <option value="4">Client revenue</option>
                            <option value="5">Expense categories</option>
                            <option value="6">Outstanding payments</option>
                            <option value="7">Tax summary</option>
                          </select>
                          <MdArrowDropDown className='absolute right-2 top-1/2 -translate-y-1/2 text-xl'/>
                        </div>
                        <div className="flex items-center justify-end">
                          <button className="mybtn text-sm " onClick={() => setIsTable(!isTable)}>
                            <p className={`${isTable ? 'block' : 'hidden'}`}>Chart view</p>
                            <p className={`${isTable ? 'hidden' : 'block'}`}>Table view</p>
                          </button>
                        </div>
                        </div>
                       
                    
                   
                    <CommonGraphTable 
                      data={chartData} 
                      config={chartConfig} 
                      xAxisKey="month"
                      isTable={isTable}
                      setIsTable={setIsTable}
                    />
                </div>
  )
}
