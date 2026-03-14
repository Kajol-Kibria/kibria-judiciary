'use client'
import React, { useState, useEffect } from 'react'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { GiGavel, GiInjustice, GiJusticeStar } from "react-icons/gi"
import { FaRegBuilding, FaBalanceScale, FaRegStar, FaUserTie } from "react-icons/fa"
import { BsFillCircleFill } from "react-icons/bs"
import { HiOutlineDocumentText } from "react-icons/hi"
import { FiPlus } from "react-icons/fi"
import { HiOutlineCalendar } from "react-icons/hi"


// Import new components
import MainCalander from './MainCalander'
import TodaysHearings from './TodaysHearings'
import AddHearingsModal from './AddHearingsModal'

// Court categories with colors and icons
const courtCategories = [
  { 
    name: 'Supreme Court', 
    value: '#E53E3E', // Red
    icon: GiJusticeStar,
    description: 'Supreme court hearings'
  },
  { 
    name: 'Civil Court', 
    value: '#3182CE', // Blue
    icon: FaBalanceScale,
    description: 'Civil court cases'
  },
  { 
    name: 'Commercial Court', 
    value: '#ECC94B', // Yellow
    icon: FaRegBuilding,
    description: 'Commercial litigation'
  },
  { 
    name: 'Family Court', 
    value: '#48BB78', // Green
    icon: GiInjustice,
    description: 'Family law matters'
  },
  { 
    name: 'Tax Court', 
    value: '#805AD5', // Purple
    icon: HiOutlineDocumentText,
    description: 'Tax disputes and appeals'
  },
  { 
    name: 'Criminal Court', 
    value: '#8B4513', // Brown
    icon: GiGavel,
    description: 'Criminal law proceedings'
  },
  { 
    name: 'Other Courts', 
    value: '#718096', // Gray
    icon: FaRegStar,
    description: 'Miscellaneous court proceedings'
  }
]

// Hearing status options
const hearingStatusOptions = [
  { name: 'Scheduled', value: '#8B5CF6', bgColor: '#EDE9FE' },
  { name: 'In Progress', value: '#F59E0B', bgColor: '#FEF3C7' },
  { name: 'Checked In', value: '#10B981', bgColor: '#D1FAE5' },
  { name: 'Urgent', value: '#EF4444', bgColor: '#FEE2E2' },
  { name: 'Cancelled', value: '#6B7280', bgColor: '#F3F4F6' }
]

