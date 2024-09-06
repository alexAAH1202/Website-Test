import React from 'react';
import { Link } from 'react-router-dom';

function QuickActionsWidget() {
  return (
    <div className="dashboard-widget quick-actions">
      <h2>Quick Actions</h2>
      <Link to="/add-patient" className="quick-action-button">Add New Patient</Link>
      <Link to="/book-appointment" className="quick-action-button">Book Appointment</Link>
      <Link to="/create-invoice" className="quick-action-button">Create Invoice</Link>
    </div>
  );
}

export default QuickActionsWidget;
