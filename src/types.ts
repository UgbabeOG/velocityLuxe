export type ShipmentStatus = 'pending' | 'in_transit' | 'out_for_delivery' | 'delivered' | 'exception';

export interface TrackingUpdate {
  id: string;
  status: ShipmentStatus;
  location: string;
  timestamp: string;
  description: string;
}

export interface Shipment {
  id: string;
  trackingNumber: string;
  sender: {
    name: string;
    address: string;
    city: string;
    country: string;
  };
  receiver: {
    name: string;
    address: string;
    city: string;
    country: string;
  };
  status: ShipmentStatus;
  estimatedDelivery: string;
  updates: TrackingUpdate[];
  weight: string;
  dimensions: string;
  serviceType: 'express' | 'standard' | 'economy';
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
}
