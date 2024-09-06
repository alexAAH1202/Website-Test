import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getRecentPatientActivity } from '../services/api';

function RecentActivityWidget() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const data = await getRecentPatientActivity();
      setActivities(data);
    } catch (error) {
      console.error('Error fetching activities:', error);
    }
  };

  return (
    <div className="dashboard-widget recent-activity">
      <h2>Recent Patient Activity</h2>
      <ul>
        {activities.map(activity => (
          <li key={activity.id}>
            {activity.patientName} - {activity.action} - {activity.date}
          </li>
        ))}
      </ul>
      <Link to="/patients">View All Patients</Link>
    </div>
  );
}

export default RecentActivityWidget;
