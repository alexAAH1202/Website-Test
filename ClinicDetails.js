import React from 'react';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import GeneralSettings from './clinicDetails/GeneralSettings';
import BusinessInformation from './clinicDetails/BusinessInformation';
import AccountOwnership from './clinicDetails/AccountOwnership';
import UsersAndPractitioners from './clinicDetails/UsersAndPractitioners';
import Subscription from './clinicDetails/Subscription';
import ClinicLogo from './clinicDetails/ClinicLogo';
import { getClinicDetails, updateClinicDetails } from '../../services/api';

function ClinicDetails() {
  const { path, url } = useRouteMatch();

  const settingsLinks = [
    { to: 'general', label: 'General Settings' },
    { to: 'business-info', label: 'Business Information' },
    { to: 'account-ownership', label: 'Account Ownership' },
    { to: 'users-practitioners', label: 'Users & Practitioners' },
    { to: 'subscription', label: 'Subscription' },
    { to: 'clinic-logo', label: 'Clinic Logo' },
  ];

  return (
    <div className="clinic-details-settings">
      <h2>Clinic Details</h2>
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
        <Route path={`${path}/general`}>
          <GeneralSettings getSettings={getClinicDetails} updateSettings={updateClinicDetails} />
        </Route>
        <Route path={`${path}/business-info`}>
          <BusinessInformation getSettings={getClinicDetails} updateSettings={updateClinicDetails} />
        </Route>
        <Route path={`${path}/account-ownership`}>
          <AccountOwnership getSettings={getClinicDetails} updateSettings={updateClinicDetails} />
        </Route>
        <Route path={`${path}/users-practitioners`}>
          <UsersAndPractitioners getSettings={getClinicDetails} updateSettings={updateClinicDetails} />
        </Route>
        <Route path={`${path}/subscription`}>
          <Subscription getSettings={getClinicDetails} updateSettings={updateClinicDetails} />
        </Route>
        <Route path={`${path}/clinic-logo`}>
          <ClinicLogo getSettings={getClinicDetails} updateSettings={updateClinicDetails} />
        </Route>
      </Switch>
    </div>
  );
}

export default ClinicDetails;
