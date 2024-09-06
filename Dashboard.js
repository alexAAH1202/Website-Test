import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUpcomingAppointments, getRecentPatientActivity, getNotifications } from '../services/api';
import '../styles/Dashboard.css';

function Dashboard() {
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const appointments = await getUpcomingAppointments();
      const activity = await getRecentPatientActivity();
      const notifs = await getNotifications();
      
      setUpcomingAppointments(appointments);
      setRecentActivity(activity);
      setNotifications(notifs);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      
      <div className="dashboard-grid">
        <div className="dashboard-widget upcoming-appointments">
          <h2>Upcoming Appointments</h2>
          <ul>
            {upcomingAppointments.map(appointment => (
              <li key={appointment.id}>
                {appointment.patientName} - {appointment.date} {appointment.time}
              </li>
            ))}
          </ul>
          <Link to="/appointments">View All Appointments</Link>
        </div>

        <div className="dashboard-widget recent-activity">
          <h2>Recent Patient Activity</h2>
          <ul>
            {recentActivity.map(activity => (
              <li key={activity.id}>
                {activity.patientName} - {activity.action} - {activity.date}
              </li>
            ))}
          </ul>
          <Link to="/patients">View All Patients</Link>
        </div>

        <div className="dashboard-widget notifications">
          <h2>Notifications</h2>
          <ul>
            {notifications.map(notification => (
              <li key={notification.id}>
                {notification.message}
              </li>
            ))}
          </ul>
        </div>

        <div className="dashboard-widget quick-actions">
          <h2>Quick Actions</h2>
          <Link to="/add-patient" className="quick-action-button">Add New Patient</Link>
          <Link to="/book-appointment" className="quick-action-button">Book Appointment</Link>
          <Link to="/create-invoice" className="quick-action-button">Create Invoice</Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
