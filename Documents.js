import React, { useState, useEffect } from 'react';
import { getDocuments, uploadDocument } from '../../../services/api';

const Documents = ({ patientId }) => {
  const [documents, setDocuments] = useState([]);
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchDocuments();
  }, [patientId]);

  const fetchDocuments = async () => {
    try {
      const response = await getDocuments(patientId);
      setDocuments(response.data);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    try {
      const formData = new FormData();
      formData.append('file', file);
      await uploadDocument(patientId, formData);
      fetchDocuments();
      setFile(null);
    } catch (error) {
      console.error('Error uploading document:', error);
    }
  };

  return (
    <div className="documents">
      <h3>Documents</h3>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {documents.map((document, index) => (
        <div key={index}>
          <p><strong>File Name:</strong> {document.file_name}</p>
          <p><strong>Upload Date:</strong> {document.upload_date}</p>
        </div>
      ))}
    </div>
  );
};

function Documents({ patientId }) {
  const [documents, setDocuments] = useState([]);
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchDocuments();
  }, [patientId]);

  const fetchDocuments = async () => {
    try {
      const data = await getDocuments(patientId);
      setDocuments(data);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    try {
      await uploadDocument(patientId, file);
      fetchDocuments();
      setFile(null);
    } catch (error) {
      console.error('Error uploading document:', error);
    }
  };

  return (
    <div className="documents">
      <h3>Documents</h3>
      <div className="upload-section">
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Date Uploaded</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {documents.map(doc => (
            <tr key={doc.id}>
              <td>{doc.name}</td>
              <td>{doc.type}</td>
              <td>{doc.uploadDate}</td>
              <td>
                <button onClick={() => window.open(doc.url)}>View</button>
                <button onClick={() => handleDownload(doc)}>Download</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Documents;
