import React from 'react';
import { MdPayments } from "react-icons/md";
import { MdOutlineFileDownload } from "react-icons/md";
import { MdOutlineShare } from "react-icons/md";
export default function InvoiceCard({ invoice, onRecordPayment, onDownloadPDF, onShare }) {
  const statusColor = {
    Pending: 'bg-yellow-100 text-yellow-700',
    Overdue: 'bg-red-100 text-red-700',
  };
  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 mb-4">
      <div className="flex items-center justify-between mb-2">
        <div className="font-semibold text-base">{invoice.invoiceNo}</div>
        <span className={`text-xs px-3 py-1 rounded-full font-semibold ${statusColor[invoice.status]}`}>{invoice.status}</span>
      </div>
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg">
          {invoice.client[0]}
        </div>
        <div>
          <div className="font-medium text-gray-800">{invoice.client}</div>
          <div className="text-xs text-gray-500">Issued: {invoice.issuedDate}</div>
        </div>
      </div>
      <hr className="my-2" />
      <div className="flex justify-between items-center mb-2">
        <div>
          <div className="text-xs text-gray-500">Amount</div>
          <div className="text-lg font-bold">₹{invoice.amount.toLocaleString()}</div>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-500">Due Date</div>
          <div className={`text-sm font-semibold ${invoice.status === 'Overdue' ? 'text-red-500' : ''}`}>{invoice.dueDate}</div>
        </div>
      </div>
      <div className="flex justify-end gap-2 mt-2">
        <button className="bg-[#171717] text-white px-3 py-1 rounded text-xs font-medium flex items-center gap-1" onClick={() => onRecordPayment(invoice.id)}>
          <MdPayments size={14} className='mr-1' /> Record Payment
        </button>
        <button className="bg-gray-100 text-[#3b5bfd] px-3 py-1 rounded text-xs font-medium flex items-center gap-1" onClick={() => onDownloadPDF(invoice.id)}>
          <MdOutlineFileDownload size={14} className='mr-1' /> Download PDF
        </button>
        <button className="bg-gray-100 text-[#3b5bfd] px-3 py-1 rounded text-xs font-medium flex items-center gap-1" onClick={() => onShare(invoice.id)}>
          <MdOutlineShare size={14} className='mr-1' /> Share
        </button>
      </div>
    </div>
  );
} 