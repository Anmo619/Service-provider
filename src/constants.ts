import { Category } from './types';

export const CATEGORIES: Category[] = [
  {
    id: 'electrical',
    label: 'Electrical',
    icon: 'Zap',
    basePrice: 500,
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800',
    popular: true
  },
  {
    id: 'plumbing',
    label: 'Plumbing',
    icon: 'Droplets',
    basePrice: 400,
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800',
    popular: true
  },
  {
    id: 'ac-repair',
    label: 'AC Repair',
    icon: 'Wind',
    basePrice: 800,
    image: 'https://images.unsplash.com/photo-1595113328400-344403661eb1?auto=format&fit=crop&q=80&w=800',
    popular: true
  },
  {
    id: 'appliance',
    label: 'Appliances',
    icon: 'Wrench',
    basePrice: 600,
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'cleaning',
    label: 'Cleaning',
    icon: 'Sparkles',
    basePrice: 300,
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6954?auto=format&fit=crop&q=80&w=800',
    popular: true
  },
  {
    id: 'painting',
    label: 'Painting',
    icon: 'Brush',
    basePrice: 1200,
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=800'
  }
];

export const PRICE_LEVELS = {
  low: {
    label: 'Budget',
    multiplier: 0.8,
    response: 'Slow response (2-4 hours)',
    color: 'text-gray-500'
  },
  fair: {
    label: 'Fair',
    multiplier: 1.0,
    response: 'Normal response (1 hour)',
    color: 'text-blue-600'
  },
  high: {
    label: 'Express',
    multiplier: 1.5,
    response: 'Instant matching (<15 mins)',
    color: 'text-orange-600'
  }
};
