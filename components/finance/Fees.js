import React, { useState, useEffect, useMemo } from 'react';
import FeeList from './FeeList';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { FaSearch, FaFilter, FaGavel } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { sampleFees } from '../../alldatafiles/feesdata';


const getUnique = (arr, key) => [...new Set(arr.map(item => item[key]))];

export default function Fees() {
  const [search, setSearch] = useState('');
  const [statusFilters, setStatusFilters] = useState({ All: true, Paid: false, Pending: false });
  const [clientFilters, setClientFilters] = useState([]); // multi-select
  const [caseFilters, setCaseFilters] = useState([]); // multi-select
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 640);
    const handleResize = () => setIsDesktop(window.innerWidth >= 640);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Animation variants (copied from CasesCantainer)
  const filterContainerVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        staggerChildren: 0.07,
      },
    },
  };
  const filterItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };
  const countBadgeVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 15,
      },
    },
    exit: { scale: 0.8, opacity: 0 },
  };

  // Filter logic
  const filteredFees = useMemo(() => {
    let fees = [...sampleFees];
    if (!statusFilters.All) {
      const active = Object.entries(statusFilters).filter(([k, v]) => v && k !== 'All').map(([k]) => k);
      fees = fees.filter(fee => active.includes(fee.status));
    }
    if (clientFilters.length > 0) {
      fees = fees.filter(fee => clientFilters.includes(fee.client));
    }
    if (caseFilters.length > 0) {
      fees = fees.filter(fee => caseFilters.includes(fee.caseId));
    }
    if (search.trim()) {
      const s = search.trim().toLowerCase();
      fees = fees.filter(fee =>
        fee.client.toLowerCase().includes(s) ||
        fee.caseName.toLowerCase().includes(s) ||
        fee.caseId.toLowerCase().includes(s) ||
        fee.description.toLowerCase().includes(s)
      );
    }
    return fees;
  }, [search, statusFilters, clientFilters, caseFilters]);

  // Handlers
  const handleStatusChange = (filter) => {
    setIsFiltering(true);
    if (filter === 'All') {
      setStatusFilters({ All: !statusFilters.All, Paid: false, Pending: false });
    } else {
      const newFilters = { ...statusFilters, [filter]: !statusFilters[filter], All: false };
      if (!newFilters.Paid && !newFilters.Pending) newFilters.All = true;
      setStatusFilters(newFilters);
    }
    setTimeout(() => setIsFiltering(false), 300);
  };
  const handleClientChange = (client) => {
    setClientFilters(prev => prev.includes(client) ? prev.filter(c => c !== client) : [...prev, client]);
  };
  const handleCaseChange = (caseId) => {
    setCaseFilters(prev => prev.includes(caseId) ? prev.filter(c => c !== caseId) : [...prev, caseId]);
  };
  const handleMarkPaid = (id) => { alert('Marked as paid: ' + id); };
  const handleGenerateInvoice = (id) => { alert('Invoice generated for: ' + id); };
  const clients = getUnique(sampleFees, 'client');
  const cases = getUnique(sampleFees, 'caseId');

  return (
    <div className="sm:flex justify-between gap-5 my-5">
      {/* Mobile filter toggle button */}
      <div className="sm:hidden mb-4 flex justify-end">
        <motion.button
          className="bg-black text-white py-2 px-4 rounded-lg flex items-center gap-2"
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowMobileFilters(!showMobileFilters)}
        >
          <FaFilter />
          <span>Filters</span>
        </motion.button>
      </div>
      {/* Filters panel - responsive */}
      <AnimatePresence>
        {(showMobileFilters || isDesktop) && (
          <motion.div
            className="sm:w-[300px] p-5 rounded-2xl bg-white h-fit mb-5 sm:mb-0"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={filterContainerVariants}
          >
            <motion.p className="text-lg font-medium pb-5" variants={filterItemVariants}>
              Filters
            </motion.p>
            <motion.div className="text-sm font-medium text-gray-500 pb-3" variants={filterItemVariants}>
              Search:
            </motion.div>
            <motion.div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 mb-4" variants={filterItemVariants}>
              <FaSearch className="text-gray-400" />
              <input
                type="text"
                placeholder="Search fees..."
                className="bg-transparent outline-none w-full text-sm"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </motion.div>
            <motion.div className="text-sm font-medium text-gray-500 pb-3" variants={filterItemVariants}>
              Filter by Status:
            </motion.div>
            <div className="grid gap-4 ml-3 pb-5">
              <motion.div className="flex items-center space-x-2" variants={filterItemVariants}>
                <Checkbox id="status-all" checked={statusFilters.All} onCheckedChange={() => handleStatusChange('All')} className="data-[state=checked]:bg-black data-[state=checked]:border-black border-gray-300" />
                <Label htmlFor="status-all" className="text-sm font-medium leading-none cursor-pointer">All</Label>
              </motion.div>
              <motion.div className="flex items-center space-x-2" variants={filterItemVariants}>
                <Checkbox id="status-paid" checked={statusFilters.Paid} onCheckedChange={() => handleStatusChange('Paid')} className="data-[state=checked]:bg-black data-[state=checked]:border-black border-gray-300" />
                <Label htmlFor="status-paid" className="text-sm font-medium leading-none cursor-pointer">Paid</Label>
              </motion.div>
              <motion.div className="flex items-center space-x-2" variants={filterItemVariants}>
                <Checkbox id="status-pending" checked={statusFilters.Pending} onCheckedChange={() => handleStatusChange('Pending')} className="data-[state=checked]:bg-black data-[state=checked]:border-black border-gray-300" />
                <Label htmlFor="status-pending" className="text-sm font-medium leading-none cursor-pointer">Pending</Label>
              </motion.div>
            </div>
            <motion.div className="text-sm font-medium text-gray-500 pt-5 pb-3 border-t border-gray-200" variants={filterItemVariants}>
              Filter by Client:
            </motion.div>
            <div className="grid gap-4 ml-3 pb-5">
              {clients.map(client => (
                <motion.div key={client} className="flex items-center space-x-2" variants={filterItemVariants}>
                  <Checkbox id={`client-${client}`} checked={clientFilters.includes(client)} onCheckedChange={() => handleClientChange(client)} className="data-[state=checked]:bg-black data-[state=checked]:border-black border-gray-300" />
                  <Label htmlFor={`client-${client}`} className="text-sm font-medium leading-none cursor-pointer">{client}</Label>
                </motion.div>
              ))}
            </div>
            <motion.div className="text-sm font-medium text-gray-500 pt-5 pb-3 border-t border-gray-200" variants={filterItemVariants}>
              Filter by Case:
            </motion.div>
            <div className="grid gap-4 ml-3">
              {cases.map((caseId, index) => (
                <motion.div key={index} className="flex items-center space-x-2" variants={filterItemVariants}>
                  <Checkbox id={`case-${caseId}`} checked={caseFilters.includes(caseId)} onCheckedChange={() => handleCaseChange(caseId)} className="data-[state=checked]:bg-black data-[state=checked]:border-black border-gray-300" />
                  <Label htmlFor={`case-${caseId}`} className="text-sm font-medium leading-none cursor-pointer">{caseId}</Label>
                </motion.div>
              ))}
            </div>
            {/* Result count badge with animation */}
            <motion.div className="mt-4 flex items-center justify-between" variants={filterItemVariants}>
              <motion.p className="text-gray-600 text-sm font-medium flex items-center py-2">
                <FaGavel className='mr-2' />
                Showing
              </motion.p>
              <AnimatePresence mode="wait">
                <motion.span
                  key={filteredFees.length}
                  className="bg-black text-white text-sm font-bold w-8 h-8 flex items-center justify-center rounded-full"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={countBadgeVariants}
                >
                  {filteredFees.length}
                </motion.span>
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Fee list with loading state */}
      <motion.div
        className='sm:w-[90%]'
        animate={{ opacity: isFiltering ? 0.7 : 1 }}
        transition={{ duration: 0.2 }}
      >
        <FeeList fees={filteredFees} onMarkPaid={handleMarkPaid} onGenerateInvoice={handleGenerateInvoice} />
      </motion.div>
    </div>
  );
}
