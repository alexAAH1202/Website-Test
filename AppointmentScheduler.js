import React, { useState, useEffect } from 'react';
import { getAppointments, createAppointment, updateAppointment, deleteAppointment, getPatients } from '../../../services/api';
import Calendar from './Calendar';
import AppointmentForm from './AppointmentForm';
import ConfirmationDialog from '../../common/ConfirmationDialog';

const AppointmentScheduler = () => {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  useEffect(() => {
    fetchAppointments();
    fetchPatients();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await getAppointments();
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const fetchPatients = async () => {
    try {
      const response = await getPatients();
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const handleSelectSlot = (slotInfo) => {
    setSelectedAppointment({
      patientId: '',
      date: slotInfo.start,
      duration: 60,
      type: '',
      notes: ''
    });
    setShowForm(true);
  };

  const handleSelectEvent = (event) => {
    setSelectedAppointment(event);
    setShowForm(true);
  };

  const handleSubmitAppointment = async (appointmentData) => {
    try {
      if (selectedAppointment.id) {
        await updateAppointment(selectedAppointment.id, appointmentData);
      } else {
        await createAppointment(appointmentData);
      }
      fetchAppointments();
      setShowForm(false);
      setSelectedAppointment(null);
    } catch (error) {
      console.error('Error saving appointment:', error);
    }
  };

  const handleCancelAppointment = () => {
    setShowCancelDialog(true);
  };

  const confirmCancelAppointment = async () => {
    try {
      await deleteAppointment(selectedAppointment.id);
      fetchAppointments();
      setShowCancelDialog(false);
      setShowForm(false);
      setSelectedAppointment(null);
    } catch (error) {
      console.error('Error cancelling appointment:', error);
    }
  };

  return (
    <div className="appointment-scheduler">
      <h2>Appointment Scheduler</h2>
      <Calendar 
        appointments={appointments}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
      />
      {showForm && (
        <AppointmentForm
          patients={patients}
          onSubmit={handleSubmitAppointment}
          onCancel={() => setShowForm(false)}
          onDelete={handleCancelAppointment}
          initialAppointment={selectedAppointment}
        />
      )}
      <ConfirmationDialog
        isOpen={showCancelDialog}
        message="Are you sure you want to cancel this appointment?"
        onConfirm={confirmCancelAppointment}
        onCancel={() => setShowCancelDialog(false)}
      />
    </div>
  );
};

export default AppointmentScheduler;
