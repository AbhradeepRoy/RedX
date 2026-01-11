import { SearchResult } from './types';

export const MOCK_RESULTS: SearchResult[] = [
  {
    id: '1',
    name: 'Kolkata Medical College',
    type: 'hospital',
    bloodGroup: 'A+',
    address: '88 College St, Kolkata',
    location: 'Kolkata',
    contact: '+91 9876543210',
    upiId: 'kmc@upi'
  },
  {
    id: '2',
    name: 'NRS Hospital',
    type: 'hospital',
    bloodGroup: 'O+',
    address: '138 AJC Bose Rd, Kolkata',
    location: 'Kolkata',
    contact: '+91 9876543211',
    upiId: 'nrs@upi'
  },
  {
    id: '3',
    name: 'Central Blood Bank',
    type: 'bloodbank',
    bloodGroup: 'AB-',
    address: 'Maniktala, Kolkata',
    location: 'Kolkata',
    contact: '+91 9876543212',
    upiId: 'cbb@upi'
  },
  {
    id: '4',
    name: 'Rahul Sharma',
    type: 'donor',
    bloodGroup: 'B+',
    address: 'Salt Lake, Sector V',
    location: 'Kolkata',
    contact: '+91 9876543213',
    upiId: 'rahul@upi'
  },
  {
    id: '5',
    name: 'Priya Das',
    type: 'donor',
    bloodGroup: 'A-',
    address: 'Park Street',
    location: 'Kolkata',
    contact: '+91 9876543214',
    upiId: 'priya@upi'
  }
];