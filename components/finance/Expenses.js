import React, { useState, useEffect, useMemo } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { FaSearch, FaFilter, FaGavel } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import ExpenseList from './ExpenseList';
import { sampleExpenses } from '../../alldatafiles/expensesdata';

const getUnique = (arr, key) => [...new Set(arr.map(item => item[key] || ''))].filter(Boolean);

export default function Expenses() {
  // Filters
  const [search, setSearch] = useState('');
  const [categoryFilters, setCategoryFilters] = useState([]);
  const [caseFilters, setCaseFilters] = useState([]);
  const [paymentFilters, setPaymentFilters] = useState([]);
  const [receiptFilter, setReceiptFilter] = useState('All');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 640);
    const handleResize = () => setIsDesktop(window.innerWidth >= 640);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Animation variants (like Fees/CasesCantainer)
  const filterContainerVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 100, damping: 15, staggerChildren: 0.07 } },
  };
  const filterItemVariants = { hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } };
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

  // Filtering logic
  const filteredExpenses = useMemo(() => {
    let exps = [...sampleExpenses];
    if (categoryFilters.length > 0) exps = exps.filter(e => categoryFilters.includes(e.category));
    if (caseFilters.length > 0) exps = exps.filter(e => caseFilters.includes(e.caseId));
    if (paymentFilters.length > 0) exps = exps.filter(e => paymentFilters.includes(e.paymentMethod));
    if (receiptFilter !== 'All') exps = exps.filter(e => (receiptFilter === 'With' ? e.hasReceipt : !e.hasReceipt));
    if (search.trim()) {
      const s = search.trim().toLowerCase();
      exps = exps.filter(e =>
        e.title.toLowerCase().includes(s) ||
        e.category.toLowerCase().includes(s) ||
        e.caseId.toLowerCase().includes(s) ||
        e.caseName.toLowerCase().includes(s) ||
        e.paymentMethod.toLowerCase().includes(s)
      );
    }
    return exps;
  }, [search, categoryFilters, caseFilters, paymentFilters, receiptFilter]);

  // Handlers
  const handleCategoryChange = (cat) => setCategoryFilters(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]);
  const handleCaseChange = (caseId) => setCaseFilters(prev => prev.includes(caseId) ? prev.filter(c => c !== caseId) : [...prev, caseId]);
  const handlePaymentChange = (pay) => setPaymentFilters(prev => prev.includes(pay) ? prev.filter(c => c !== pay) : [...prev, pay]);
  const handleReceiptChange = (val) => setReceiptFilter(val);
  const handleEdit = (id) => alert('Edit expense: ' + id);
  const handleAddReceipt = (id) => alert('Add receipt for: ' + id);

  // Filter options
  const categories = getUnique(sampleExpenses, 'category');
  const cases = getUnique(sampleExpenses, 'caseId');
  const payments = getUnique(sampleExpenses, 'paymentMethod');

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
                placeholder="Search expenses..."
                className="bg-transparent outline-none w-full text-sm"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </motion.div>
            <motion.div className="text-sm font-medium text-gray-500 pb-3" variants={filterItemVariants}>
              Filter by Category:
            </motion.div>
            <div className="grid gap-4 ml-3 pb-5">
              {categories.map(cat => (
                <motion.div key={cat} className="flex items-center space-x-2" variants={filterItemVariants}>
                  <Checkbox id={`cat-${cat}`} checked={categoryFilters.includes(cat)} onCheckedChange={() => handleCategoryChange(cat)} className="data-[state=checked]:bg-black data-[state=checked]:border-black border-gray-300" />
                  <Label htmlFor={`cat-${cat}`} className="text-sm font-medium leading-none cursor-pointer">{cat}</Label>
                </motion.div>
              ))}
            </div>
            <motion.div className="text-sm font-medium text-gray-500 pt-5 pb-3 border-t border-gray-200" variants={filterItemVariants}>
              Filter by Case:
            </motion.div>
            <div className="grid gap-4 ml-3 pb-5">
              {cases.map((caseId, idx) => (
                <motion.div key={caseId} className="flex items-center space-x-2" variants={filterItemVariants}>
                  <Checkbox id={`case-${caseId}`} checked={caseFilters.includes(caseId)} onCheckedChange={() => handleCaseChange(caseId)} className="data-[state=checked]:bg-black data-[state=checked]:border-black border-gray-300" />
                  <Label htmlFor={`case-${caseId}`} className="text-sm font-medium leading-none cursor-pointer">{caseId}</Label>
                </motion.div>
              ))}
            </div>
            <motion.div className="text-sm font-medium text-gray-500 pt-5 pb-3 border-t border-gray-200" variants={filterItemVariants}>
              Filter by Payment Method:
            </motion.div>
            <div className="grid gap-4 ml-3 pb-5">
              {payments.map(pay => (
                <motion.div key={pay} className="flex items-center space-x-2" variants={filterItemVariants}>
                  <Checkbox id={`pay-${pay}`} checked={paymentFilters.includes(pay)} onCheckedChange={() => handlePaymentChange(pay)} className="data-[state=checked]:bg-black data-[state=checked]:border-black border-gray-300" />
                  <Label htmlFor={`pay-${pay}`} className="text-sm font-medium leading-none cursor-pointer">{pay}</Label>
                </motion.div>
              ))}
            </div>
            <motion.div className="text-sm font-medium text-gray-500 pt-5 pb-3 border-t border-gray-200" variants={filterItemVariants}>
              Filter by Receipt:
            </motion.div>
            <div className="grid gap-4 ml-3 pb-5">
              <motion.div className="flex items-center space-x-2" variants={filterItemVariants}>
                <Checkbox id="receipt-all" checked={receiptFilter === 'All'} onCheckedChange={() => handleReceiptChange('All')} className="data-[state=checked]:bg-black data-[state=checked]:border-black border-gray-300" />
                <Label htmlFor="receipt-all" className="text-sm font-medium leading-none cursor-pointer">All</Label>
              </motion.div>
              <motion.div className="flex items-center space-x-2" variants={filterItemVariants}>
                <Checkbox id="receipt-with" checked={receiptFilter === 'With'} onCheckedChange={() => handleReceiptChange('With')} className="data-[state=checked]:bg-black data-[state=checked]:border-black border-gray-300" />
                <Label htmlFor="receipt-with" className="text-sm font-medium leading-none cursor-pointer">With Receipt</Label>
              </motion.div>
              <motion.div className="flex items-center space-x-2" variants={filterItemVariants}>
                <Checkbox id="receipt-without" checked={receiptFilter === 'Without'} onCheckedChange={() => handleReceiptChange('Without')} className="data-[state=checked]:bg-black data-[state=checked]:border-black border-gray-300" />
                <Label htmlFor="receipt-without" className="text-sm font-medium leading-none cursor-pointer">Without Receipt</Label>
              </motion.div>
            </div>
            {/* Result count badge with animation */}
            <motion.div className="mt-4 flex items-center justify-between" variants={filterItemVariants}>
              <motion.p className="text-gray-600 text-sm font-medium flex items-center py-2">
                <FaGavel className='mr-2' />
                Showing
              </motion.p>
              <AnimatePresence mode="wait">
                <motion.span
                  key={filteredExpenses.length}
                  className="bg-black text-white text-sm font-bold w-8 h-8 flex items-center justify-center rounded-full"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={countBadgeVariants}
                >
                  {filteredExpenses.length}
                </motion.span>
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Expense list */}
      <motion.div
        className='sm:w-[90%]'
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <ExpenseList expenses={filteredExpenses} onEdit={handleEdit} onAddReceipt={handleAddReceipt} />
      </motion.div>
    </div>
  );
}
