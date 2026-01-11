export type UserRole = 'donor' | 'recipient' | 'hospital' | 'bloodbank' | null;

export interface UserProfile {
  name: string;
  email: string;
  address: string;
  dob: string;
  bloodGroup: string;
  contactNumber: string;
  medicalConditions: string[];
  otherMedicalCondition?: string;
  role: UserRole;
  // Role specific details
  aadhar?: string;
  referencePrescription?: string; // simulation of file path
  isEmergency?: boolean;
  neededDate?: string;
  hospitalName?: string;
  undertakenBy?: string;
}

export interface SearchResult {
  id: string;
  name: string;
  type: 'donor' | 'hospital' | 'bloodbank';
  bloodGroup: string;
  address: string;
  location: string;
  contact: string;
  upiId?: string;
}

export const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export const MEDICAL_CONDITIONS = [
  'High Blood Sugar',
  'High Blood Pressure',
  'Thyroid',
  'Cholesterol',
  'Uric Acid',
  'Cancer'
];