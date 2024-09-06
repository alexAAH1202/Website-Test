import React from 'react';
import UpcomingAppointmentsWidget from './UpcomingAppointmentsWidget';
import RecentActivityWidget from './RecentActivityWidget';
import NotificationsWidget from './NotificationsWidget';
import QuickActionsWidget from './QuickActionsWidget';
import BusinessBookingSettings from './BusinessBookingSettings';
import '../styles/Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="dashboard-grid">
        <UpcomingAppointmentsWidget />
        <RecentActivityWidget />
        <NotificationsWidget />
        <QuickActionsWidget />
      </div>
      <div className="dashboard-full-width">
        <BusinessBookingSettings />
      </div>
    </div>
  );
}

export default Dashboard;