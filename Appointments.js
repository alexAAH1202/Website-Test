import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import OnlineBookings from './appointments/OnlineBookings';
import AppointmentTypes from './appointments/AppointmentTypes';
import AppointmentTypeList from './appointments/AppointmentTypeList';
import { getAppointmentSettings, updateAppointmentSettings } from '../../services/api';

function Appointments() {
  const { path } = useRouteMatch();

  return (
    <div className="appointments-settings">
      <h2>Appointment Settings</h2>
      <Switch>
        <Route exact path={`${path}/types`}>
          <AppointmentTypes />
        </Route>
        <Route path={`${path}/types/:id`}>
          <AppointmentTypeList />
        </Route>
        <Route path={`${path}/online-bookings`}>
          <OnlineBookings 
            getSettings={getAppointmentSettings} 
            updateSettings={updateAppointmentSettings} 
          />
        </Route>
      </Switch>
    </div>
  );
}

export default Appointments;
