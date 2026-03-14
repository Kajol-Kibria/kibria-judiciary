import React from 'react';
import ExpenseCard from './ExpenseCard';

export default function ExpenseList({ expenses, onEdit, onAddReceipt }) {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-4'>
      {expenses.map(exp => (
        <ExpenseCard key={exp.id} expense={exp} onEdit={onEdit} onAddReceipt={onAddReceipt} />
      ))}
    </div>
  );
} 