import React, { useState, useEffect } from 'react';
import { getClinicalNotes } from '../services/api';

function ClinicalNotes({ patientId }) {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchClinicalNotes();
  }, [patientId]);

  const fetchClinicalNotes = async () => {
    try {
      const data = await getClinicalNotes(patientId);
      setNotes(data);
    } catch (error) {
      console.error('Error fetching clinical notes:', error);
    }
  };

  return (
    <div className="clinical-notes">
      <h3>Clinical Notes</h3>
      {notes.map(note => (
        <div key={note.id} className="note">
          <p><strong>Date:</strong> {note.date}</p>
          <p><strong>Practitioner:</strong> {note.practitioner}</p>
          <p>{note.content}</p>
        </div>
      ))}
    </div>
  );
}

export default ClinicalNotes;