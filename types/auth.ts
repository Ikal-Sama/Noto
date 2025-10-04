// Types for authentication and user data

export interface BaseUser {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  emailVerified: boolean;
  name: string;
  image?: string | null;
  // Add any other fields that might be present in your user object
}

export interface User extends BaseUser {
  // You can add additional user-specific fields here if needed
}

export interface Session {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  expiresAt: Date;
  token: string;
  ipAddress?: string | null;
  userAgent?: string | null;
  user: User;
}

export interface UploadProfileImageProps {
  user: User | null;
}
