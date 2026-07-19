import React, { useState } from 'react';
import nomadLogo from '@/assets/images/nomad_logo_1784351891612.jpg';
import { UNCONVENTIONAL_LISTINGS } from '@/data';
import { Listing, FilterState } from '@/types';
import { ListingCard } from '@/components/ListingCard';
import { Filters } from '@/components/Filters';
import { WebsiteList } from '@/components/WebsiteList';
import { AISearchAssistant } from '@/components/AISearchAssistant';
import { Sparkles, Globe, Home, SlidersHorizontal } from 'lucide-react';

const initialFilters: FilterState = {
  dateAvailable: '',
  minPrice: 500,
  maxPrice: 2000,
  bedrooms: 'any',
  bathroomType: 'any',
  bathroomsCount: 'any',
  petFriendly: 'any',
  accommodationTypes: [],
  includeUS: false
};

export default function App() {
  const [activeTab, setActiveTab] = useState<'curated' | 'ai_search' | 'directories'>('curated');
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [currency, setCurrency] = useState<'CAD' | 'USD'>('CAD');
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(true);

  const CONVERSION_RATE = 1.35;
  const getDisplayPrice = (listing: Listing, displayCurrency: 'CAD' | 'USD') => {
    if (displayCurrency === 'CAD') {
      return listing.country === 'US' ? Math.round(listing.price * CONVERSION_RATE) : listing.price;
    } else {
      return listing.country === 'CA' ? Math.round(listing.price / CONVERSION_RATE) : listing.price;
    }
  };

  const handleResetFilters = () => setFilters(initialFilters);

  const filteredListings = UNCONVENTIONAL_LISTINGS.filter((listing) => {
    if (!filters.includeUS && listing.country !== 'CA') return false;
    const displayPrice = getDisplayPrice(listing, currency);
    if (displayPrice > filters.maxPrice) return false;
    if (filters.bedrooms !== 'any' && listing.bedrooms < Number(filters.bedrooms)) return false;
    if (filters.bathroomsCount !== 'any' && listing.bathrooms < Number(filters.bathroomsCount)) return false;
    if (filters.bathroomType !== 'any' && listing.bathroomType !== filters.bathroomType) return false;
    if (filters.petFriendly !== 'any' && listing.petFriendly !== filters.petFriendly) return false;
    if (filters.accommodationTypes.length > 0 && !filters.accommodationTypes.includes(listing.type)) return false;
    if (filters.dateAvailable) {
      const filterDate = new Date(filters.dateAvailable);
      const listingDate = new Date(listing.availableDate);
      if (listingDate < filterDate) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans antialiased">
      <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <img src={nomadLogo} alt="Nomad Logo" className="h-16 w-auto object-contain" />
            <nav className="flex bg-zinc-100 p-1 rounded-xl">
              <button onClick={() => setActiveTab('curated')} className={`px-4 py-2.5 rounded-lg text-xs font-semibold ${activeTab === 'curated' ? 'bg-white shadow-sm' : ''}`}>
                <Home className="inline h-4 w-4 mr-1.5" /> Browse Curated
              </button>
              <button onClick={() => setActiveTab('ai_search')} className={`px-4 py-2.5 rounded-lg text-xs font-semibold ${activeTab === 'ai_search' ? 'bg-white shadow-sm' : ''}`}>
                <Sparkles className="inline h-4 w-4 mr-1.5 text-emerald-500" /> AI Grounding
              </button>
              <button onClick={() => setActiveTab('directories')} className={`px-4 py-2.5 rounded-lg text-xs font-semibold ${activeTab === 'directories' ? 'bg-white shadow-sm' : ''}`}>
                <Globe className="inline h-4 w-4 mr-1.5" /> Directories
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {activeTab === 'curated' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {isFiltersExpanded && <div className="lg:col-span-1"><Filters filters={filters} onChange={setFilters} onReset={handleResetFilters} /></div>}
            <div className={isFiltersExpanded ? "lg:col-span-3" : "lg:col-span-4"}>
              <button onClick={() => setIsFiltersExpanded(!isFiltersExpanded)} className="mb-4 text-xs font-semibold flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4" /> {isFiltersExpanded ? 'Hide Filters' : 'Show Filters'}
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredListings.map((l) => <ListingCard key={l.id} listing={l} displayCurrency={currency} />)}
              </div>
            </div>
          </div>
        )}
        {activeTab === 'ai_search' && <AISearchAssistant displayCurrency={currency} />}
        {activeTab === 'directories' && <WebsiteList />}
      </main>
    </div>
  );
}
