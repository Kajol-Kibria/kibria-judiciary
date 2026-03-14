import React from 'react';
import { Button } from '@/components/ui/button';

export default function FeeCard({ fee, onMarkPaid, onGenerateInvoice }) {
  return (
    <div className="shadow-sm bg-white rounded-lg p-4">
      <div className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg">
            {fee.client[0]}
          </div>
          <div>
            <div className="text-base">{fee.client}</div>
            <div className="text-xs text-gray-500">{fee.caseId} - {fee.caseName}</div>
          </div>
        </div>
        <span className={`text-xs px-3 py-1 rounded-full font-semibold ${fee.status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{fee.status}</span>
      </div>
      <div className="pb-2">
        <div className="flex justify-between items-center mb-1">
          <div>
            <div className="text-xs text-gray-500">Fee Amount</div>
            <div className="text-lg font-bold">₹{fee.amount.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Due Date</div>
            <div className="text-sm">{fee.dueDate}</div>
          </div>
        </div>
        <div className="text-sm text-gray-600 mt-2">{fee.description}</div>
      </div>
      <div className="flex gap-2 justify-end">
        {fee.status === 'Pending' ? (
          <Button size="sm" variant="outline" onClick={() => onMarkPaid(fee.id)}>Mark Paid</Button>
        ) : null}
        <Button size="sm" variant="secondary" onClick={() => onGenerateInvoice(fee.id)}>Generate Invoice</Button>
      </div>
    </div>
  );
} 