"use client"
import { useState, useMemo } from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export function CommonGraphTable({ data, config, headers, xAxisKey, isTable, setIsTable }) {
  

  // Automatically generate headers from data if not provided
  const tableHeaders = useMemo(() => {
    if (headers) return headers;
    
    // Extract all unique keys from data objects
    return Object.keys(data[0]);
  }, [data, headers]);

  const dataKeys = useMemo(() => {
    return Object.keys(data[0]);
  }, [data]);
  
 
  return (
    <div className="">
      {/* Chart View */}
      <div className={`${isTable ? 'hidden' : 'h-[400px] w-full bg-white p-5 rounded-2xl py-5'}`}>
      <ChartContainer config={config} className={`${isTable ? 'hidden' : ''} h-full w-full`}>
      <BarChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey={xAxisKey}
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        {dataKeys.map((key, index) => (
          <Bar key={index} dataKey={key} fill={config[key]?.color || 'var(--color-default)'} radius={4} />
        ))}
      </BarChart>
    </ChartContainer>
      </div>
      
      {/* Table View */}
      <div className={`${isTable ? 'block' : 'hidden'}`}>
        <table className='min-w-full rounded-2xl'>
          <thead>
            <tr>
              {tableHeaders.map((header, index) => (
                <th 
                  key={index} 
                  className={`py-3 px-1 text-left text-white font-normal bg-[#171717] ${
                    index === 0 ? 'rounded-l-[10px] pl-4' : ''
                  } ${
                    index === tableHeaders.length - 1 ? 'rounded-r-[10px] pr-4' : ''
                  }`}
                >
                  {config && config[header]?.label ? config[header].label : header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                {tableHeaders.map((header, colIndex) => (
                  <td key={colIndex} className='py-4 px-1 pl-4'>
                    {typeof row[header.toLowerCase()] !== 'undefined' ? row[header.toLowerCase()] : row[header]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
