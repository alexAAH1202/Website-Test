import React from 'react';

const PersonalInformation = ({ patient }) => {
  return (
    <div className="personal-information">
      <h3>Personal Information</h3>
      <p><strong>Name:</strong> {patient.title} {patient.first_name} {patient.last_name}</p>
      <p><strong>Preferred Name:</strong> {patient.preferred_name}</p>
      <p><strong>Date of Birth:</strong> {patient.date_of_birth}</p>
      <p><strong>Gender:</strong> {patient.gender}</p>
      <p><strong>Pronouns:</strong> {patient.pronouns}</p>
      <p><strong>Cultural Background:</strong> {patient.cultural_background}</p>
      <p><strong>Preferred Language:</strong> {patient.preferred_language}</p>
      <p><strong>Interpreter Required:</strong> {patient.interpreter_required ? 'Yes' : 'No'}</p>
      <p><strong>Marital Status:</strong> {patient.marital_status}</p>
      <p><strong>Occupation:</strong> {patient.occupation}</p>
      <p><strong>Contact:</strong> {patient.phone}</p>
      <p><strong>Email:</strong> {patient.email}</p>
      <p><strong>Address:</strong> {patient.address}</p>
      <p><strong>NDIS Number:</strong> {patient.ndis_number}</p>
      <p><strong>Medicare Number:</strong> {patient.medicare_number}</p>
      <p><strong>Health Insurance:</strong> {patient.health_insurance_provider} - Policy: {patient.health_insurance_number}</p>
      <p><strong>Concession Card:</strong> {patient.concession_type} - Number: {patient.concession_number} - Expiry: {patient.concession_expiry}</p>
      <p><strong>GP:</strong> Dr. {patient.gp_name} - Contact: {patient.gp_contact}</p>
      <p><strong>Emergency Contact:</strong> {patient.emergency_contact_name} ({patient.emergency_contact_phone})</p>
      <p><strong>Next of Kin:</strong> {patient.next_of_kin_name} ({patient.next_of_kin_phone})</p>
      <p><strong>Guardian/Carer:</strong> {patient.guardian_name} ({patient.guardian_phone})</p>
      <p><strong>Referral Source:</strong> {patient.referral_source}</p>
      <p><strong>Communication Preferences:</strong> {patient.communication_preferences.join(', ')}</p>
      <p><strong>Accessibility Needs:</strong> {patient.accessibility_needs}</p>
      <p><strong>Veteran Status:</strong> {patient.is_veteran ? 'Yes' : 'No'}</p>
      <p><strong>Aboriginal or Torres Strait Islander:</strong> {patient.is_aboriginal_or_torres_strait_islander ? 'Yes' : 'No'}</p>
      <p><strong>Allergies:</strong> {patient.allergies.join(', ')}</p>
      <p><strong>Current Medications:</strong> {patient.current_medications.join(', ')}</p>
    </div>
  );
};

export default PersonalInformation;
