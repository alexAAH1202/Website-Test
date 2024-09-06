import React, { useState, useEffect } from 'react';
import { getPatientDocuments, uploadDocument } from '../services/api';

function PatientDocuments() {
  const [documents, setDocuments] = useState([]);
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    const data = await getPatientDocuments();
    setDocuments(data);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (file) {
      await uploadDocument(file);
      fetchDocuments();
      setFile(null);
    }
  };

  return (
    <div className="patient-documents">
      <h3>Documents</h3>
      <input type="file" onChange={handleFileChange} accept=".pdf" />
      <button onClick={handleUpload}>Upload</button>
      <ul>
        {documents.map(doc => (
          <li key={doc.id}>
            {doc.name} (Version: {doc.version})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PatientDocuments;
