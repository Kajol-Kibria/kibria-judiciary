import { Pencil } from 'lucide-react';
import React from 'react';
import { FaGavel, FaBox, FaCar, FaFolder, FaCreditCard } from 'react-icons/fa';

export default function ExpenseCard({ expense, onEdit, onAddReceipt }) {
  const iconMap = {
    gavel: <span className="bg-purple-100 text-purple-600 p-2 rounded-full"><FaGavel size={20} /></span>,
    box: <span className="bg-blue-100 text-blue-600 p-2 rounded-full"><FaBox size={20} /></span>,
    car: <span className="bg-orange-100 text-orange-600 p-2 rounded-full"><FaCar size={20} /></span>,
  };
  const categoryColor = {
    'Court Fees': 'bg-purple-100 text-purple-600',
    'Office Supplies': 'bg-blue-100 text-blue-600',
    'Travel': 'bg-orange-100 text-orange-600',
  };
  return (
    <div className="bg-white rounded-2xl shadow-sm p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {iconMap[expense.icon]}
          <div>
            <div className="font-semibold text-base">{expense.title}</div>
            <div className={`inline-block text-xs font-medium px-2 py-0.5 rounded ${categoryColor[expense.category] || 'bg-gray-100 text-gray-600'}`}>{expense.category}</div>
            {expense.hasReceipt && <span className="ml-2 inline-block text-xs font-medium px-2 py-0.5 rounded bg-green-100 text-green-700">Receipt</span>}
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold">₹{expense.amount.toLocaleString()}</div>
          <div className="text-xs text-gray-500">{expense.date}</div>
        </div>
      </div>
      <hr className='my-4' />
      <div className="flex items-center text-xs text-gray-600 gap-2">
        {expense.caseId && <><span className="inline-block"><FaFolder size={14} className="inline mr-1" /></span>Case: {expense.caseId} - {expense.caseName}</>}
      </div>
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span className="inline-block"><FaCreditCard size={14} className="inline mr-1" /></span>{expense.paymentMethod}
        </div>
        <div className="flex gap-2">
          {!expense.hasReceipt && <button className="bg-[#171717] text-white px-2 py-1 rounded text-xs font-medium" onClick={() => onAddReceipt(expense.id)}>Add Receipt</button>}
          <button className="bg-gray-100 px-2 py-1 rounded text-xs font-medium flex items-center" onClick={() => onEdit(expense.id)}><Pencil size={14} className='mr-1' /> Edit</button>
        </div>
      </div>
    </div>
  );
}