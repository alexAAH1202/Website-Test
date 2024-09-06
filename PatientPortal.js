import React from 'react';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import PatientPersonalDetails from './PatientPersonalDetails';
import PatientReports from './PatientReports';
import PatientDocuments from './PatientDocuments';
import PatientAppointments from './PatientAppointments';
import '../styles/PatientPortal.css';

function PatientPortal() {
  let { path, url } = useRouteMatch();

  return (
    <div className="patient-portal">
      <h2>Patient Portal</h2>
      <nav>
        <ul>
          <li><Link to={`${url}/personal-details`}>Personal Details</Link></li>
          <li><Link to={`${url}/reports`}>Reports</Link></li>
          <li><Link to={`${url}/documents`}>Documents</Link></li>
          <li><Link to={`${url}/appointments`}>Appointments</Link></li>
        </ul>
      </nav>
      <Switch>
        <Route path={`${path}/personal-details`} component={PatientPersonalDetails} />
        <Route path={`${path}/reports`} component={PatientReports} />
        <Route path={`${path}/documents`} component={PatientDocuments} />
        <Route path={`${path}/appointments`} component={PatientAppointments} />
      </Switch>
    </div>
  );
}

export default PatientPortal;
