import React, { useState } from 'react';
import nomadLogo from './assets/images/nomad_logo_1784351891612.jpg';
import { UNCONVENTIONAL_LISTINGS } from './data';
import { Listing, FilterState } from './types';
import { ListingCard } from './components/ListingCard';
import { Filters } from './components/Filters';
import { WebsiteList } from './components/WebsiteList';
import { AISearchAssistant } from './components/AISearchAssistant';
import { Compass, Sparkles, SlidersHorizontal, Globe, Home, ShieldAlert } from 'lucide-react';

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

  const CONVERSION_RATE = 1.35; // 1 USD = 1.35 CAD
  const getDisplayPrice = (listing: Listing, displayCurrency: 'CAD' | 'USD') => {
    if (displayCurrency === 'CAD') {
      return listing.country === 'US' ? Math.round(listing.price * CONVERSION_RATE) : listing.price;
    } else {
      return listing.country === 'CA' ? Math.round(listing.price / CONVERSION_RATE) : listing.price;
    }
  };

  const handleResetFilters = () => {
    setFilters(initialFilters);
  };

  // Filter listings based on user selected filter states
  const filteredListings = UNCONVENTIONAL_LISTINGS.filter((listing) => {
    // 0. Country Filter (Canada by default)
    if (!filters.includeUS && listing.country !== 'CA') return false;

    // 1. Max price filter (filtered by displayed price)
    const displayPrice = getDisplayPrice(listing, currency);
    if (displayPrice > filters.maxPrice) return false;

    // 2. Bedrooms filter
    if (filters.bedrooms !== 'any' && listing.bedrooms < Number(filters.bedrooms)) return false;

    // 3. Bathrooms count filter
    if (filters.bathroomsCount !== 'any' && listing.bathrooms < Number(filters.bathroomsCount)) return false;

    // 4. Bathroom Type filter
    if (filters.bathroomType !== 'any' && listing.bathroomType !== filters.bathroomType) return false;

    // 5. Pet friendly filter
    if (filters.petFriendly !== 'any' && listing.petFriendly !== filters.petFriendly) return false;

    // 6. Accommodation Types filter
    if (filters.accommodationTypes.length > 0 && !filters.accommodationTypes.includes(listing.type)) return false;

    // 7. Date available filter
    if (filters.dateAvailable) {
      const filterDate = new Date(filters.dateAvailable);
      const listingDate = new Date(listing.availableDate);
      if (listingDate < filterDate) return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans antialiased selection:bg-emerald-100 selection:text-emerald-900">
      {/* Banner / Header */}
      <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between gap-4">
            {/* Logo / Brand - Moved to far left, and UR avatar removed */}
            <div className="flex items-center">
              <img src={nomadLogo} alt="Nomad Logo" className="h-16 w-auto object-contain" />
            </div>

            {/* Navigation Tabs */}
            <nav className="flex bg-zinc-100 p-1 rounded-xl">
              <button
                onClick={() => setActiveTab('curated')}
                className={`flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-xs font-semibold transition-all ${
                  activeTab === 'curated'
                    ? 'bg-white text-zinc-950 shadow-sm'
                    : 'text-zinc-500 hover:text-zinc-900'
                }`}
              >
                <Home className="h-4 w-4" />
                <span className="hidden sm:inline">Browse Curated</span>
              </button>
              <button
                onClick={() => setActiveTab('ai_search')}
                className={`flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-xs font-semibold transition-all ${
                  activeTab === 'ai_search'
                    ? 'bg-white text-zinc-950 shadow-sm'
                    : 'text-zinc-500 hover:text-zinc-900'
                }`}
              >
                <Sparkles className="h-4 w-4 text-emerald-500" />
                <span>AI Grounding Search</span>
              </button>
              <button
                onClick={() => setActiveTab('directories')}
                className={`flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-xs font-semibold transition-all ${
                  activeTab === 'directories'
                    ? 'bg-white text-zinc-950 shadow-sm'
                    : 'text-zinc-500 hover:text-zinc-900'
                }`}
              >
                <Globe className="h-4 w-4" />
                <span className="hidden sm:inline">Alternative Directories</span>
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        
        {/* TAB 1: CURATED DIRECTORY */}
        {activeTab === 'curated' && (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
            {/* Filters Sidebar */}
            {isFiltersExpanded && (
              <div className="lg:col-span-1">
                <Filters
                  filters={filters}
                  onChange={setFilters}
                  onReset={handleResetFilters}
                />
              </div>
            )}

            <div className={isFiltersExpanded ? "lg:col-span-3" : "lg:col-span-4"}>
              <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setIsFiltersExpanded(!isFiltersExpanded)}
                    className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-xs font-semibold text-zinc-900 hover:bg-zinc-50 shadow-sm"
                  >
                    <SlidersHorizontal className="h-4 w-4" />
                    {isFiltersExpanded ? 'Hide Filters' : 'Show Filters'}
                  </button>
                  <div>
                    <p className="text-zinc-900 font-bold text-xl">
                      {filteredListings.length} Unconventional Stays Available
                    </p>
                  </div>
                </div>

                {/* Currency Selector Toggle */}
                <div className="flex items-center gap-1 bg-zinc-100 p-1 rounded-xl border border-zinc-200 self-start sm:self-center shrink-0 animate-fade-in">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider px-2 select-none">
                    Currency
                  </span>
                  <button
                    onClick={() => setCurrency('CAD')}
                    className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-all ${
                      currency === 'CAD'
                        ? 'bg-white text-zinc-950 shadow-sm'
                        : 'text-zinc-500 hover:text-zinc-900'
                    }`}
                  >
                    🇨🇦 CAD
                  </button>
                  <button
                    onClick={() => setCurrency('USD')}
                    className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-all ${
                      currency === 'USD'
                        ? 'bg-white text-zinc-950 shadow-sm'
                        : 'text-zinc-500 hover:text-zinc-900'
                    }`}
                  >
                    🇺🇸 USD
                  </button>
                </div>
              </div>

              {filteredListings.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-200 bg-white p-16 text-center">
                  <div className="rounded-full bg-zinc-50 p-4 mb-4">
                    <SlidersHorizontal className="h-8 w-8 text-zinc-400" />
                  </div>
                  <h3 className="text-sm font-semibold text-zinc-800">No matching properties found</h3>
                  <p className="text-xs text-zinc-500 mt-1 max-w-xs leading-relaxed">
                    Try adjusting your filters, expanding your price range, or clearing accommodation type checkboxes to find more options.
                  </p>
                  <button
                    onClick={handleResetFilters}
                    className="mt-4 rounded-xl bg-zinc-900 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-600 transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredListings.map((listing) => (
                    <ListingCard key={listing.id} listing={listing} displayCurrency={currency} />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: AI GROUNDED SEARCH */}
        {activeTab === 'ai_search' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-6">
              <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">AI-Powered Live Grounding</h2>
              <p className="text-xs text-zinc-500 mt-1.5 leading-relaxed">
                Connect directly to Google Web Search or Google Maps caches. Query for obscure lookouts, boat docks, or tiny home clusters in real-time.
              </p>
            </div>
            <AISearchAssistant displayCurrency={currency} />
          </div>
        )}

        {/* TAB 3: ALTERNATIVE DIRECTORIES */}
        {activeTab === 'directories' && (
          <div className="space-y-8">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">High-Advantage Networks</h2>
              <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                These platforms bypass metropolitan algorithmic clusters, linking direct to countryside listings, caretakers networks, and agricultural holdings.
              </p>
            </div>
            <WebsiteList />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-zinc-200 bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 text-center text-xs text-zinc-500 sm:px-6 lg:px-8 font-medium">
          <p>© 2026 Unconventional Rentals Aggregator. Built to assist relocation outside high-cost urban regions.</p>
          <p className="mt-2 text-[11px] text-zinc-400">All outbound references connect directly to owner and applicant portals.</p>
        </div>
      </footer>
    </div>
  );
}
