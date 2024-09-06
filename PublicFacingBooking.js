import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getBusinessDetails, getAvailableAppointments, bookAppointment } from '../services/api';
import '../styles/PublicBooking.css';

function PublicBooking() {
  const { businessName } = useParams();
  const [business, setBusiness] = useState(null);
  const [appointmentTypes, setAppointmentTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [patientDetails, setPatientDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    fetchBusinessDetails();
  }, [businessName]);

  useEffect(() => {
    if (selectedType && selectedDate) {
      fetchAvailableSlots();
    }
  }, [selectedType, selectedDate]);

  const fetchBusinessDetails = async () => {
    try {
      const data = await getBusinessDetails(businessName);
      setBusiness(data);
      setAppointmentTypes(data.appointmentTypes);
    } catch (error) {
      console.error('Error fetching business details:', error);
    }
  };

  const fetchAvailableSlots = async () => {
    try {
      const slots = await getAvailableAppointments(businessName, selectedType, selectedDate);
      setAvailableSlots(slots);
    } catch (error) {
      console.error('Error fetching available slots:', error);
    }
  };

  const handlePatientDetailsChange = (e) => {
    setPatientDetails({ ...patientDetails, [e.target.name]: e.target.value });
  };

  const handleBookAppointment = async (e) => {
    e.preventDefault();
    try {
      await bookAppointment(businessName, {
        appointmentTypeId: selectedType,
        date: selectedDate,
        time: selectedSlot,
        patientDetails
      });
      alert('Appointment booked successfully!');
      // Reset form or redirect to confirmation page
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('Failed to book appointment. Please try again.');
    }
  };

  if (!business) return <div>Loading...</div>;

  return (
    <div className="public-booking">
      <h1>{business.name} Online Booking</h1>
      <form onSubmit={handleBookAppointment}>
        <div>
          <label htmlFor="appointmentType">Appointment Type:</label>
          <select
            id="appointmentType"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            required
          >
            <option value="">Select an appointment type</option>
            {appointmentTypes.map(type => (
              <option key={type.id} value={type.id}>{type.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="appointmentDate">Date:</label>
          <input
            type="date"
            id="appointmentDate"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            required
          />
        </div>
        {availableSlots.length > 0 && (
          <div>
            <label htmlFor="appointmentTime">Time:</label>
            <select
              id="appointmentTime"
              value={selectedSlot}
              onChange={(e) => setSelectedSlot(e.target.value)}
              required
            >
              <option value="">Select a time</option>
              {availableSlots.map(slot => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
          </div>
        )}
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={patientDetails.firstName}
            onChange={handlePatientDetailsChange}
            required
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={patientDetails.lastName}
            onChange={handlePatientDetailsChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={patientDetails.email}
            onChange={handlePatientDetailsChange}
            required
          />
        </div>
        <div>
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={patientDetails.phone}
            onChange={handlePatientDetailsChange}
            required
          />
        </div>
        <button type="submit">Book Appointment</button>
      </form>
    </div>
  );
}



