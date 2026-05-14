import { Shipment, TrackingUpdate } from '../types';

const MOCK_SHIPMENTS: Shipment[] = [
  {
    id: '1',
    trackingNumber: 'SWIFT-KJ82-9012',
    status: 'in_transit',
    sender: { name: 'Tech Solutions Inc.', address: '123 Silicon Way', city: 'San Francisco', country: 'USA' },
    receiver: { name: 'John Doe', address: '456 London Bridge St.', city: 'London', country: 'UK' },
    estimatedDelivery: '2024-05-20T18:00:00Z',
    weight: '2.5 kg',
    dimensions: '30x20x15 cm',
    serviceType: 'express',
    createdAt: '2024-05-14T10:00:00Z',
    updates: [
      {
        id: 'u1',
        status: 'in_transit',
        location: 'New York Distribution Center',
        timestamp: '2024-05-15T14:30:00Z',
        description: 'Package has left the distribution center'
      },
      {
        id: 'u2',
        status: 'in_transit',
        location: 'San Francisco Hub',
        timestamp: '2024-05-14T18:45:00Z',
        description: 'Package received at local hub'
      },
      {
        id: 'u3',
        status: 'pending',
        location: 'Pickup Location',
        timestamp: '2024-05-14T10:30:00Z',
        description: 'Shipment created'
      }
    ]
  },
  {
    id: '2',
    trackingNumber: 'SWIFT-XP44-1189',
    status: 'delivered',
    sender: { name: 'Gourmet Foods Ltd.', address: '789 Olive Grove', city: 'Madrid', country: 'Spain' },
    receiver: { name: 'Sarah Smith', address: '101 Parisienne Blvd', city: 'Paris', country: 'France' },
    estimatedDelivery: '2024-05-12T12:00:00Z',
    weight: '1.2 kg',
    dimensions: '20x15x10 cm',
    serviceType: 'standard',
    createdAt: '2024-05-10T09:00:00Z',
    updates: [
      {
        id: 'u4',
        status: 'delivered',
        location: 'Paris, FR',
        timestamp: '2024-05-12T11:45:00Z',
        description: 'Package delivered - Signed by S. Smith'
      },
      {
        id: 'u5',
        status: 'out_for_delivery',
        location: 'Paris, FR',
        timestamp: '2024-05-12T08:15:00Z',
        description: 'Out for delivery'
      }
    ]
  }
];

export const getShipmentByTracking = (trackingNumber: string): Shipment | undefined => {
  return MOCK_SHIPMENTS.find(s => s.trackingNumber.toUpperCase() === trackingNumber.toUpperCase());
};

export const getAllShipments = (): Shipment[] => {
  const stored = localStorage.getItem('swiftstream_shipments');
  if (stored) {
    return JSON.parse(stored);
  }
  return MOCK_SHIPMENTS;
};

export const saveShipment = (shipment: Shipment) => {
  const current = getAllShipments();
  const updated = [shipment, ...current];
  localStorage.setItem('swiftstream_shipments', JSON.stringify(updated));
};
