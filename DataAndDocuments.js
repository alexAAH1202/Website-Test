import React from 'react';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import DataImports from './dataAndDocuments/DataImports';
import DataExports from './dataAndDocuments/DataExports';
import DocumentsAndPrinting from './dataAndDocuments/DocumentsAndPrinting';
import { getDataAndDocumentSettings, updateDataAndDocumentSettings } from '../../services/api';

function DataAndDocuments() {
  const { path, url } = useRouteMatch();

  const settingsLinks = [
    { to: 'data-imports', label: 'Data Imports' },
    { to: 'data-exports', label: 'Data Exports' },
    { to: 'documents-and-printing', label: 'Documents and Printing' },
  ];

  return (
    <div className="data-and-documents-settings">
      <h2>Data and Documents Settings</h2>
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
        <Route path={`${path}/data-imports`}>
          <DataImports getSettings={getDataAndDocumentSettings} updateSettings={updateDataAndDocumentSettings} />
        </Route>
        <Route path={`${path}/data-exports`}>
          <DataExports getSettings={getDataAndDocumentSettings} updateSettings={updateDataAndDocumentSettings} />
        </Route>
        <Route path={`${path}/documents-and-printing`}>
          <DocumentsAndPrinting getSettings={getDataAndDocumentSettings} updateSettings={updateDataAndDocumentSettings} />
        </Route>
      </Switch>
    </div>
  );
}

export default DataAndDocuments;
