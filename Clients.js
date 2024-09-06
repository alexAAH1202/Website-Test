import React from 'react';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import ConcessionTypes from './clients/ConcessionTypes';
import ReferralSources from './clients/ReferralSources';
import TreatmentNoteTemplates from './clients/TreatmentNoteTemplates';
import ClientFormTemplates from './clients/ClientFormTemplates';
import LetterTemplates from './clients/LetterTemplates';
import ClientPrivacy from './clients/ClientPrivacy';
import CustomClientFields from './clients/CustomClientFields';
import { getClientSettings, updateClientSettings } from '../../services/api';

function Clients() {
  const { path, url } = useRouteMatch();

  const settingsLinks = [
    { to: 'concession-types', label: 'Concession Types' },
    { to: 'referral-sources', label: 'Referral Sources' },
    { to: 'treatment-note-templates', label: 'Treatment Note Templates' },
    { to: 'client-form-templates', label: 'Client Form Templates' },
    { to: 'letter-templates', label: 'Letter Templates' },
    { to: 'client-privacy', label: 'Client Privacy' },
    { to: 'custom-client-fields', label: 'Custom Client Fields' },
  ];

  return (
    <div className="clients-settings">
      <h2>Client Settings</h2>
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
        <Route path={`${path}/concession-types`}>
          <ConcessionTypes getSettings={getClientSettings} updateSettings={updateClientSettings} />
        </Route>
        <Route path={`${path}/referral-sources`}>
          <ReferralSources getSettings={getClientSettings} updateSettings={updateClientSettings} />
        </Route>
        <Route path={`${path}/treatment-note-templates`}>
          <TreatmentNoteTemplates getSettings={getClientSettings} updateSettings={updateClientSettings} />
        </Route>
        <Route path={`${path}/client-form-templates`}>
          <ClientFormTemplates getSettings={getClientSettings} updateSettings={updateClientSettings} />
        </Route>
        <Route path={`${path}/letter-templates`}>
          <LetterTemplates getSettings={getClientSettings} updateSettings={updateClientSettings} />
        </Route>
        <Route path={`${path}/client-privacy`}>
          <ClientPrivacy getSettings={getClientSettings} updateSettings={updateClientSettings} />
        </Route>
        <Route path={`${path}/custom-client-fields`}>
          <CustomClientFields getSettings={getClientSettings} updateSettings={updateClientSettings} />
        </Route>
      </Switch>
    </div>
  );
}

export default Clients;
