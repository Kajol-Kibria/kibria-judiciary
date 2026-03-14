import React from 'react';
import FeeCard from './FeeCard';
import { motion, AnimatePresence } from 'framer-motion';

export default function FeeList({ fees, onMarkPaid, onGenerateInvoice }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };
  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 80, damping: 12 } },
    exit: { opacity: 0, scale: 0.9, y: 20, transition: { duration: 0.2 } },
  };
  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        key="fee-container"
      >
        {fees.map((fee, idx) => (
          <motion.div
            key={fee.id}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            layoutId={`fee-card-${fee.id}`}
          >
            <FeeCard fee={fee} onMarkPaid={onMarkPaid} onGenerateInvoice={onGenerateInvoice} />
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
} 