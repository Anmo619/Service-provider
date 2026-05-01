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
  addresses?: string[];
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
  serviceName?: string;
  description: string;
  photoUrls?: string[];
  offeredPrice: number;
  priceLevel: PriceLevel;
  status: JobStatus;
  location: string;
  detailedAddress?: {
    houseNo: string;
    landmark: string;
    area: string;
  };
  createdAt: any; // Firestore timestamp
  updatedAt?: any;
}

export interface Service {
  id: string;
  label: string;
  description: string;
  icon: string;
  estimatedPrice: number;
}

export interface Category {
  id: string;
  label: string;
  icon: string;
  basePrice: number;
  image: string;
  popular?: boolean;
  services: Service[];
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
