"use client"
import * as React from "react"
import { addDays, format, startOfYear, subDays, startOfMonth, endOfMonth, subMonths, subYears, endOfYear, startOfDay } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function CustomDateRangePicker() {
  const [dateRange, setDateRange] = React.useState({
    from: new Date(),
    to: new Date()
  });
  
  // Safe setter to prevent undefined values
  const setDateRangeSafely = (range) => {
    if (!range) return;
    
    // Ensure both from and to are set
    const safeRange = {
      from: range.from || new Date(),
      to: range.to || range.from || new Date()
    };
    
    setDateRange(safeRange);
    console.log(safeRange)
  };
  
  const handleTodaySelect = () => {
    try {
      const today = new Date();
      setDateRangeSafely({
        from: today,
        to: today
      });
    } catch (error) {
      console.error("Error in handleTodaySelect:", error);
    }
  };

  const handleYTDSelect = () => {
    setDateRangeSafely({
      from: startOfYear(new Date()),
      to: new Date()
    });
  };

  const handleLast7DaysSelect = () => {
    setDateRangeSafely({
      from: subDays(new Date(), 7),
      to: new Date()
    });
  };

  const handleThisMonthSelect = () => {
    setDateRangeSafely({
      from: startOfMonth(new Date()),
      to: new Date()
    });
  };

  const handleLastMonthSelect = () => {
    const lastMonth = subMonths(new Date(), 1);
    setDateRangeSafely({
      from: startOfMonth(lastMonth),
      to: endOfMonth(lastMonth)
    });
  };

  const handleLast6MonthsSelect = () => {
    setDateRangeSafely({
      from: subMonths(new Date(), 6),
      to: new Date()
    });
  };

  const handleLastYearSelect = () => {
    setDateRangeSafely({
      from: startOfYear(subYears(new Date(), 1)),
      to: endOfYear(subYears(new Date(), 1))
    });
  };

  const handleCustomRangeSelect = () => {
    // Do nothing - will use the calendar directly
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full sm:w-fit justify-start text-left text-xs font-medium dark:bg-gray-800",
            !dateRange && "text-muted-foreground"
          )}
        >
          <CalendarIcon/>
          {dateRange.from && dateRange.to ? (
            `${format(dateRange.from, "MMM d, yyyy")} - ${format(dateRange.to, "MMM d, yyyy")}`
          ) : (
            <span>Pick a date range</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="flex w-auto flex-col space-y-2 p-2"
      >
        <div className="relative">
          <select
            className="w-full p-2 border rounded-md text-sm appearance-none"
            onChange={(e) => {
              const value = e.target.value;
              if (value === "today") {
                handleTodaySelect();
              } else if (value === "ytd") {
                handleYTDSelect();
              } else if (value === "last7days") {
                handleLast7DaysSelect();
              } else if (value === "thismonth") {
                handleThisMonthSelect();
              } else if (value === "lastmonth") {
                handleLastMonthSelect();
              } else if (value === "last6months") {
                handleLast6MonthsSelect();
              } else if (value === "lastyear") {
                handleLastYearSelect();
              } else if (value === "custom") {
                handleCustomRangeSelect();
              }
            }}
            style={{ 
              WebkitAppearance: "none", 
              MozAppearance: "none" 
            }}
          >
            <option value="" disabled selected>Select range</option>
            <option value="today" className="hover:bg-gray-900 hover:text-black">Today</option>
            <option value="last7days" className="hover:bg-gray-200 hover:text-black">Last 7 Days</option>
            <option value="thismonth" className="hover:bg-gray-200 hover:text-black">This Month</option>
            <option value="lastmonth" className="hover:bg-gray-200 hover:text-black">Last Month</option>
            <option value="last6months" className="hover:bg-gray-200 hover:text-black">Last 6 Months</option>
            <option value="ytd" className="hover:bg-gray-200 hover:text-black">This Year</option>
            <option value="lastyear" className="hover:bg-gray-200 hover:text-black">Last Year</option>
            <option value="custom" className="hover:bg-gray-200 hover:text-black">Custom Range</option>
          </select>
        </div>
        <div className="rounded-md border">
          <Calendar
            mode="range"
            selected={dateRange}
            onSelect={setDateRangeSafely}
            numberOfMonths={2}
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}