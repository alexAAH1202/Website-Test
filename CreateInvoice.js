import React, { useState, useEffect } from 'react';
import { createInvoice, getAppointmentTypes, getPatientDetails, getPractitionerDetails } from '../services/api';
import '../styles/CreateInvoice.css';

function CreateInvoice() {
  const [invoice, setInvoice] = useState({
    patientId: '',
    patientName: '',
    patientAddress: '',
    issueDate: new Date().toISOString().split('T')[0],
    taxInvoiceNumber: '',
    appointmentDate: '',
    practitionerId: '',
    practitionerName: '',
    practitionerProviderNumber: '',
    items: [{
      appointmentType: '',
      itemCode: '',
      itemType: 'Service',
      unitPrice: 0,
      quantity: 1,
      tax: 0,
      totalPrice: 0
    }],
    totalAmount: 0,
    dueDate: ''
  });
  const [appointmentTypes, setAppointmentTypes] = useState([]);

  useEffect(() => {
    fetchAppointmentTypes();
  }, []);

  const fetchAppointmentTypes = async () => {
    try {
      const types = await getAppointmentTypes();
      setAppointmentTypes(types);
    } catch (error) {
      console.error('Error fetching appointment types:', error);
    }
  };

  const handlePatientIdChange = async (e) => {
    const patientId = e.target.value;
    setInvoice(prev => ({ ...prev, patientId }));
    if (patientId) {
      try {
        const patientDetails = await getPatientDetails(patientId);
        setInvoice(prev => ({
          ...prev,
          patientName: `${patientDetails.firstName} ${patientDetails.lastName}`,
          patientAddress: patientDetails.address
        }));
      } catch (error) {
        console.error('Error fetching patient details:', error);
      }
    }
  };

  const handlePractitionerIdChange = async (e) => {
    const practitionerId = e.target.value;
    setInvoice(prev => ({ ...prev, practitionerId }));
    if (practitionerId) {
      try {
        const practitionerDetails = await getPractitionerDetails(practitionerId);
        setInvoice(prev => ({
          ...prev,
          practitionerName: practitionerDetails.name,
          practitionerProviderNumber: practitionerDetails.providerNumber
        }));
      } catch (error) {
        console.error('Error fetching practitioner details:', error);
      }
    }
  };

  const handleChange = (e) => {
    setInvoice({ ...invoice, [e.target.name]: e.target.value });
  };

  const handleItemChange = (index, e) => {
    const newItems = [...invoice.items];
    const { name, value } = e.target;
    newItems[index] = { ...newItems[index], [name]: value };

    if (name === 'appointmentType') {
      const selectedType = appointmentTypes.find(type => type.id === value);
      newItems[index].unitPrice = selectedType ? selectedType.cost : 0;
      newItems[index].itemCode = selectedType ? selectedType.code : '';
    }

    newItems[index].totalPrice = (newItems[index].unitPrice * newItems[index].quantity) + newItems[index].tax;

    setInvoice(prevInvoice => ({
      ...prevInvoice,
      items: newItems,
      totalAmount: newItems.reduce((sum, item) => sum + item.totalPrice, 0)
    }));
  };

  const addItem = () => {
    setInvoice(prevInvoice => ({
      ...prevInvoice,
      items: [...prevInvoice.items, {
        appointmentType: '',
        itemCode: '',
        itemType: 'Service',
        unitPrice: 0,
        quantity: 1,
        tax: 0,
        totalPrice: 0
      }]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createInvoice(invoice);
      alert('Invoice created successfully');
      // Reset form or redirect
    } catch (error) {
      console.error('Error creating invoice:', error);
      alert('Failed to create invoice');
    }
  };

  return (
    <div className="create-invoice">
      <h2>Create Invoice</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="patientId">Patient ID:</label>
          <input
            type="text"
            id="patientId"
            name="patientId"
            value={invoice.patientId}
            onChange={handlePatientIdChange}
            required
          />
        </div>
        <div>
          <label htmlFor="patientName">Patient Name:</label>
          <input
            type="text"
            id="patientName"
            name="patientName"
            value={invoice.patientName}
            onChange={handleChange}
            readOnly
          />
        </div>
        <div>
          <label htmlFor="patientAddress">Patient Address:</label>
          <input
            type="text"
            id="patientAddress"
            name="patientAddress"
            value={invoice.patientAddress}
            onChange={handleChange}
            readOnly
          />
        </div>
        <div>
          <label htmlFor="issueDate">Issue Date:</label>
          <input
            type="date"
            id="issueDate"
            name="issueDate"
            value={invoice.issueDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="taxInvoiceNumber">Tax Invoice Number:</label>
          <input
            type="text"
            id="taxInvoiceNumber"
            name="taxInvoiceNumber"
            value={invoice.taxInvoiceNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="appointmentDate">Appointment Date:</label>
          <input
            type="date"
            id="appointmentDate"
            name="appointmentDate"
            value={invoice.appointmentDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="practitionerId">Practitioner ID:</label>
          <input
            type="text"
            id="practitionerId"
            name="practitionerId"
            value={invoice.practitionerId}
            onChange={handlePractitionerIdChange}
            required
          />
        </div>
        <div>
          <label htmlFor="practitionerName">Practitioner Name:</label>
          <input
            type="text"
            id="practitionerName"
            name="practitionerName"
            value={invoice.practitionerName}
            onChange={handleChange}
            readOnly
          />
        </div>
        <div>
          <label htmlFor="practitionerProviderNumber">Practitioner Provider Number:</label>
          <input
            type="text"
            id="practitionerProviderNumber"
            name="practitionerProviderNumber"
            value={invoice.practitionerProviderNumber}
            onChange={handleChange}
            readOnly
          />
        </div>
        {invoice.items.map((item, index) => (
          <div key={index} className="invoice-item">
            <select
              name="appointmentType"
              value={item.appointmentType}
              onChange={(e) => handleItemChange(index, e)}
              required
            >
              <option value="">Select Appointment Type</option>
              {appointmentTypes.map(type => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}
            </select>
            <input
              type="text"
              name="itemCode"
              value={item.itemCode}
              onChange={(e) => handleItemChange(index, e)}
              placeholder="Item Code"
              readOnly
            />
            <select
              name="itemType"
              value={item.itemType}
              onChange={(e) => handleItemChange(index, e)}
              required
            >
              <option value="Service">Service</option>
              <option value="Product">Product</option>
              <option value="Report">Report</option>
            </select>
            <input
              type="number"
              name="unitPrice"
              value={item.unitPrice}
              onChange={(e) => handleItemChange(index, e)}
              placeholder="Unit Price"
              readOnly
            />
            <input
              type="number"
              name="quantity"
              value={item.quantity}
              onChange={(e) => handleItemChange(index, e)}
              placeholder="Quantity"
              min="1"
              required
            />
            <input
              type="number"
              name="tax"
              value={item.tax}
              onChange={(e) => handleItemChange(index, e)}
              placeholder="Tax"
              min="0"
            />
            <input
              type="number"
              name="totalPrice"
              value={item.totalPrice}
              readOnly
              placeholder="Total Price"
            />
          </div>
        ))}
        <button type="button" onClick={addItem}>Add Item</button>
        <div>
          <label htmlFor="totalAmount">Total Amount:</label>
          <input
            type="number"
            id="totalAmount"
            name="totalAmount"
            value={invoice.totalAmount}
            readOnly
          />
        </div>
        <div>
          <label htmlFor="dueDate">Due Date:</label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={invoice.dueDate}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Create Invoice</button>
      </form>
    </div>
  );
}

export default CreateInvoice;


