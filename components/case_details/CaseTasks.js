'use client'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IoAdd, IoNotificationsOutline, IoClose } from 'react-icons/io5'
import { LuSearch, LuClock, LuCalendarClock, LuFilter } from 'react-icons/lu'
import { FiCheck, FiAlertCircle, FiUser } from 'react-icons/fi'
import { FaTasks } from 'react-icons/fa'
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

// Add Task Modal Component
function AddTask({ showAddTaskModal, setShowAddTaskModal, setTasks }) {
  const [taskTitle, setTaskTitle] = useState('')
  const [client, setClient] = useState('Robert Johnson')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [dueTime, setDueTime] = useState('')
  const [priority, setPriority] = useState('medium')
  const [hasReminder, setHasReminder] = useState(false)
  const [status, setStatus] = useState('pending')
  
  // Format date as "MMM DD, YYYY"
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };
  
  // Combine date and time into ISO string
  const combineDateAndTime = (dateString, timeString) => {
    if (!dateString) return '';
    
    // If no time provided, use noon as default time
    const timeToUse = timeString || '12:00';
    
    // Create date object from the combined date and time
    const dateObj = new Date(`${dateString}T${timeToUse}`);
    return dateObj.toISOString();
  };
  
  const modalVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  }
  
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 }
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    // Create a new task object
    const newTask = {
      id: Date.now(), // Simple unique ID
      title: taskTitle,
      date: formatDate(dueDate),
      dueDate: combineDateAndTime(dueDate, dueTime),
      client: client,
      description: description,
      hasReminder: hasReminder,
      status: status,
      priority: priority
    }
    
    // Add the new task to the tasks state
    setTasks(prevTasks => [newTask, ...prevTasks])
    
    // Reset form and close modal
    setTaskTitle('')
    setClient('Robert Johnson')
    setDescription('')
    setDueDate('')
    setDueTime('')
    setPriority('medium')
    setHasReminder(false)
    setStatus('pending')
    setShowAddTaskModal(false)
  }
  
  return (
    <AnimatePresence>
      {showAddTaskModal && (
        <motion.div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={() => setShowAddTaskModal(false)}
        >
          <motion.div 
            className="bg-white rounded-xl p-6 w-full max-w-md"
            variants={contentVariants}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Add New Task</h3>
              <button 
                className="p-1 rounded-full hover:bg-gray-100"
                onClick={() => setShowAddTaskModal(false)}
              >
                <IoClose className="text-gray-500 text-xl" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Task Title*
                  </label>
                  <input 
                    type="text"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    className="w-full p-2 border rounded-md text-sm appearance-none"
                    placeholder="Enter task title"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Client
                  </label>
                  <select
                    value={client}
                    onChange={(e) => setClient(e.target.value)}
                    className="w-full p-2 border rounded-md text-sm appearance-none"
                  >
                    <option value="Robert Johnson">Robert Johnson</option>
                    <option value="Sarah Smith">Sarah Smith</option>
                    <option value="Michael Brown">Michael Brown</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full h-20 p-2 border rounded-md text-sm appearance-none"
                    placeholder="Task description"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Due Date
                    </label>
                    <div 
                        className="relative w-full cursor-pointer"
                        onClick={() => {
                        const dateInput = document.getElementById('hearing-date');
                        if (dateInput) dateInput.showPicker();
                     }}
                    >
                        <input 
                            id="hearing-date"
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            className="w-full p-2 border rounded-md text-sm appearance-none cursor-pointer"
                        />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Due Time
                    </label>
                    <div 
                        className="relative w-full cursor-pointer"
                        onClick={() => {
                        const timeInput = document.getElementById('hearing-time');
                        if (timeInput) timeInput.showPicker();
                        }}
                    >
                        <input 
                            id="hearing-time"
                            type="time"
                            value={dueTime}
                            onChange={(e) => setDueTime(e.target.value)}
                            className="w-full p-2 border rounded-md text-sm appearance-none cursor-pointer"
                        />
                    </div>
                  </div>
                  
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Priority
                    </label>
                    <select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                      className="w-full p-2 border rounded-md text-sm appearance-none"
                    >
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full p-2 border rounded-md text-sm appearance-none"
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="urgent">Urgent</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="reminder" 
                    checked={hasReminder}
                    onCheckedChange={setHasReminder}
                    className="data-[state=checked]:bg-[#171717] data-[state=checked]:border-[#171717] border-gray-300"
                  />
                  <label
                    htmlFor="reminder"
                    className="text-sm font-medium leading-none cursor-pointer"
                  >
                    Set reminder
                  </label>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddTaskModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#171717] text-white rounded-md text-sm font-medium hover:bg-[#171717]/90"
                >
                  Add Task
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function CaseTasks() {
  const [value, setValue] = useState('')
  const [showAddTaskModal, setShowAddTaskModal] = useState(false)
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "File Motion for Discovery",
      date: "Mar 15, 2024",
      dueDate: "2024-03-15",
      client: "Robert Johnson",
      description: "Prepare and file motion for additional discovery documents from opposing party",
      hasReminder: true,
      status: "pending", // pending, urgent, in-progress, completed
      priority: "high" // high, medium, low
    },
    {
      id: 2,
      title: "Client Meeting for Deposition Prep",
      date: "Mar 18, 2024",
      dueDate: "2024-03-18",
      client: "Robert Johnson",
      description: "Prepare client for upcoming deposition scheduled for next week",
      hasReminder: true,
      status: "in-progress",
      priority: "medium"
    },
    {
      id: 3,
      title: "Draft Settlement Proposal",
      date: "Mar 10, 2024",
      dueDate: "2024-03-10",
      client: "Robert Johnson",
      description: "Create initial settlement proposal based on recent case developments",
      hasReminder: false,
      status: "completed",
      priority: "medium"
    },
    {
      id: 4,
      title: "Review Expert Witness Report",
      date: "Feb 28, 2024",
      dueDate: "2024-02-28", 
      client: "Robert Johnson",
      description: "Review technical report from expert witness and prepare questions",
      hasReminder: true,
      status: "urgent",
      priority: "high"
    },
    {
      id: 5,
      title: "Prepare Court Exhibits",
      date: "Mar 20, 2024",
      dueDate: "2024-03-20", 
      client: "Sarah Smith",
      description: "Organize and prepare exhibits for upcoming court hearing",
      hasReminder: true,
      status: "pending",
      priority: "high"
    },
    {
      id: 6,
      title: "Draft Response to Opposing Motion",
      date: "Mar 12, 2024",
      dueDate: "2024-03-12", 
      client: "Michael Brown",
      description: "Draft response to motion filed by opposing counsel",
      hasReminder: false,
      status: "completed",
      priority: "medium"
    },
  ])

  // Task filters state
  const [statusFilters, setStatusFilters] = useState({
    All: true,
    "pending": false,
    "urgent": false,
    "in-progress": false,
    "completed": false
  })
  
  // Priority filter state
  const [priorityFilters, setPriorityFilters] = useState({
    All: true,
    "high": false,
    "medium": false,
    "low": false
  })
  
  // Get unique clients from tasks
  const uniqueClients = Array.from(new Set(tasks.map(task => task.client)))
  
  // Client filter state - initialize with All checked and others unchecked
  const [clientFilters, setClientFilters] = useState(() => {
    const initialFilters = { All: true }
    uniqueClients.forEach(client => {
      initialFilters[client] = false
    })
    return initialFilters
  })
  
  const [isFiltering, setIsFiltering] = useState(false)
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const [filteredTasks, setFilteredTasks] = useState(tasks)

  // Check if window is desktop size on client side only
  useEffect(() => {
    setIsDesktop(window.innerWidth >= 640)
    
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 640)
    }
    
    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Filter tasks based on search, status filters, and client filter
  useEffect(() => {
    let filtered = [...tasks]
    
    // Apply search filter
    if (value.trim() !== '') {
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(value.toLowerCase()) ||
        task.client.toLowerCase().includes(value.toLowerCase()) ||
        task.description.toLowerCase().includes(value.toLowerCase())
      )
    }
    
    // Apply status filters
    if (!statusFilters.All) {
      const activeStatusFilters = Object.entries(statusFilters)
        .filter(([key, value]) => value && key !== 'All')
        .map(([key]) => key)
      
      filtered = filtered.filter(task => 
        activeStatusFilters.includes(task.status)
      )
    }
    
    // Apply client filters
    if (!clientFilters.All) {
      const activeClientFilters = Object.entries(clientFilters)
        .filter(([key, value]) => value && key !== 'All')
        .map(([key]) => key)
      
      filtered = filtered.filter(task => 
        activeClientFilters.includes(task.client)
      )
    }
    
    // Apply priority filters
    if (!priorityFilters.All) {
      const activePriorityFilters = Object.entries(priorityFilters)
        .filter(([key, value]) => value && key !== 'All')
        .map(([key]) => key)
      
      filtered = filtered.filter(task => 
        activePriorityFilters.includes(task.priority)
      )
    }
    
    setFilteredTasks(filtered)
  }, [tasks, value, statusFilters, clientFilters, priorityFilters])

  // Handle status filter changes
  const handleStatusFilterChange = (filter) => {
    setIsFiltering(true)
    
    if (filter === 'All') {
      // If 'All' is checked, uncheck others. If unchecked, keep at least one filter active
      const newFilters = {
        All: !statusFilters.All,
        "pending": false,
        "urgent": false,
        "in-progress": false,
        "completed": false
      }
      
      // If trying to uncheck 'All' when it's the only one checked, keep it checked
      if (!newFilters.All && !Object.entries(statusFilters).some(([key, value]) => key !== 'All' && value)) {
        newFilters.All = true
      }
      
      setStatusFilters(newFilters)
    } else {
      // If a specific filter is checked, uncheck 'All'
      const newFilters = {
        ...statusFilters,
        [filter]: !statusFilters[filter],
        All: false
      }
      
      // If all specific filters are unchecked, check 'All'
      if (!newFilters["pending"] && !newFilters["urgent"] && !newFilters["in-progress"] && !newFilters["completed"]) {
        newFilters.All = true
      }
      
      setStatusFilters(newFilters)
    }
    
    setTimeout(() => setIsFiltering(false), 300)
  }

  // Handle client filter changes
  const handleClientFilterChange = (client) => {
    setIsFiltering(true)
    
    if (client === 'All') {
      // If 'All' is checked, uncheck others. If unchecked, keep at least one filter active
      const newFilters = { All: !clientFilters.All }
      uniqueClients.forEach(c => {
        newFilters[c] = false
      })
      
      // If trying to uncheck 'All' when it's the only one checked, keep it checked
      if (!newFilters.All && !Object.entries(clientFilters).some(([key, value]) => key !== 'All' && value)) {
        newFilters.All = true
      }
      
      setClientFilters(newFilters)
    } else {
      // If a specific filter is checked, uncheck 'All'
      const newFilters = {
        ...clientFilters,
        [client]: !clientFilters[client],
        All: false
      }
      
      // If all specific filters are unchecked, check 'All'
      const anyClientSelected = uniqueClients.some(c => newFilters[c])
      if (!anyClientSelected) {
        newFilters.All = true
      }
      
      setClientFilters(newFilters)
    }
    
    setTimeout(() => setIsFiltering(false), 300)
  }

  // Handle priority filter changes
  const handlePriorityFilterChange = (priority) => {
    setIsFiltering(true)
    
    if (priority === 'All') {
      // If 'All' is checked, uncheck others. If unchecked, keep at least one filter active
      const newFilters = {
        All: !priorityFilters.All,
        "high": false,
        "medium": false,
        "low": false
      }
      
      // If trying to uncheck 'All' when it's the only one checked, keep it checked
      if (!newFilters.All && !Object.entries(priorityFilters).some(([key, value]) => key !== 'All' && value)) {
        newFilters.All = true
      }
      
      setPriorityFilters(newFilters)
    } else {
      // If a specific filter is checked, uncheck 'All'
      const newFilters = {
        ...priorityFilters,
        [priority]: !priorityFilters[priority],
        All: false
      }
      
      // If all specific filters are unchecked, check 'All'
      if (!newFilters["high"] && !newFilters["medium"] && !newFilters["low"]) {
        newFilters.All = true
      }
      
      setPriorityFilters(newFilters)
    }
    
    setTimeout(() => setIsFiltering(false), 300)
  }

  // Animation variants
  const filterContainerVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        staggerChildren: 0.07
      }
    }
  }

  const filterItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  }

  const countBadgeVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    },
    exit: { scale: 0.8, opacity: 0 }
  }

  const toggleMobileFilters = () => {
    setShowMobileFilters(!showMobileFilters)
  }

  // Get today's date for comparison
  const today = new Date()
  const todayString = today.toISOString().split('T')[0]

  // Function to check if a task is overdue
  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    
    // Parse the ISO string to a date object
    const dueDateTime = new Date(dueDate);
    const now = new Date();
    
    // Compare the dates
    return dueDateTime < now && dueDate !== "";
  }

  // Function to toggle task completion
  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { 
            ...task, 
            status: task.status === 'completed' ? 'pending' : 'completed' 
          } 
        : task
    ))
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div className='w-full'>
        <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between my-4 gap-2'>
          <h2 className="text-2xl font-bold text-[#171717]">Tasks</h2>
          <div className='flex items-center gap-2 w-full sm:w-auto justify-end'>
            <div className="relative w-full sm:w-auto sm:max-w-[300px] flex items-center">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <LuSearch />
              </div>
              <input 
                id="search"
                type="text"
                value={value}
                onChange={(e) => {
                  setValue(e.target.value)
                  setIsFiltering(true)
                  setTimeout(() => setIsFiltering(false), 300)
                }}
                onFocus={(e) => e.target.select()}
                className="h-[40px] w-full bg-transparent border border-gray-500 rounded-full text-sm pl-10 pr-10 focus:outline-none placeholder:text-gray-500"
                placeholder="Search tasks..."
              />
              {value ? (
                <button 
                  onClick={() => {
                    setValue('')
                    setIsFiltering(true)
                    setTimeout(() => setIsFiltering(false), 300)
                  }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-700"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              ) : null}
            </div>
            {/* Mobile filter toggle button */}
            <div className="sm:hidden">
              <motion.button
                className="bg-[#171717] text-white py-3 px-4 rounded-lg flex items-center gap-2"
                whileTap={{ scale: 0.95 }}
                onClick={toggleMobileFilters}
              >
                <LuFilter />
              </motion.button>
            </div>
            <button 
              className="mybtn text-sm flex items-center justify-center gap-2 group transition-all duration-300 hover:bg-transparent hover:text-[#171717] whitespace-nowrap"
              onClick={() => setShowAddTaskModal(true)}
            >
              <IoAdd className="text-lg transition-all duration-300 group-hover:scale-110" />
              <span className="hidden sm:inline">Add Task</span>
              <span className="sm:hidden">Add</span>
            </button>
          </div>
        </div>
        
        {/* Add Task Modal */}
        <AddTask showAddTaskModal={showAddTaskModal} setShowAddTaskModal={setShowAddTaskModal} setTasks={setTasks} />
        
        <div className="sm:flex justify-between gap-5">
          {/* Filters panel - responsive */}
          <AnimatePresence>
            {(showMobileFilters || isDesktop) && (
              <motion.div 
                className='fixed sm:static top-0 left-0 right-0 bottom-0 z-30 sm:z-auto bg-black/50 sm:bg-transparent flex sm:block'
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={filterContainerVariants}
                onClick={(e) => {
                  if (e.target === e.currentTarget) {
                    setShowMobileFilters(false);
                  }
                }}
              >
                <motion.div 
                  className='sm:w-[250px] w-[280px] max-h-[90vh] sm:max-h-none overflow-y-auto p-5 rounded-2xl bg-white h-fit mb-5 sm:mb-0 m-auto sm:m-0'
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between mb-3 sm:hidden">
                    <motion.p className='text-lg font-medium'>Filters</motion.p>
                    <button 
                      onClick={() => setShowMobileFilters(false)}
                      className="p-1 rounded-full hover:bg-gray-200"
                    >
                      ✕
                    </button>
                  </div>
                  <motion.p 
                    className='text-lg font-medium pb-5 hidden sm:block'
                    variants={filterItemVariants}
                  >
                    Filters
                  </motion.p>
                  <div className="">
                    <motion.div className="text-sm font-medium text-gray-500 pb-3" variants={filterItemVariants}>
                      Filter by Status:
                    </motion.div>
                    <div className="grid gap-4 ml-3 pb-5">
                      <motion.div className="flex items-center space-x-2" variants={filterItemVariants}>
                        <Checkbox 
                          id="status-all" 
                          checked={statusFilters.All}
                          onCheckedChange={() => handleStatusFilterChange('All')}
                          className="data-[state=checked]:bg-[#171717] data-[state=checked]:border-[#171717] border-gray-300"
                        />
                        <label
                          htmlFor="status-all"
                          className="text-sm font-medium leading-none cursor-pointer"
                        >
                          All
                        </label>
                      </motion.div>
                      
                      <motion.div className="flex items-center space-x-2" variants={filterItemVariants}>
                        <Checkbox 
                          id="status-pending" 
                          checked={statusFilters["pending"]}
                          onCheckedChange={() => handleStatusFilterChange("pending")}
                          className="data-[state=checked]:bg-[#171717] data-[state=checked]:border-[#171717] border-gray-300"
                        />
                        <label
                          htmlFor="status-pending"
                          className="text-sm font-medium leading-none cursor-pointer"
                        >
                          Pending
                        </label>
                      </motion.div>
                      
                      <motion.div className="flex items-center space-x-2" variants={filterItemVariants}>
                        <Checkbox 
                          id="status-urgent" 
                          checked={statusFilters["urgent"]}
                          onCheckedChange={() => handleStatusFilterChange("urgent")}
                          className="data-[state=checked]:bg-[#171717] data-[state=checked]:border-[#171717] border-gray-300"
                        />
                        <label
                          htmlFor="status-urgent"
                          className="text-sm font-medium leading-none cursor-pointer"
                        >
                          Urgent
                        </label>
                      </motion.div>
                      
                      <motion.div className="flex items-center space-x-2" variants={filterItemVariants}>
                        <Checkbox 
                          id="status-inprogress" 
                          checked={statusFilters["in-progress"]}
                          onCheckedChange={() => handleStatusFilterChange("in-progress")}
                          className="data-[state=checked]:bg-[#171717] data-[state=checked]:border-[#171717] border-gray-300"
                        />
                        <label
                          htmlFor="status-inprogress"
                          className="text-sm font-medium leading-none cursor-pointer"
                        >
                          In Progress
                        </label>
                      </motion.div>
                      
                      <motion.div className="flex items-center space-x-2" variants={filterItemVariants}>
                        <Checkbox 
                          id="status-completed" 
                          checked={statusFilters["completed"]}
                          onCheckedChange={() => handleStatusFilterChange("completed")}
                          className="data-[state=checked]:bg-[#171717] data-[state=checked]:border-[#171717] border-gray-300"
                        />
                        <label
                          htmlFor="status-completed"
                          className="text-sm font-medium leading-none cursor-pointer"
                        >
                          Completed
                        </label>
                      </motion.div>
                    </div>
                    
                    {/* Client Filter Section */}
                    <motion.div 
                      className="text-sm font-medium text-gray-500 pt-5 pb-3 border-t border-gray-200"
                      variants={filterItemVariants}
                    >
                      Filter by Client:
                    </motion.div>
                    
                    <div className="grid gap-4 ml-3 pb-5">
                      <motion.div className="flex items-center space-x-2" variants={filterItemVariants}>
                        <Checkbox 
                          id="client-all" 
                          checked={clientFilters.All}
                          onCheckedChange={() => handleClientFilterChange('All')}
                          className="data-[state=checked]:bg-[#171717] data-[state=checked]:border-[#171717] border-gray-300"
                        />
                        <label
                          htmlFor="client-all"
                          className="text-sm font-medium leading-none cursor-pointer"
                        >
                          All Clients
                        </label>
                      </motion.div>
                      
                      {uniqueClients.map((client, index) => (
                        <motion.div 
                          key={index} 
                          className="flex items-center space-x-2" 
                          variants={filterItemVariants}
                        >
                          <Checkbox 
                            id={`client-${index}`} 
                            checked={clientFilters[client] || false}
                            onCheckedChange={() => handleClientFilterChange(client)}
                            className="data-[state=checked]:bg-[#171717] data-[state=checked]:border-[#171717] border-gray-300"
                          />
                          <label
                            htmlFor={`client-${index}`}
                            className="text-sm font-medium leading-none cursor-pointer"
                          >
                            {client}
                          </label>
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Priority Filter Section */}
                    <motion.div 
                      className="text-sm font-medium text-gray-500 pt-5 pb-3 border-t border-gray-200"
                      variants={filterItemVariants}
                    >
                      Filter by Priority:
                    </motion.div>
                    
                    <div className="grid gap-4 ml-3 pb-5">
                      <motion.div className="flex items-center space-x-2" variants={filterItemVariants}>
                        <Checkbox 
                          id="priority-all" 
                          checked={priorityFilters.All}
                          onCheckedChange={() => handlePriorityFilterChange('All')}
                          className="data-[state=checked]:bg-[#171717] data-[state=checked]:border-[#171717] border-gray-300"
                        />
                        <label
                          htmlFor="priority-all"
                          className="text-sm font-medium leading-none cursor-pointer"
                        >
                          All Priorities
                        </label>
                      </motion.div>
                      
                      <motion.div className="flex items-center space-x-2" variants={filterItemVariants}>
                        <Checkbox 
                          id="priority-high" 
                          checked={priorityFilters["high"]}
                          onCheckedChange={() => handlePriorityFilterChange("high")}
                          className="data-[state=checked]:bg-[#171717] data-[state=checked]:border-[#171717] border-gray-300"
                        />
                        <label
                          htmlFor="priority-high"
                          className="text-sm font-medium leading-none cursor-pointer"
                        >
                          High
                        </label>
                      </motion.div>
                      
                      <motion.div className="flex items-center space-x-2" variants={filterItemVariants}>
                        <Checkbox 
                          id="priority-medium" 
                          checked={priorityFilters["medium"]}
                          onCheckedChange={() => handlePriorityFilterChange("medium")}
                          className="data-[state=checked]:bg-[#171717] data-[state=checked]:border-[#171717] border-gray-300"
                        />
                        <label
                          htmlFor="priority-medium"
                          className="text-sm font-medium leading-none cursor-pointer"
                        >
                          Medium
                        </label>
                      </motion.div>
                      
                      <motion.div className="flex items-center space-x-2" variants={filterItemVariants}>
                        <Checkbox 
                          id="priority-low" 
                          checked={priorityFilters["low"]}
                          onCheckedChange={() => handlePriorityFilterChange("low")}
                          className="data-[state=checked]:bg-[#171717] data-[state=checked]:border-[#171717] border-gray-300"
                        />
                        <label
                          htmlFor="priority-low"
                          className="text-sm font-medium leading-none cursor-pointer"
                        >
                          Low
                        </label>
                      </motion.div>
                    </div>
                  </div>
                  
                  {/* Task Count with Animation */}
                  <motion.div
                    className="mt-4 flex items-center justify-between"
                    variants={filterItemVariants}
                  >
                    <motion.p className="text-gray-600 text-sm font-medium flex items-center py-2">
                      <FaTasks className='mr-2' />
                      Showing 
                    </motion.p>
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={filteredTasks.length}
                        className="bg-[#171717] text-white text-sm font-bold w-8 h-8 flex items-center justify-center rounded-full" 
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={countBadgeVariants}
                      >
                        {filteredTasks.length}
                      </motion.span>
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Task List with loading state */}
          <motion.div 
            className='sm:flex-1'
            animate={{ opacity: isFiltering ? 0.7 : 1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-white rounded-xl p-3 sm:p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                <h3 className="text-lg font-semibold text-[#171717]">Task List</h3>
                
                <div className="flex flex-wrap items-center gap-2">
                  {!statusFilters.All && (
                    <Badge variant="outline" className="text-xs">
                      Filtered by status
                    </Badge>
                  )}
                  {!clientFilters.All && (
                    <Badge variant="outline" className="text-xs">
                      Filtered by client
                    </Badge>
                  )}
                  {!priorityFilters.All && (
                    <Badge variant="outline" className="text-xs">
                      Filtered by priority
                    </Badge>
                  )}
                  {value && (
                    <Badge variant="outline" className="text-xs">
                      Search: &quot;{value}&quot;
                    </Badge>
                  )}
                </div>
              </div>
              
              {filteredTasks.length > 0 ? (
                <div className="space-y-3">
                  {filteredTasks.map((task) => (
                    <div 
                      key={task.id} 
                      className={`border rounded-lg p-3 sm:p-4 transition-all hover:shadow-md ${
                        task.status === 'completed' 
                          ? 'bg-gray-50 border-gray-200' 
                          : task.status === 'urgent'
                            ? 'bg-red-50 border-red-200'
                            : task.status === 'in-progress'
                              ? 'bg-blue-50 border-blue-200'
                              : 'bg-white border-gray-200'
                      }`}
                    >
                      <div className="flex items-start gap-2 sm:gap-3">
                        {/* Task completion checkbox */}
                        <button 
                          onClick={() => toggleTaskCompletion(task.id)}
                          className={`mt-1 min-w-5 min-h-5 w-5 h-5 rounded-full flex items-center justify-center border ${
                            task.status === 'completed' 
                              ? 'bg-green-500 border-green-500 text-white' 
                              : task.status === 'urgent'
                                ? 'border-red-500' 
                                : task.status === 'in-progress'
                                  ? 'border-blue-500'
                                  : 'border-gray-400'
                          }`}
                        >
                          {task.status === 'completed' && <FiCheck size={12} />}
                          {task.status === 'urgent' && <FiAlertCircle size={12} className="text-red-500" />}
                        </button>
                        
                        {/* Task content */}
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                            <div>
                              <h4 className={`font-medium ${task.status === 'completed' ? 'line-through text-gray-500' : ''}`}>
                                {task.title}
                              </h4>
                              <div className="flex items-center gap-2 flex-wrap">
                                <p className="text-sm text-gray-600">Client:</p>
                                <Badge variant="outline" className="text-xs py-0 px-2 h-5">
                                  {task.client}
                                </Badge>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 flex-wrap mt-2 sm:mt-0">
                              {task.hasReminder && (
                                <div className="text-blue-500" title="Reminder set">
                                  <IoNotificationsOutline />
                                </div>
                              )}
                              <Badge className={`${
                                task.priority === 'high' 
                                  ? 'bg-red-100 text-red-700 hover:!bg-red-100' 
                                  : task.priority === 'medium'
                                    ? 'bg-yellow-100 text-yellow-700 hover:!bg-yellow-100'
                                    : 'bg-blue-100 text-blue-700 hover:!bg-blue-100'
                              }`}>
                                {task.priority}
                              </Badge>
                              <Badge className={`${
                                task.status === 'urgent'
                                  ? 'bg-red-100 text-red-700 hover:!bg-red-100' 
                                  : task.status === 'in-progress'
                                    ? 'bg-blue-100 text-blue-700 hover:!bg-blue-100'
                                    : task.status === 'completed'
                                      ? 'bg-green-100 text-green-700 hover:!bg-green-100'
                                      : 'bg-gray-100 text-gray-700 hover:!bg-gray-100'
                              }`}>
                                {task.status === 'in-progress' ? 'In Progress' : task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                              </Badge>
                            </div>
                          </div>
                          
                          <p className="text-sm text-gray-500 mt-1 mb-2">
                            {task.description}
                          </p>
                          
                          <div className="flex items-center text-xs text-gray-500">
                            <div className="flex items-center gap-1 mr-3">
                              <LuCalendarClock size={14} />
                              {task.date}
                            </div>
                            {isOverdue(task.dueDate) && task.status !== 'completed' && (
                              <div className="flex items-center gap-1 text-red-500">
                                <LuClock size={14} />
                                Overdue
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 sm:py-8">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <LuClock className="text-gray-400 text-xl sm:text-2xl" />
                  </div>
                  <h3 className="text-base sm:text-lg font-medium text-gray-700 mb-1 sm:mb-2">No tasks found</h3>
                  <p className="text-gray-500 text-xs sm:text-sm mb-3 sm:mb-4 px-4">
                    {value || !statusFilters.All || !clientFilters.All || !priorityFilters.All ? "No tasks match your filters." : "You haven't added any tasks yet."}
                  </p>
                  {!value && statusFilters.All && clientFilters.All && priorityFilters.All && (
                    <button 
                      className="mybtn text-sm inline-flex items-center justify-center gap-2"
                      onClick={() => setShowAddTaskModal(true)}
                    >
                      <IoAdd className="text-lg" />
                      Add Task
                    </button>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
