"use client"
import React from 'react'
import { Pie, PieChart, Tooltip } from "recharts"
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { CloudIcon, UsersIcon, CheckCircleIcon, StarIcon } from "lucide-react"
import { IoIosArrowForward } from "react-icons/io"; 
import { RiCustomerService2Fill } from "react-icons/ri";
import { FaTrash } from "react-icons/fa";
import { AiOutlineClear } from "react-icons/ai";
import { FaBoxArchive } from "react-icons/fa6";

import {
  ChartConfig,
  ChartContainer,
} from "@/components/ui/chart"

// Updated chart data with percentage and size information
const chartData = [
  { browser: "Case Documents", visitors: 3.6, percentage: 56.2, size: "3.6 GB", fill: "hsl(var(--chart-1))" },
  { browser: "Hearing Recordings", visitors: 1.4, percentage: 21.9, size: "1.4 GB", fill: "hsl(var(--chart-2))" },
  { browser: "Images", visitors: 0.921, percentage: 14.1, size: "921 MB", fill: "hsl(var(--chart-3))" },
  { browser: "Other Files", visitors: 0.513, percentage: 7.8, size: "513 MB", fill: "hsl(var(--chart-4))" },
]

// Storage by case data
const caseStorageData = [
  { name: "Singh vs. Mehta", size: "1.2 GB", percentage: 19.2 },
  { name: "State vs. Kapoor", size: "945 MB", percentage: 14.4 },
  { name: "Sharma Enterprises", size: "827 MB", percentage: 12.6 },
  { name: "Gupta Family Dispute", size: "652 MB", percentage: 9.9 },
  { name: "Others", size: "2.8 GB", percentage: 43.9 },
];

// Storage cleanup options
const cleanupOptions = [
  {
    title: "Clear Cache",
    description: "Free up to 245 MB of space by clearing app cache",
    icon: <FaTrash />,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-500"
  },
  {
    title: "Clear Downloads",
    description: "Remove downloaded files to free up to 890 MB",
    icon: <AiOutlineClear />,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-400"
  },
  {
    title: "Archive Old Cases",
    description: "Move old cases to archive to save storage",
    icon: <FaBoxArchive />,
    iconBg: "bg-green-100",
    iconColor: "text-green-500"
  }
];

// Current plan features
const planFeatures = [
  {
    feature: "10 GB Storage",
    icon: <CloudIcon size={18} />
  },
  {
    feature: "Up to 10 team members",
    icon: <UsersIcon size={18} />
  },
  {
    feature: "Advanced reporting features",
    icon: <CheckCircleIcon size={18} />
  },
  {
    feature: "Priority customer support",
    icon: <RiCustomerService2Fill size={18} />
  }
];

const chartConfig = {
  visitors: {
    label: "Size",
  },
  chrome: {
    label: "Case Documents",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Hearing Recordings",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Images",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Other Files",
    color: "hsl(var(--chart-4))",
  },
}

// Custom tooltip component to display storage info with percentage
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 rounded shadow-md border border-gray-200">
        <p className="font-medium text-gray-900">{data.browser}</p>
        <p className="text-sm text-gray-600">{data.size} ({data.percentage}%)</p>
      </div>
    );
  }
  return null;
};

