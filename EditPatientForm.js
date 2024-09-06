import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getPatientDetails, updatePatient } from '../services/api';
import '../styles/EditPatientForm.css';

function EditPatientForm() {
  const [patient, setPatient] = useState({
    title: '',
    first_name: '',
    last_name: '',
    preferred_name: '',
    date_of_birth: '',
    gender: '',
    pronouns: '',
    cultural_background: '',
    preferred_language: '',
    interpreter_required: false,
    marital_status: '',
    occupation: '',
    phone: '',
    email: '',
    address: '',
    ndis_number: '',
    medicare_number: '',
    health_insurance_provider: '',
    health_insurance_number: '',
    concession_type: '',
    concession_number: '',
    concession_expiry: '',
    gp_name: '',
    gp_contact: '',
    emergency_contact_name: '',
    emergency_contact_phone: '',
    next_of_kin_name: '',
    next_of_kin_phone: '',
    guardian_name: '',
    guardian_phone: '',
    referral_source: '',
    communication_preferences: [],
    accessibility_needs: '',
    is_veteran: false,
    is_aboriginal_or_torres_strait_islander: false,
    allergies: [],
    current_medications: []
  });
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    fetchPatientDetails();
  }, [id]);

  const fetchPatientDetails = async () => {
    try {
      const data = await getPatientDetails(id);
      setPatient(data);
    } catch (error) {
      console.error('Error fetching patient details:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPatient(prevPatient => ({
      ...prevPatient,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleArrayChange = (e, field) => {
    const value = e.target.value.split(',').map(item => item.trim());
    setPatient(prevPatient => ({
      ...prevPatient,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePatient(id, patient);
      alert('Patient details updated successfully');
      history.push(`/patients/${id}`);
    } catch (error) {
      console.error('Error updating patient:', error);
      alert('Failed to update patient details');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="edit-patient-form">
      <h2>Edit Patient Details</h2>
      
      <div className="form-group">
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" value={patient.title} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="first_name">First Name:</label>
        <input type="text" id="first_name" name="first_name" value={patient.first_name} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label htmlFor="last_name">Last Name:</label>
        <input type="text" id="last_name" name="last_name" value={patient.last_name} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label htmlFor="preferred_name">Preferred Name:</label>
        <input type="text" id="preferred_name" name="preferred_name" value={patient.preferred_name} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="date_of_birth">Date of Birth:</label>
        <input type="date" id="date_of_birth" name="date_of_birth" value={patient.date_of_birth} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label htmlFor="gender">Gender:</label>
        <input type="text" id="gender" name="gender" value={patient.gender} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="pronouns">Pronouns:</label>
        <input type="text" id="pronouns" name="pronouns" value={patient.pronouns} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="cultural_background">Cultural Background:</label>
        <input type="text" id="cultural_background" name="cultural_background" value={patient.cultural_background} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="preferred_language">Preferred Language:</label>
        <input type="text" id="preferred_language" name="preferred_language" value={patient.preferred_language} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="interpreter_required">Interpreter Required:</label>
        <input type="checkbox" id="interpreter_required" name="interpreter_required" checked={patient.interpreter_required} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="marital_status">Marital Status:</label>
        <input type="text" id="marital_status" name="marital_status" value={patient.marital_status} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="occupation">Occupation:</label>
        <input type="text" id="occupation" name="occupation" value={patient.occupation} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone:</label>
        <input type="text" id="phone" name="phone" value={patient.phone} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={patient.email} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="address">Address:</label>
        <input type="text" id="address" name="address" value={patient.address} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="ndis_number">NDIS Number:</label>
        <input type="text" id="ndis_number" name="ndis_number" value={patient.ndis_number} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="medicare_number">Medicare Number:</label>
        <input type="text" id="medicare_number" name="medicare_number" value={patient.medicare_number} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="health_insurance_provider">Health Insurance Provider:</label>
        <input type="text" id="health_insurance_provider" name="health_insurance_provider" value={patient.health_insurance_provider} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="health_insurance_number">Health Insurance Number:</label>
        <input type="text" id="health_insurance_number" name="health_insurance_number" value={patient.health_insurance_number} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="concession_type">Concession Type:</label>
        <input type="text" id="concession_type" name="concession_type" value={patient.concession_type} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="concession_number">Concession Number:</label>
        <input type="text" id="concession_number" name="concession_number" value={patient.concession_number} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="concession_expiry">Concession Expiry:</label>
        <input type="date" id="concession_expiry" name="concession_expiry" value={patient.concession_expiry} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="gp_name">GP Name:</label>
        <input type="text" id="gp_name" name="gp_name" value={patient.gp_name} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="gp_contact">GP Contact:</label>
        <input type="text" id="gp_contact" name="gp_contact" value={patient.gp_contact} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="emergency_contact_name">Emergency Contact Name:</label>
        <input type="text" id="emergency_contact_name" name="emergency_contact_name" value={patient.emergency_contact_name} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="emergency_contact_phone">Emergency Contact Phone:</label>
        <input type="text" id="emergency_contact_phone" name="emergency_contact_phone" value={patient.emergency_contact_phone} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="next_of_kin_name">Next of Kin Name:</label>
        <input type="text" id="next_of_kin_name" name="next_of_kin_name" value={patient.next_of_kin_name} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="next_of_kin_phone">Next of Kin Phone:</label>
        <input type="text" id="next_of_kin_phone" name="next_of_kin_phone" value={patient.next_of_kin_phone} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="guardian_name">Guardian Name:</label>
        <input type="text" id="guardian_name" name="guardian_name" value={patient.guardian_name} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="guardian_phone">Guardian Phone:</label>
        <input type="text" id="guardian_phone" name="guardian_phone" value={patient.guardian_phone} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="referral_source">Referral Source:</label>
        <input type="text" id="referral_source" name="referral_source" value={patient.referral_source} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="communication_preferences">Communication Preferences:</label>
        <input type="text" id="communication_preferences" name="communication_preferences" value={patient.communication_preferences.join(',')} onChange={handleArrayChange} />
      </div>

      <div className="form-group">
        <label htmlFor="accessibility_needs">Accessibility Needs:</label>
        <input type="text" id="accessibility_needs" name="accessibility_needs" value={patient.accessibility_needs} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="is_veteran">Is Veteran:</label>
        <input type="checkbox" id="is_veteran" name="is_veteran" checked={patient.is_veteran} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="is_aboriginal_or_torres_strait_islander">Is Aboriginal or Torres Strait Islander:</label>
        <input type="checkbox" id="is_aboriginal_or_torres_strait_islander" name="is_aboriginal_or_torres_strait_islander" checked={patient.is_aboriginal_or_torres_strait_islander} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="allergies">Allergies:</label>
        <input type="text" id="allergies" name="allergies" value={patient.allergies.join(',')} onChange={handleArrayChange} />
      </div>

      <div className="form-group">
        <label htmlFor="current_medications">Current Medications:</label>
        <input type="text" id="current_medications" name="current_medications" value={patient.current_medications.join(',')} onChange={handleArrayChange} />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}

export default EditPatientForm;
