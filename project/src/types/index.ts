export interface User {
  id: string;
  name: string;
  email: string;
  type: 'donor' | 'recipient';
  organization: string;
  location: {
    address: string;
    lat: number;
    lng: number;
  };
  phone: string;
  verified: boolean;
  rating: number;
  totalDonations?: number;
  totalReceived?: number;
}

export interface FoodItem {
  id: string;
  title: string;
  description: string;
  quantity: string;
  category: 'prepared' | 'raw' | 'packaged' | 'beverages';
  expiryTime: string;
  donorId: string;
  donorName: string;
  donorLocation: {
    address: string;
    lat: number;
    lng: number;
  };
  images: string[];
  status: 'available' | 'requested' | 'picked-up' | 'delivered';
  requestedBy?: string;
  createdAt: string;
  pickupTime?: string;
  specialInstructions?: string;
}

export interface DonationRequest {
  id: string;
  recipientId: string;
  recipientName: string;
  foodItemId: string;
  message: string;
  urgencyLevel: 'low' | 'medium' | 'high' | 'emergency';
  expectedPickupTime: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  createdAt: string;
}

export interface Feedback {
  id: string;
  donationId: string;
  rating: number;
  comment: string;
  images?: string[];
  createdAt: string;
  recipientName: string;
}