import React, { useState, useEffect } from 'react';
import { getPatientReports } from '../services/api';

function PatientReports() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    const data = await getPatientReports();
    setReports(data);
  };

  const handleDownload = (reportId) => {
    // Implement download functionality
    console.log(`Downloading report ${reportId}`);
  };

  return (
    <div className="patient-reports">
      <h3>Reports</h3>
      <ul>
        {reports.map(report => (
          <li key={report.id}>
            {report.name}
            <button onClick={() => handleDownload(report.id)}>Download</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PatientReports;
