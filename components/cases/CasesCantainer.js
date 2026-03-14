'use client'
import React, { useState, useEffect } from 'react';
import CaseList from './CaseList';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FaGavel, FaFilter } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const sampleCases = [
  {
    caseId: "CRL/123/2023",
    status: "Active",
    client: "John Doe",
    clientPicture: null,
    courtName: "High Court of Delhi",
    nextHearingDate: "2024-06-15"
  },
  {
    caseId: "CIV/456/2023",
    status: "Pending",
    client: "Sarah Smith",
    courtName: "District Court",
    nextHearingDate: "2024-06-20"
  },
  {
    caseId: "FAM/789/2023",
    status: "Closed",
    client: "Michael Brown",
    clientPicture: null,
    courtName: "Family Court",
    nextHearingDate: null
  },
  {
    caseId: "CRM/101/2023",
    status: "Urgent",
    client: "Emily Wilson",
    courtName: "Supreme Court",
    nextHearingDate: "2024-06-10"
  },
  {
    caseId: "CIV/202/2023",
    status: "Active",
    client: "Robert Johnson",
    clientPicture: null,
    courtName: "High Court",
    nextHearingDate: "2024-06-25"
  }
];

export default function CasesCantainer() {
  const [statusFilters, setStatusFilters] = useState({
    All: true,
    Active: false,
    Closed: false
  });
  
  const [courtFilter, setCourtFilter] = useState("All");
  const [filteredCases, setFilteredCases] = useState(sampleCases);
  const [isFiltering, setIsFiltering] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // Check if window is desktop size on client side only
  useEffect(() => {
    setIsDesktop(window.innerWidth >= 640);
    
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 640);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
  };

  const filterItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

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
  };
  
  // Handle status filter changes
  const handleStatusFilterChange = (filter) => {
    setIsFiltering(true);
    
    if (filter === 'All') {
      // If 'All' is checked, uncheck others. If unchecked, keep at least one filter active
      const newFilters = {
        All: !statusFilters.All,
        Active: false,
        Closed: false
      };
      
      // If trying to uncheck 'All' when it's the only one checked, keep it checked
      if (!newFilters.All && !statusFilters.Active && !statusFilters.Closed) {
        newFilters.All = true;
      }
      
      setStatusFilters(newFilters);
    } else {
      // If a specific filter is checked, uncheck 'All'
      const newFilters = {
        ...statusFilters,
        [filter]: !statusFilters[filter],
        All: false
      };
      
      // If all specific filters are unchecked, check 'All'
      if (!newFilters.Active && !newFilters.Closed) {
        newFilters.All = true;
      }
      
      setStatusFilters(newFilters);
    }
    
    setTimeout(() => setIsFiltering(false), 300);
  };

  // Handle court filter changes
  const handleCourtFilterChange = (event) => {
    setIsFiltering(true);
    setCourtFilter(event.target.value);
    setTimeout(() => setIsFiltering(false), 300);
  };

  // Helper function to check if a court belongs to "Other" category
  const isOtherCourt = (courtName) => {
    const mainCourts = ["Supreme Court", "High Court", "District Court"];
    return !mainCourts.some(court => courtName.includes(court));
  };

  // Filter cases based on selected filters
  useEffect(() => {
    let filtered = [...sampleCases];
    
    // Apply status filters
    if (!statusFilters.All) {
      const activeStatusFilters = Object.entries(statusFilters)
        .filter(([key, value]) => value && key !== 'All')
        .map(([key]) => key);
      
      filtered = filtered.filter(caseItem => 
        activeStatusFilters.includes(caseItem.status)
      );
    }
    
    // Apply court filter
    if (courtFilter !== "All") {
      filtered = filtered.filter(caseItem => {
        if (courtFilter === "Other") {
          return isOtherCourt(caseItem.courtName);
        }
        return caseItem.courtName.includes(courtFilter);
      });
    }
    
    setFilteredCases(filtered);
  }, [statusFilters, courtFilter]);

  const toggleMobileFilters = () => {
    setShowMobileFilters(!showMobileFilters);
  };

  return (
    <div className="sm:flex justify-between gap-5 my-5">
      {/* Mobile filter toggle button */}
      <div className="sm:hidden mb-4 flex justify-end">
        <motion.button
          className="bg-black text-white py-2 px-4 rounded-lg flex items-center gap-2"
          whileTap={{ scale: 0.95 }}
          onClick={toggleMobileFilters}
        >
          <FaFilter />
          <span>Filters</span>
        </motion.button>
      </div>

      {/* Filters panel - responsive */}
      <AnimatePresence>
        {(showMobileFilters || isDesktop) && (
          <motion.div 
            className='sm:w-[300px] p-5 rounded-2xl bg-white h-fit mb-5 sm:mb-0'
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={filterContainerVariants}
          >
            <motion.p 
              className='text-lg font-medium pb-5'
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
                      className="data-[state=checked]:bg-black data-[state=checked]:border-black border-gray-300"
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
                      id="status-active" 
                      checked={statusFilters.Active}
                      onCheckedChange={() => handleStatusFilterChange('Active')}
                      className="data-[state=checked]:bg-black data-[state=checked]:border-black border-gray-300"
                    />
                    <label
                      htmlFor="status-active"
                      className="text-sm font-medium leading-none cursor-pointer"
                    >
                      Active
                    </label>
                  </motion.div>
                  
                  <motion.div className="flex items-center space-x-2" variants={filterItemVariants}>
                    <Checkbox 
                      id="status-closed" 
                      checked={statusFilters.Closed}
                      onCheckedChange={() => handleStatusFilterChange('Closed')}
                      className="data-[state=checked]:bg-black data-[state=checked]:border-black border-gray-300"
                    />
                    <label
                      htmlFor="status-closed"
                      className="text-sm font-medium leading-none cursor-pointer"
                    >
                      Closed
                    </label>
                  </motion.div>
                </div>
              
                <motion.div 
                  className="text-sm font-medium text-gray-500 pt-5 pb-3 border-t border-gray-200"
                  variants={filterItemVariants}
                >
                  Filter by Court:
                </motion.div>
                
                <div className="grid gap-4 ml-3">
                  <motion.div className="radio-wrapper-4" variants={filterItemVariants}>
                    <input 
                      value="All" 
                      id="court-all" 
                      type="radio" 
                      name="courtFilter"
                      checked={courtFilter === "All"}
                      onChange={handleCourtFilterChange}
                    />
                    <Label htmlFor="court-all" className="text-sm font-medium leading-none cursor-pointer">
                      All Courts
                    </Label>
                  </motion.div>
                  
                  <motion.div className="radio-wrapper-4" variants={filterItemVariants}>
                    <input 
                      value="Supreme Court" 
                      id="court-supreme" 
                      type="radio" 
                      name="courtFilter"
                      checked={courtFilter === "Supreme Court"}
                      onChange={handleCourtFilterChange}
                    />
                    <Label htmlFor="court-supreme" className="text-sm font-medium leading-none cursor-pointer">
                      Supreme Court
                    </Label>
                  </motion.div>
                  
                  <motion.div className="radio-wrapper-4" variants={filterItemVariants}>
                    <input 
                      value="High Court" 
                      id="court-high" 
                      type="radio" 
                      name="courtFilter"
                      checked={courtFilter === "High Court"}
                      onChange={handleCourtFilterChange}
                    />
                    <Label htmlFor="court-high" className="text-sm font-medium leading-none cursor-pointer">
                      High Court
                    </Label>
                  </motion.div>
                  
                  <motion.div className="radio-wrapper-4" variants={filterItemVariants}>
                    <input 
                      value="District Court" 
                      id="court-district" 
                      type="radio" 
                      name="courtFilter"
                      checked={courtFilter === "District Court"}
                      onChange={handleCourtFilterChange}
                    />
                    <Label htmlFor="court-district" className="text-sm font-medium leading-none cursor-pointer">
                      District Court
                    </Label>
                  </motion.div>
                  
                  <motion.div className="radio-wrapper-4" variants={filterItemVariants}>
                    <input 
                      value="Other" 
                      id="court-other" 
                      type="radio" 
                      name="courtFilter"
                      checked={courtFilter === "Other"}
                      onChange={handleCourtFilterChange}
                    />
                    <Label htmlFor="court-other" className="text-sm font-medium leading-none cursor-pointer">
                      Other Courts
                    </Label>
                  </motion.div>
                </div>
              </div>
            
            {/* Case Count with Animation */}
            <motion.div
              className="mt-4 flex items-center justify-between"
              variants={filterItemVariants}
            >
              <motion.p className="text-gray-600 text-sm font-medium flex items-center py-2">
                <FaGavel className='mr-2' />
                Showing 
              </motion.p>
              <AnimatePresence mode="wait">
                <motion.span
                  key={filteredCases.length}
                  className="bg-black text-white text-sm font-bold w-8 h-8 flex items-center justify-center rounded-full" 
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={countBadgeVariants}
                >
                  {filteredCases.length}
                </motion.span>
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Case list with loading state */}
      <motion.div 
        className='sm:w-[90%]'
        animate={{ opacity: isFiltering ? 0.7 : 1 }}
        transition={{ duration: 0.2 }}
      >
        <CaseList cases={filteredCases} />
      </motion.div>
    </div>
  );
}
