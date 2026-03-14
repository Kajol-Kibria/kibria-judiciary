import React from 'react';
import InvoiceCard from './InvoiceCard';

export default function InvoiceList({ invoices, onRecordPayment, onDownloadPDF, onShare }) {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-4'>
      {invoices.map(inv => (
        <InvoiceCard
          key={inv.id}
          invoice={inv}
          onRecordPayment={onRecordPayment}
          onDownloadPDF={onDownloadPDF}
          onShare={onShare}
        />
      ))}
    </div>
  );
} 