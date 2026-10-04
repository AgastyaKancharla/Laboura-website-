import type { LucideIcon } from "lucide-react";
import {
  Store,
  UtensilsCrossed,
  Fuel,
  Truck,
  Sparkles,
  ShieldCheck,
  Scissors,
  Paintbrush,
  Trees,
  Theater,
} from "lucide-react";

export type Industry = {
  id: string;
  title: string;
  category: string;
  badge: string;
  icon: LucideIcon;
  img: string;
  roles: string;
  tasks: string[];
};

export const INDUSTRIES: Industry[] = [
  {
    id: "supermarket",
    title: "Supermarkets & Retail",
    category: "retail",
    badge: "Immediate Placement",
    icon: Store,
    img: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80",
    roles: "Shelf Stockers, Cashiers & Cart Handlers",
    tasks: ["Aisle restocking & facing", "Pallet breakdown & inventory", "Customer register checkout"],
  },
  {
    id: "restaurant",
    title: "Restaurants & Dining",
    category: "food",
    badge: "Same-Day Dispatch",
    icon: UtensilsCrossed,
    img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
    roles: "Line Prep, Dishwashers & Bussers",
    tasks: ["Commercial pot & dishwashing", "Line prep & vegetable chopping", "Dining room table turnover"],
  },
  {
    id: "petrol",
    title: "Petrol Stations",
    category: "retail",
    badge: "Day & Night Shifts",
    icon: Fuel,
    img: "https://images.unsplash.com/photo-1545459720-aac8509eb02c?auto=format&fit=crop&w=800&q=80",
    roles: "Pump Attendants & Station Staff",
    tasks: ["Full fuel pumping service", "Storefront cashiering & register", "Forecourt safety & cleanliness"],
  },
  {
    id: "warehouse",
    title: "Warehouses & Logistics",
    category: "logistics",
    badge: "Heavy Shift Hands",
    icon: Truck,
    img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
    roles: "Freight Handlers, Unloaders & Pickers",
    tasks: ["Container unloads & palletizing", "Pallet staging & cross-dock sorting", "Inventory staging by lane"],
  },
  {
    id: "cleaning",
    title: "Facilities & Janitorial",
    category: "maintenance",
    badge: "Sanitization Crews",
    icon: Sparkles,
    img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80",
    roles: "Commercial Cleaners & Sanitizers",
    tasks: ["Industrial floor scrubbing & buffing", "Restroom & kitchen sanitization", "Trash haul-out & dumpster staging"],
  },
  {
    id: "security",
    title: "Security & Storefront",
    category: "security",
    badge: "Verified Background",
    icon: ShieldCheck,
    img: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80",
    roles: "Access Control & Door Guards",
    tasks: ["Storefront presence & loss prevention", "Entrance verification & greeter", "Incident reporting & site safety"],
  },
  {
    id: "salons",
    title: "Salons & Personal Care",
    category: "services",
    badge: "Licensed Trades",
    icon: Scissors,
    img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
    roles: "Stylists, Barbers & Assistants",
    tasks: ["Hair cutting, styling & barbering", "Shampoo basin & station prep", "Sanitation & client reception"],
  },
  {
    id: "maintenance",
    title: "Painters & Handymen",
    category: "maintenance",
    badge: "Rapid Maintenance",
    icon: Paintbrush,
    img: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80",
    roles: "Shop Repair, Painting & Handymen",
    tasks: ["Interior painting & touchups", "Drywall patching & fixture mounts", "Rapid storefront carpentry fix"],
  },
  {
    id: "landscaping",
    title: "Landscaping & Grounds",
    category: "maintenance",
    badge: "Outdoor Grounds",
    icon: Trees,
    img: "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=800&q=80",
    roles: "Mower Crews & Turf Care",
    tasks: ["Commercial mowing & turf laying", "Debris clearing & branch removal", "Site grading & grounds cleanup"],
  },
  {
    id: "events",
    title: "Events & Staging",
    category: "services",
    badge: "Event Crews",
    icon: Theater,
    img: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
    roles: "Stagehands & Riggers",
    tasks: ["Trade show booth assembly", "Equipment load-in & load-out", "Tent erecting & crowd guidance"],
  },
];
