
export default Invoices;
import React, { useState, useEffect } from 'react';
import { getDocuments, uploadDocument } from '../services/api';

function Invoices({ patientId }) {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    fetchInvoices();
  }, [patientId]);

  const fetchInvoices = async () => {
    try {
      const data = await getDocuments(patientId);
      setInvoices(data);
    } catch (error) {
      console.error('Error fetching invoices:', error);
    }
  };

  return (
    <div className="invoices">
      <h3>Invoices</h3>
      {invoices.map(invoice => (
        <div key={invoice.id} className="invoice">
          <p><strong>Date:</strong> {invoice.date}</p>
          <p><strong>Amount:</strong> {invoice.amount}</p>
          <p><strong>Status:</strong> {invoice.status}</p>
        </div>
      ))}
    </div>
  );
}