export default function StorageManagementCantainer() {
  // Storage usage data for the top card
  const usageData = {
    used: 6.4,
    total: 10.0,
    percentage: 64.0,
    remaining: 3.6
  };

  // Define colors for the custom legend
  const colorMap = {
    "Case Documents": "hsl(var(--chart-1))",
    "Hearing Recordings": "hsl(var(--chart-2))",
    "Images": "hsl(var(--chart-3))",
    "Other Files": "hsl(var(--chart-4))"
  };

  return (
    <div className="max-w-7xl mx-auto py-5 sm:flex items-start justify-between gap-6">
      {/* Left Column */}
      <div className='sm:w-2/3'>
      
        {/* Current Plan Card */}
        <div className='bg-white p-4 rounded-lg shadow mb-6'>
          <div className="font-semibold text-lg mb-4">Current Plan</div>
          <div className="bg-gray-50 p-5 rounded-lg">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#171717] text-white mr-3">
                <StarIcon size={20} />
              </div>
              <div>
                <div className="font-bold text-lg">Premium Plan</div>
                <div className="text-sm text-gray-500">Valid until 4/7/2025</div>
              </div>
            </div>
            <div className="space-y-3 mt-4">
              {planFeatures.map((feature, index) => (
                <div key={index} className="flex items-center text-gray-600">
                  <div className="w-6 mr-3 text-gray-500">
                    {feature.icon}
                  </div>
                  <div className="text-sm">{feature.feature}</div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <button className="bg-[#171717] text-white font-medium py-2 px-4 rounded-md w-full transition-colors duration-200 flex items-center justify-center">
                <span>Upgrade Plan</span>
              </button>
            </div>
          </div>
        </div>
        {/* Storage Usage Card */}
        <div className='bg-white p-4 rounded-lg shadow mb-6'>
          <div className="">
            <div className="flex justify-between items-center">
              <div className="text-lg font-semibold">Storage Used</div>
              <div className="flex items-center">
                <div className="relative w-10 h-10 flex items-center justify-center">
                  <div className="absolute w-10 h-10 rounded-full border-4 border-gray-200"></div>
                  <div className="absolute w-10 h-10 rounded-full border-4 border-transparent border-t-[#171717] border-r-[#171717] transform rotate-45"></div>
                </div>
                <div className="ml-2 text-sm text-gray-600 font-medium">
                  {usageData.remaining} GB<br/>left
                </div>
              </div>
            </div>
          </div>
          <div className="mt-2">
            <h1 className="text-3xl font-bold mb-1">
              {usageData.percentage}%
            </h1>
            
            <p className="text-sm text-gray-600 mb-4">
              {usageData.used} GB of {usageData.total} GB
            </p>
            
            <div className="relative h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-[#171717] rounded-full" 
                style={{ width: `${usageData.percentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Storage by Case Card */}
        <div className='bg-white p-4 rounded-lg shadow mb-6'>
          <div className="font-semibold text-lg mb-4">Storage by Case</div>
          <div className="space-y-4">
            {caseStorageData.map((caseItem, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between mb-1">
                  <div className="font-medium">{caseItem.name}</div>
                  <div className="text-gray-600">{caseItem.size}</div>
                </div>
                <div className="relative h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="absolute top-0 left-0 h-full bg-[#171717] rounded-full" 
                    style={{ width: `${caseItem.percentage}%` }}
                  ></div>
                </div>
                <div className="text-right mt-1 text-sm text-gray-500">{caseItem.percentage}%</div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Right Column - Storage Breakdown */}
      <div className='bg-white p-4 rounded-lg sm:w-1/3 shadow'>
        <div>
          <div className="font-semibold text-lg">Storage Breakdown</div>
          <div className="text-sm text-gray-600">Storage usage by category</div>
        </div>
        <div>
          <div className="flex flex-col items-center">
            {/* Chart Container */}
            <div className="h-[250px] w-full pt-10">
              <ChartContainer config={chartConfig} className="mx-auto max-h-[250px]">
                <PieChart>
                  <Pie 
                    data={chartData} 
                    dataKey="visitors" 
                    nameKey="browser"
                    cx="50%" 
                    cy="50%" 
                    innerRadius={30}
                    outerRadius={100}
                    paddingAngle={0}
                    label={(entry) => `${entry.percentage}%`}
                    labelLine={false}
                  />
                </PieChart>
              </ChartContainer>
            </div>
            
            {/* Custom Legend */}
            <div className="w-full mt-10 grid grid-cols-2 gap-4">
              {chartData.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div 
                    className="w-3 h-full mr-3 rounded" 
                    style={{ backgroundColor: colorMap[item.browser] || item.fill }}
                  ></div>
                  <div className="flex-1">
                    <p className="font-medium">
                      {item.browser}
                    </p>
                    <p className="text-sm text-gray-600">
                      {item.size}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600 font-medium">
                    {item.percentage}%
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Storage Cleanup Card */}
        <div className='mt-8'>
          <div className="font-semibold text-lg mb-4">Storage Cleanup</div>
          <div className="space-y-3">
            {cleanupOptions.map((option, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg flex items-center justify-between cursor-pointer hover:bg-gray-100 transition-colors">
                <div className="flex items-center">
                  <div className={`min-w-12 min-h-12 rounded-full flex items-center justify-center ${option.iconBg} ${option.iconColor} text-sm mr-4`}>
                    {option.icon}
                  </div>
                  <div>
                    <div className="font-medium">{option.title}</div>
                    <div className="text-sm text-gray-500">{option.description}</div>
                  </div>
                </div>
                <div className="text-gray-400">
                  <IoIosArrowForward size={20} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

