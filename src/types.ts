export type UserRole = 'customer' | 'provider';

export interface UserProfile {
  userId: string;
  displayName: string;
  email: string;
  role: UserRole;
  rating?: number;
  totalReviews?: number;
  isVerified?: boolean;
  providerTitle?: string;
  categories?: string[];
  location?: string;
  createdAt: string;
}

export type JobStatus = 'pending' | 'accepted' | 'completed' | 'cancelled';
export type PriceLevel = 'low' | 'fair' | 'high';

export interface Job {
  id: string;
  customerId: string;
  customerName: string;
  providerId?: string;
  providerName?: string;
  category: string;
  description: string;
  photoUrls?: string[];
  offeredPrice: number;
  priceLevel: PriceLevel;
  status: JobStatus;
  location: string;
  createdAt: any; // Firestore timestamp
  updatedAt?: any;
}

export interface Category {
  id: string;
  label: string;
  icon: string;
  basePrice: number;
  image: string;
  popular?: boolean;
}

export interface Review {
  id: string;
  jobId: string;
  customerId: string;
  customerName: string;
  providerId: string;
  rating: number;
  comment: string;
  createdAt: string;
}
