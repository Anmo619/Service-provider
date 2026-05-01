import { Category } from './types';

export const CATEGORIES: Category[] = [
  {
    id: 'electrical',
    label: 'Electrical',
    icon: 'Zap',
    basePrice: 500,
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800',
    popular: true,
    services: [
      { id: 'fan-repair', label: 'Fan not working?', description: 'Complete repair of ceiling, pedestal or exhaust fans.', icon: 'Wind', estimatedPrice: 350 },
      { id: 'switch-repair', label: 'Sparks in switch?', description: 'Fixing loose connections, broken switches or sockets.', icon: 'Zap', estimatedPrice: 200 },
      { id: 'wiring', label: 'Frequent short circuits?', description: 'Detecting and fixing complex wiring issues or full house wiring.', icon: 'Cable', estimatedPrice: 1500 },
      { id: 'light-install', label: 'Need new lights fixed?', description: 'Installing LED panels, chandeliers, or wall fixtures.', icon: 'Lightbulb', estimatedPrice: 300 },
      { id: 'inverter-repair', label: 'Inverter giving trouble?', description: 'Battery check or circuit repair for power backups.', icon: 'BatteryCharging', estimatedPrice: 600 },
      { id: 'bell-repair', label: 'Doorbell silent?', description: 'Fixing or replacing wired or wireless doorbells.', icon: 'Bell', estimatedPrice: 150 },
      { id: 'geyser-service', label: 'Geyser not heating?', description: 'Element replacement or thermostat fix for water heaters.', icon: 'Waves', estimatedPrice: 500 }
    ]
  },
  {
    id: 'plumbing',
    label: 'Plumbing',
    icon: 'Droplets',
    basePrice: 400,
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800',
    popular: true,
    services: [
      { id: 'tap-repair', label: 'Leaking tap or mixer?', description: 'Fixing drips or replacing washers and tap sets.', icon: 'Droplets', estimatedPrice: 250 },
      { id: 'drain-cleaning', label: 'Kitchen sink blocked?', description: 'Deep cleaning and unblocking of sewage or basin pipes.', icon: 'Filter', estimatedPrice: 600 },
      { id: 'toilet-fix', label: 'Flush not working?', description: 'Internal flush tank repair or seat replacement.', icon: 'Bath', estimatedPrice: 450 },
      { id: 'pipe-fitting', label: 'Visible pipe leakage?', description: 'Fixing wall seepage or broken PVC/CPVC pipes.', icon: 'Wrench', estimatedPrice: 800 },
      { id: 'tank-clean', label: 'Water tank dirty?', description: 'Complete cleaning and disinfection of overhead tanks.', icon: 'Trash', estimatedPrice: 1200 },
      { id: 'shower-repair', label: 'Low shower pressure?', description: 'Cleaning or replacing shower heads and mixers.', icon: 'CloudRain', estimatedPrice: 300 }
    ]
  },
  {
    id: 'ac-repair',
    label: 'AC & Cooling',
    icon: 'Snowflake',
    basePrice: 800,
    image: 'https://images.unsplash.com/photo-1595113328400-344403661eb1?auto=format&fit=crop&q=80&w=800',
    popular: true,
    services: [
      { id: 'ac-service', label: 'AC not cooling enough?', description: 'Jet wash service, filter cleaning and cooling check.', icon: 'Wind', estimatedPrice: 599 },
      { id: 'gas-refill', label: 'Need AC gas refill?', description: 'Fixing leakages and refilling refrigerant gas.', icon: 'ThermometerSun', estimatedPrice: 2500 },
      { id: 'ac-install', label: 'New AC setup?', description: 'Professional mounting and installation of split or window AC.', icon: 'HardDrive', estimatedPrice: 1500 },
      { id: 'ac-uninstallation', label: 'Uninstalling old AC?', description: 'Safe removal and packing of your existing AC unit.', icon: 'MinusCircle', estimatedPrice: 700 },
      { id: 'ac-leakage', label: 'Water dripping from AC?', description: 'Clearing drain pipe blockages or tray fixes.', icon: 'Droplets', estimatedPrice: 400 }
    ]
  },
  {
    id: 'appliance',
    label: 'Appliance Repair',
    icon: 'Wrench',
    basePrice: 600,
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=800',
    popular: true,
    services: [
      { id: 'fridge-repair', label: 'Refrigerator not cooling?', description: 'Compressor check, gas refill or sensor replacement.', icon: 'Snowflake', estimatedPrice: 800 },
      { id: 'washing-machine', label: 'Washing machine noise?', description: 'Fixing motor, drum or drainage related problems.', icon: 'Waves', estimatedPrice: 900 },
      { id: 'microwave-repair', label: 'Microwave not heating?', description: 'Magnetron or touchpad repair for all brands.', icon: 'Flame', estimatedPrice: 500 },
      { id: 'tv-repair', label: 'TV screen blank?', description: 'LED/LCD panel repair or motherboard issues.', icon: 'Tv', estimatedPrice: 1200 },
      { id: 'ro-service', label: 'Water purifier service?', description: 'Filter replacement and TDS calibration.', icon: 'Filter', estimatedPrice: 600 }
    ]
  },
  {
    id: 'cleaning',
    label: 'Cleaning',
    icon: 'Sparkles',
    basePrice: 300,
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6954?auto=format&fit=crop&q=80&w=800',
    popular: true,
    services: [
      { id: 'deep-clean', label: 'Home too dusty?', description: 'Complete deep cleaning of all rooms and balconies.', icon: 'Home', estimatedPrice: 4500 },
      { id: 'sofa-clean', label: 'Stains on sofa?', description: 'Professional shampooing and vacuuming for fabric sofas.', icon: 'Armchair', estimatedPrice: 800 },
      { id: 'bathroom-clean', label: 'Bathroom scaling?', description: 'Acid wash and tile scrubbing for a sparkling look.', icon: 'CheckCircle', estimatedPrice: 400 },
      { id: 'kitchen-clean', label: 'Greasy kitchen chimney?', description: 'Degreasing tiles, slabs, and outer cabinets.', icon: 'Flame', estimatedPrice: 1200 },
      { id: 'car-clean', label: 'Dirty car interior?', description: 'Dashboard polish and seat shampooing at your doorstep.', icon: 'Car', estimatedPrice: 900 }
    ]
  },
  {
    id: 'carpentry',
    label: 'Carpentry',
    icon: 'Hammer',
    basePrice: 450,
    image: 'https://images.unsplash.com/photo-1620055375842-83fc88f34458?auto=format&fit=crop&q=80&w=800',
    services: [
      { id: 'door-repair', label: 'Creaky or stuck door?', description: 'Adjusting hinges, fixing latches or trimming doors.', icon: 'DoorOpen', estimatedPrice: 400 },
      { id: 'handle-fix', label: 'Loose cupboard handle?', description: 'Fixing or replacing handles and drawer knobs.', icon: 'Wrench', estimatedPrice: 150 },
      { id: 'furniture-assembly', label: 'New furniture to build?', description: 'Professional assembly for items from IKEA or local shops.', icon: 'Package', estimatedPrice: 800 },
      { id: 'bed-repair', label: 'Bed making noise?', description: 'Tightening joints or fixing broken support slats.', icon: 'Bed', estimatedPrice: 600 },
      { id: 'window-repair', label: 'Broken window latch?', description: 'Replacing latches, locks or glass panes.', icon: 'Square', estimatedPrice: 350 }
    ]
  },
  {
    id: 'painting',
    label: 'Painting',
    icon: 'Brush',
    basePrice: 1200,
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=800',
    services: [
      { id: 'wall-paint', label: 'Need a fresh wall look?', description: 'Painting a single room or feature wall.', icon: 'Palette', estimatedPrice: 2000 },
      { id: 'full-paint', label: 'Full house painting?', description: 'Consultation, putty work, and multi-layer coat application.', icon: 'Brush', estimatedPrice: 15000 },
      { id: 'waterproof', label: 'Dampness on walls?', description: 'Fixing cracks and applying waterproof base layers.', icon: 'ShieldAlert', estimatedPrice: 5000 },
      { id: 'wood-polish', label: 'Furniture lost its shine?', description: 'Polishing wooden doors, tables, or cabinets.', icon: 'Columns', estimatedPrice: 3000 }
    ]
  },
  {
    id: 'pest-control',
    label: 'Pest Control',
    icon: 'Bug',
    basePrice: 600,
    image: 'https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?auto=format&fit=crop&q=80&w=800',
    services: [
      { id: 'cockroach-control', label: 'Cockroaches in kitchen?', description: 'Gel-based treatment for non-toxic pest removal.', icon: 'Bug', estimatedPrice: 800 },
      { id: 'termite-control', label: 'Termites eating wood?', description: 'Drill-fill-seal treatment for long-term protection.', icon: 'Shield', estimatedPrice: 4000 },
      { id: 'mosquito-control', label: 'Too many mosquitos?', description: 'Mist treatment for gardens and indoor spaces.', icon: 'Wind', estimatedPrice: 1200 },
      { id: 'bedbug-control', label: 'Bed bugs in mattress?', description: 'Intensive chemical spray treatment for bedrooms.', icon: 'Bed', estimatedPrice: 1800 },
      { id: 'rat-control', label: 'Rats in your ceiling?', description: 'Placement of glue traps and bait stations.', icon: 'Navigation', estimatedPrice: 700 }
    ]
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
