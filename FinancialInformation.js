import React from 'react';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import BillableItems from './financial/BillableItems';
import Invoices from './financial/Invoices';
import PaymentTypes from './financial/PaymentTypes';
import Taxes from './financial/Taxes';
import { getFinancialSettings, updateFinancialSettings } from '../../services/api';

function FinancialInformation() {
  const { path, url } = useRouteMatch();

  const settingsLinks = [
    { to: 'billable-items', label: 'Billable Items' },
    { to: 'invoices', label: 'Invoices' },
    { to: 'payment-types', label: 'Payment Types' },
    { to: 'taxes', label: 'Taxes' },
  ];

  return (
    <div className="financial-settings">
      <h2>Financial Information Settings</h2>
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
        <Route path={`${path}/billable-items`}>
          <BillableItems getSettings={getFinancialSettings} updateSettings={updateFinancialSettings} />
        </Route>
        <Route path={`${path}/invoices`}>
          <Invoices getSettings={getFinancialSettings} updateSettings={updateFinancialSettings} />
        </Route>
        <Route path={`${path}/payment-types`}>
          <PaymentTypes getSettings={getFinancialSettings} updateSettings={updateFinancialSettings} />
        </Route>
        <Route path={`${path}/taxes`}>
          <Taxes getSettings={getFinancialSettings} updateSettings={updateFinancialSettings} />
        </Route>
      </Switch>
    </div>
  );
}

export default FinancialInformation;