export default function CalenderCantainer() {
  const [events, setEvents] = useState([
    // Sample hearing data
    {
      id: 1,
      title: 'Smith v. Johnson Property Dispute',
      caseNumber: 'CIV-2023-042',
      client: 'John Smith',
      location: 'Delhi High Court',
      courtroom: 'Room 302',
      status: 'In Progress',
      statusColor: '#F59E0B',
      statusBgColor: '#FEF3C7',
      start: new Date(2023, 4, 10, 9, 30), // May 10, 2023, 9:30 AM
      end: new Date(2023, 4, 10, 11, 0),
      court: 'High Court',
      color: '#004D40'
    },
    {
      id: 2,
      title: 'Martinez v. Delhi Corporation',
      caseNumber: 'CIV-2023-107',
      client: 'Carlos Martinez',
      location: 'Delhi High Court',
      courtroom: 'Room 405',
      status: 'Checked In',
      statusColor: '#10B981',
      statusBgColor: '#D1FAE5',
      start: new Date(2023, 4, 10, 11, 0), // May 10, 2023, 11:00 AM
      end: new Date(2023, 4, 10, 12, 30),
      court: 'High Court',
      color: '#004D40'
    },
    {
      id: 3,
      title: 'Kumar Tax Appeal',
      caseNumber: 'TAX-2023-089',
      client: 'Raj Kumar',
      location: 'Supreme Court',
      courtroom: 'Room 110',
      status: 'Scheduled',
      statusColor: '#8B5CF6',
      statusBgColor: '#EDE9FE',
      start: new Date(2023, 4, 10, 14, 0), // May 10, 2023, 2:00 PM
      end: new Date(2023, 4, 10, 15, 30),
      court: 'Supreme Court',
      color: '#8B0000'
    }
  ])
  const [showModal, setShowModal] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)
  const [eventTitle, setEventTitle] = useState('')
  const [eventDescription, setEventDescription] = useState('')
  const [eventLocation, setEventLocation] = useState('')
  const [eventCourt, setEventCourt] = useState(courtCategories[0])
  const [viewType, setViewType] = useState('month')
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [showEventDetails, setShowEventDetails] = useState(false)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showTodayHearings, setShowTodayHearings] = useState(true)
  const [eventClient, setEventClient] = useState('')
  const [eventStatus, setEventStatus] = useState(hearingStatusOptions[0])

  const openAddHearingModal = (date = currentDate) => {
    setSelectedDate(date);
    setSelectedEvent(null);
    setShowModal(true);
  }

  // Handle date selection
  const handleSelectSlot = ({ start }) => {
    setSelectedDate(start)
    setShowModal(true)
    setSelectedEvent(null)
  }

  // Handle clicking on an event
  const handleSelectEvent = (event) => {
    setSelectedEvent(event)
    setShowEventDetails(true)
  }

  // Add new event
  const handleAddEvent = () => {
    if (!eventTitle.trim()) return

    const newEvent = {
      id: Date.now(),
      title: eventTitle,
      description: eventDescription,
      location: eventLocation,
      start: selectedDate,
      end: moment(selectedDate).add(1, 'hours').toDate(),
      court: eventCourt.name,
      color: eventCourt.value,
      client: eventClient,
      courtIcon: eventCourt.name,
      status: eventStatus.name,
      statusColor: eventStatus.value,
      statusBgColor: eventStatus.bgColor
    }

    setEvents([...events, newEvent])
    closeModal()
  }

  // Delete event
  const handleDeleteEvent = (id) => {
    setEvents(events.filter(event => event.id !== id))
    setShowEventDetails(false)
  }

  // Close modal and reset form
  const closeModal = () => {
    setShowModal(false)
    setEventTitle('')
    setEventDescription('')
    setEventLocation('')
    setEventClient('')
    setEventCourt(courtCategories[0])
    setEventStatus(hearingStatusOptions[0])
  }

  // Custom event styling to apply the selected color
  const eventStyleGetter = (event) => {
    return {
      style: {
        backgroundColor: event.color || courtCategories[0].value,
        borderRadius: '4px',
        color: '#fff',
        border: 'none',
        boxShadow: '0 2px 4px rgba(0,0,0,0.18)'
      }
    }
  }

  // Handle check-in
  const handleCheckIn = (eventId) => {
    setEvents(
      events.map(event => 
        event.id === eventId 
          ? {
              ...event, 
              status: 'Checked In',
              statusColor: '#10B981',
              statusBgColor: '#D1FAE5'
            } 
          : event
      )
    );
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="flex justify-between items-center my-5 px-2">
        <h1 className="text-2xl font-bold flex items-center">
          <HiOutlineCalendar className="mr-2" size={24} />
          Calendar
        </h1>
        {/* Add Hearing Button */}
        <button
          onClick={() => openAddHearingModal(new Date())}
          className="px-4 py-2 rounded-lg flex items-center bg-[#171717] text-white"
        >
          <FiPlus className="mr-2" size={18} />
          Add Hearing
        </button>
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Calendar Section */}
        <div className="w-1/3 h-full overflow-hidden pr-2">
          <TodaysHearings 
            events={events}
            handleCheckIn={handleCheckIn}
          />
        </div>
        <div className="w-2/3 h-full overflow-hidden">
          <MainCalander 
            events={events}
            viewType={viewType}
            setViewType={setViewType}
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
            handleSelectSlot={handleSelectSlot}
            handleSelectEvent={handleSelectEvent}
            eventStyleGetter={eventStyleGetter}
            courtCategories={courtCategories}
            openAddHearingModal={openAddHearingModal}
          />
        </div>
      </div>
      
      {/* Add Event Modal */}
      <AddHearingsModal 
        showModal={showModal}
        closeModal={closeModal}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        eventTitle={eventTitle}
        setEventTitle={setEventTitle}
        eventDescription={eventDescription}
        setEventDescription={setEventDescription}
        eventLocation={eventLocation}
        setEventLocation={setEventLocation}
        eventCourt={eventCourt}
        setEventCourt={setEventCourt}
        handleAddEvent={handleAddEvent}
        selectedEvent={selectedEvent}
        courtCategories={courtCategories}
        eventClient={eventClient}
        setEventClient={setEventClient}
        eventStatus={eventStatus}
        setEventStatus={setEventStatus}
        hearingStatusOptions={hearingStatusOptions}
      />
    </div>
  )
}


