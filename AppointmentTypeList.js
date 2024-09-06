import React, { useState, useEffect } from 'react';
import { getAppointmentTypes, updateAppointmentType, getPractitioners, getTreatmentTemplates, getEmailTemplates, getSmsTemplates, getBillableItems } from '../services/api';
import '../styles/AppointmentTypeList.css';

function AppointmentTypeList() {
  const [appointmentTypes, setAppointmentTypes] = useState([]);
  const [practitioners, setPractitioners] = useState([]);
  const [treatmentTemplates, setTreatmentTemplates] = useState([]);
  const [emailTemplates, setEmailTemplates] = useState([]);
  const [smsTemplates, setSmsTemplates] = useState([]);
  const [billableItems, setBillableItems] = useState([]);
  const [editingType, setEditingType] = useState(null);

  useEffect(() => {
    fetchAppointmentTypes();
    fetchPractitioners();
    fetchTreatmentTemplates();
    fetchEmailTemplates();
    fetchSmsTemplates();
    fetchBillableItems();
  }, []);

  const fetchAppointmentTypes = async () => {
    const types = await getAppointmentTypes();
    setAppointmentTypes(types);
  };

  const fetchPractitioners = async () => {
    const pracs = await getPractitioners();
    setPractitioners(pracs);
  };

  const fetchTreatmentTemplates = async () => {
    const templates = await getTreatmentTemplates();
    setTreatmentTemplates(templates);
  };

  const fetchEmailTemplates = async () => {
    const templates = await getEmailTemplates();
    setEmailTemplates(templates);
  };

  const fetchSmsTemplates = async () => {
    const templates = await getSmsTemplates();
    setSmsTemplates(templates);
  };

  const fetchBillableItems = async () => {
    const items = await getBillableItems();
    setBillableItems(items);
  };

  const handleEdit = (type) => {
    setEditingType({ ...type });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditingType(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePractitionerChange = (practitionerId) => {
    setEditingType(prev => ({
      ...prev,
      practitioners: prev.practitioners.includes(practitionerId)
        ? prev.practitioners.filter(id => id !== practitionerId)
        : [...prev.practitioners, practitionerId]
    }));
  };

  const handleBillableItemChange = (e, index) => {
    const { name, value } = e.target;
    setEditingType(prev => {
      const newBillableItems = [...prev.billableItems];
      newBillableItems[index] = { ...newBillableItems[index], [name]: value };
      return { ...prev, billableItems: newBillableItems };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateAppointmentType(editingType.id, editingType);
    fetchAppointmentTypes();
    setEditingType(null);
  };

  return (
    <div className="appointment-type-list">
      <h2>Appointment Types</h2>
      {appointmentTypes.map(type => (
        <div key={type.id} className="appointment-type">
          <h3>{type.name}</h3>
          <button onClick={() => handleEdit(type)}>Edit</button>
        </div>
      ))}

      {editingType && (
        <form onSubmit={handleSubmit} className="appointment-type-form">
          <h3>Edit Appointment Type</h3>
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={editingType.name} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea id="description" name="description" value={editingType.description} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="category">Category:</label>
            <input type="text" id="category" name="category" value={editingType.category} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="duration">Duration (minutes):</label>
            <input type="number" id="duration" name="duration" value={editingType.duration} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="maxClients">Maximum number of clients:</label>
            <input type="number" id="maxClients" name="maxClients" value={editingType.maxClients} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="treatmentTemplate">Default Treatment Note Template:</label>
            <select id="treatmentTemplate" name="treatmentTemplate" value={editingType.treatmentTemplate} onChange={handleChange}>
              {treatmentTemplates.map(template => (
                <option key={template.id} value={template.id}>{template.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="reminderEmail">Appointment Reminder Email:</label>
            <select id="reminderEmail" name="reminderEmail" value={editingType.reminderEmail} onChange={handleChange}>
              {emailTemplates.map(template => (
                <option key={template.id} value={template.id}>{template.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="reminderSms">Appointment Reminder SMS:</label>
            <select id="reminderSms" name="reminderSms" value={editingType.reminderSms} onChange={handleChange}>
              {smsTemplates.map(template => (
                <option key={template.id} value={template.id}>{template.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="confirmationEmail">Booking Confirmation Email:</label>
            <select id="confirmationEmail" name="confirmationEmail" value={editingType.confirmationEmail} onChange={handleChange}>
              {emailTemplates.map(template => (
                <option key={template.id} value={template.id}>{template.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="cancellationEmail">Booking Cancellation Email:</label>
            <select id="cancellationEmail" name="cancellationEmail" value={editingType.cancellationEmail} onChange={handleChange}>
              {emailTemplates.map(template => (
                <option key={template.id} value={template.id}>{template.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="nonAttendanceEmail">Booking Non-Attendance Email:</label>
            <select id="nonAttendanceEmail" name="nonAttendanceEmail" value={editingType.nonAttendanceEmail} onChange={handleChange}>
              {emailTemplates.map(template => (
                <option key={template.id} value={template.id}>{template.name}</option>
              ))}
            </select>
          </div>
          <div>
            <h4>Related Billable Items:</h4>
            {editingType.billableItems.map((item, index) => (
              <div key={index} className="billable-item">
                <select name="itemId" value={item.itemId} onChange={(e) => handleBillableItemChange(e, index)}>
                  {billableItems.map(bi => (
                    <option key={bi.id} value={bi.id}>{bi.name}</option>
                  ))}
                </select>
                <input type="number" name="quantity" value={item.quantity} onChange={(e) => handleBillableItemChange(e, index)} placeholder="Quantity" />
                <input type="number" name="discount" value={item.discount} onChange={(e) => handleBillableItemChange(e, index)} placeholder="Discount" />
              </div>
            ))}
            <button type="button" onClick={() => setEditingType(prev => ({ ...prev, billableItems: [...prev.billableItems, { itemId: '', quantity: 1, discount: 0 }] }))}>Add Billable Item</button>
          </div>
          <div>
            <h4>Practitioners that Provide this Service:</h4>
            {practitioners.map(practitioner => (
              <div key={practitioner.id}>
                <input
                  type="checkbox"
                  id={`practitioner-${practitioner.id}`}
                  checked={editingType.practitioners.includes(practitioner.id)}
                  onChange={() => handlePractitionerChange(practitioner.id)}
                />
                <label htmlFor={`practitioner-${practitioner.id}`}>{practitioner.name}</label>
              </div>
            ))}
          </div>
          <div>
            <label htmlFor="leadTime">Lead time for online bookings (hours):</label>
            <input type="number" id="leadTime" name="leadTime" value={editingType.leadTime} onChange={handleChange} />
          </div>
          <div>
            <input type="checkbox" id="showOnline" name="showOnline" checked={editingType.showOnline} onChange={handleChange} />
            <label htmlFor="showOnline">Show on online bookings</label>
          </div>
          <button type="submit">Update Appointment Type</button>
        </form>
      )}
    </div>
  );
}

export default AppointmentTypeList;