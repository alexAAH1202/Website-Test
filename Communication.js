import React from 'react';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import SMSSettings from './communication/SMSSettings';
import AppointmentCancellations from './communication/AppointmentCancellations';
import AppointmentNonAttendance from './communication/AppointmentNonAttendance';
import AppointmentReminders from './communication/AppointmentReminders';
import { getCommunicationSettings, updateCommunicationSettings } from '../../services/api';

function Communication() {
  const { path, url } = useRouteMatch();

  const settingsLinks = [
    { to: 'sms-settings', label: 'SMS Settings' },
    { to: 'appointment-cancellations', label: 'Appointment Cancellations' },
    { to: 'appointment-non-attendance', label: 'Appointment Non-Attendance' },
    { to: 'appointment-reminders', label: 'Appointment Reminders' },
  ];

  return (
    <div className="communication-settings">
      <h2>Communication Settings</h2>
      <nav className="settings-nav">
        <ul>
          {settingsLinks.map(({ to, label }) => (
            <li key={to}>
              <Link to={`${url}/${to}`}>{label}</Link>
            </li>
          ))}
        </ul>
      </nav>

      <Switch>
        <Route exact path={path}>
          <h3>Select a setting to configure</h3>
        </Route>
        <Route path={`${path}/sms-settings`}>
          <SMSSettings getSettings={getCommunicationSettings} updateSettings={updateCommunicationSettings} />
        </Route>
        <Route path={`${path}/appointment-cancellations`}>
          <AppointmentCancellations getSettings={getCommunicationSettings} updateSettings={updateCommunicationSettings} />
        </Route>
        <Route path={`${path}/appointment-non-attendance`}>
          <AppointmentNonAttendance getSettings={getCommunicationSettings} updateSettings={updateCommunicationSettings} />
        </Route>
        <Route path={`${path}/appointment-reminders`}>
          <AppointmentReminders getSettings={getCommunicationSettings} updateSettings={updateCommunicationSettings} />
        </Route>
      </Switch>
    </div>
  );
}

export default Communication;
