export interface Listing {
  id: string;
  title: string;
  description: string;
  type: 'house_boat' | 'cabin' | 'tiny_home' | 'fire_watch_tower' | 'lighthouse' | 'trailer' | 'other';
  location: string;
  price: number; // monthly cost in USD/CAD
  availableDate: string; // YYYY-MM-DD
  bedrooms: number;
  bathrooms: number;
  bathroomType: 'indoor' | 'outdoor' | 'both';
  petFriendly: boolean;
  photoUrl: string;
  sourceUrl: string;
  sourceName: string;
  country: 'CA' | 'US';
  isAI?: boolean;
  groundingUrls?: string[];
}

export interface RentalWebsite {
  id: string;
  name: string;
  url: string;
  description: string;
  type: 'core' | 'other';
  avgTerm: string;
  focus: string;
  competition: 'Low' | 'Medium' | 'High' | 'Very Low';
}

export interface FilterState {
  dateAvailable: string;
  minPrice: number;
  maxPrice: number;
  bedrooms: number | 'any';
  bathroomType: 'indoor' | 'outdoor' | 'both' | 'any';
  bathroomsCount: number | 'any';
  petFriendly: boolean | 'any';
  accommodationTypes: string[]; // List of types selected, or empty for all
  includeUS: boolean;
}
