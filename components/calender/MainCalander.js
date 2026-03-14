'use client'
import React from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { HiOutlineCalendar, HiOutlineClipboardCheck, HiOutlineClock, HiOutlineFilter } from "react-icons/hi"
import { MdOutlineToday } from "react-icons/md"
import { IoCalendarClearOutline } from "react-icons/io5"
import { FiChevronLeft, FiChevronRight, FiPlus } from "react-icons/fi"

const localizer = momentLocalizer(moment)

// Court Legend component
const CourtLegend = ({ courtCategories }) => {
  return (
    <div className="bg-white shadow-sm rounded-lg p-4 mb-3">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium flex items-center">
          <HiOutlineFilter className="mr-1" />
          Court Filter
        </h3>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        {courtCategories.map(court => (
          <div key={court.name} className="flex items-center">
            <div 
              className="w-3 h-3 rounded-full mr-2" 
              style={{ backgroundColor: court.value }}
            ></div>
            <span className="text-sm text-gray-700">{court.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function MainCalander({ 
  events, 
  viewType, 
  setViewType,
  currentDate,
  setCurrentDate,
  handleSelectSlot,
  handleSelectEvent,
  eventStyleGetter,
  courtCategories,
  openAddHearingModal
}) {
  // Navigate to previous period
  const handlePrevious = () => {
    const newDate = new Date(currentDate)
    
    if (viewType === 'month') {
      newDate.setMonth(newDate.getMonth() - 1)
    } else if (viewType === 'week') {
      newDate.setDate(newDate.getDate() - 7)
    } else if (viewType === 'day') {
      newDate.setDate(newDate.getDate() - 1)
    }
    
    setCurrentDate(newDate)
  }

  // Navigate to next period
  const handleNext = () => {
    const newDate = new Date(currentDate)
    
    if (viewType === 'month') {
      newDate.setMonth(newDate.getMonth() + 1)
    } else if (viewType === 'week') {
      newDate.setDate(newDate.getDate() + 7)
    } else if (viewType === 'day') {
      newDate.setDate(newDate.getDate() + 1)
    }
    
    setCurrentDate(newDate)
  }

  // Format displayed date based on view
  const getHeaderTitle = () => {
    if (viewType === 'month') {
      return moment(currentDate).format('MMMM YYYY')
    } else if (viewType === 'week') {
      const startOfWeek = moment(currentDate).startOf('week')
      const endOfWeek = moment(currentDate).endOf('week')
      return `${startOfWeek.format('MMM D')} - ${endOfWeek.format('MMM D, YYYY')}`
    } else {
      return moment(currentDate).format('dddd, MMMM D, YYYY')
    }
  }

  // Add a function to navigate to today
  const goToToday = () => {
    setCurrentDate(new Date());
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-3">
        {/* Today Button */}
        <button
          onClick={goToToday}
          className="px-4 py-2 rounded-lg flex items-center bg-gray-100 text-gray-700 hover:bg-gray-200"
          title="Go to today"
        >
          <MdOutlineToday className="mr-2" size={18} />
          Today
        </button>

        {/* Navigation controls */}
        <div className="flex items-center">
          <button 
            onClick={handlePrevious}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Previous"
          >
            <FiChevronLeft size={20} className="text-gray-600" />
          </button>
          
          <span className="mx-3 font-medium min-w-[120px] text-center">
            {getHeaderTitle()}
          </span>
          
          <button 
            onClick={handleNext}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Next"
          >
            <FiChevronRight size={20} className="text-gray-600" />
          </button>
        </div>

        <div className="flex items-center space-x-2">
          {/* View type toggles */}
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setViewType('month')}
              className={`px-3 py-2 rounded-lg flex items-center ${viewType === 'month' 
                ? 'bg-[#171717] text-white' 
                : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              <IoCalendarClearOutline className="mr-1" />
              Month
            </button>
            <button 
              onClick={() => setViewType('week')}
              className={`px-3 py-2 rounded-lg flex items-center ${viewType === 'week' 
                ? 'bg-[#171717] text-white' 
                : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              <HiOutlineClipboardCheck className="mr-1" />
              Week
            </button>
            <button 
              onClick={() => setViewType('day')}
              className={`px-3 py-2 rounded-lg flex items-center ${viewType === 'day' 
                ? 'bg-[#171717] text-white' 
                : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              <HiOutlineClock className="mr-1" />
              Day
            </button>
          </div>
        </div>
      </div>

      {/* Court Legend */}
      <CourtLegend courtCategories={courtCategories} />

      <div className="flex-1 bg-white rounded-lg shadow-md p-4 overflow-hidden">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          selectable
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          eventPropGetter={eventStyleGetter}
          className="h-full"
          view={viewType}
          onView={setViewType}
          views={['month', 'week', 'day']}
          toolbar={false}
          date={currentDate}
          onNavigate={setCurrentDate}
        />
      </div>
    </div>
  )
}