import React, { useState } from 'react';
import { Listing } from '../types';
import { ListingCard } from './ListingCard';
import { Sparkles, Search, Compass, MapPin, AlertCircle, ArrowUpRight, Globe, Loader2 } from 'lucide-react';

interface GroundingLink {
  title: string;
  url: string;
}

interface AISearchAssistantProps {
  displayCurrency?: 'CAD' | 'USD';
}

export const AISearchAssistant: React.FC<AISearchAssistantProps> = ({ displayCurrency = 'CAD' }) => {
  const [query, setQuery] = useState('');
  const [tool, setTool] = useState<'search' | 'maps'>('search');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [aiListings, setAiListings] = useState<Listing[]>([]);
  const [mapsText, setMapsText] = useState<string>('');
  const [groundingLinks, setGroundingLinks] = useState<GroundingLink[]>([]);
  const [searched, setSearched] = useState(false);

  const sampleQueries = [
    { text: 'Cabins in Kootenay BC under $1500', tool: 'search' as const },
    { text: 'Houseboats for monthly rent in Okanagan lakes', tool: 'search' as const },
    { text: 'Unique tiny homes outside Calgary near forests', tool: 'maps' as const },
    { text: 'Decommissioned lookouts or towers in British Columbia', tool: 'search' as const }
  ];

  const handleSearch = async (searchQuery: string, searchTool: 'search' | 'maps') => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    setError(null);
    setSearched(true);
    setAiListings([]);
    setMapsText('');
    setGroundingLinks([]);

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: searchQuery, tool: searchTool }),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || 'Failed to retrieve AI grounded listings.');
      }

      if (searchTool === 'search') {
        setAiListings(data.listings || []);
      } else {
        setMapsText(data.text || '');
      }
      setGroundingLinks(data.links || []);

    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred while connecting to the Gemini Grounding Engine.');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(query, tool);
  };

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
          <Sparkles className="h-5 w-5 animate-pulse" />
        </div>
        <div>
          <h2 className="font-sans font-bold text-zinc-900 text-base flex items-center gap-2">
            <span>Gemini Real-time Grounding Assistant</span>
          </h2>
          <p className="text-xs text-zinc-500 mt-0.5">
            Retrieve live, unconventional rentals using Google Search and Google Maps.
          </p>
        </div>
      </div>

      {/* Form block */}
      <form onSubmit={onSubmit} className="space-y-4">
        {/* Tool selector */}
        <div className="flex gap-4 p-1 bg-zinc-100 rounded-xl max-w-md">
          <button
            type="button"
            onClick={() => setTool('search')}
            className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold transition-all ${
              tool === 'search' ? 'bg-white text-zinc-950 shadow-sm' : 'text-zinc-500 hover:text-zinc-900'
            }`}
          >
            <Globe className="h-3.5 w-3.5" />
            <span>Google Search</span>
          </button>
          <button
            type="button"
            onClick={() => setTool('maps')}
            className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold transition-all ${
              tool === 'maps' ? 'bg-white text-zinc-950 shadow-sm' : 'text-zinc-500 hover:text-zinc-900'
            }`}
          >
            <MapPin className="h-3.5 w-3.5" />
            <span>Google Maps</span>
          </button>
        </div>

        {/* Input Bar */}
        <div className="relative flex items-center rounded-2xl border border-zinc-200 bg-white shadow-sm focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500 overflow-hidden">
          <div className="pl-4 text-zinc-400 shrink-0">
            <Search className="h-5 w-5" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              tool === 'search'
                ? 'Search Google for: "houseboats on Okanagan Lake under $1800"'
                : 'Search Maps for: "Tiny homes or cabins near Nelson British Columbia"'
            }
            className="w-full bg-transparent py-4 px-3 text-sm text-zinc-800 outline-none placeholder-zinc-400"
          />
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="mr-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-semibold text-white transition-all hover:bg-emerald-700 disabled:bg-zinc-100 disabled:text-zinc-400"
          >
            {loading ? (
              <span className="flex items-center gap-1.5">
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                <span>Grounding...</span>
              </span>
            ) : (
              <span>Search</span>
            )}
          </button>
        </div>

        {/* Sample queries */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Try these:</span>
          {sampleQueries.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setQuery(item.text);
                setTool(item.tool);
                handleSearch(item.text, item.tool);
              }}
              className="rounded-lg bg-zinc-50 border border-zinc-200 px-3 py-1.5 text-xs text-zinc-600 hover:bg-zinc-100 transition-all font-medium"
            >
              {item.text}
            </button>
          ))}
        </div>
      </form>

      {/* Output Panel */}
      {searched && (
        <div className="mt-8 border-t border-zinc-150 pt-6">
          {loading && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Loader2 className="h-8 w-8 text-emerald-500 animate-spin mb-3" />
              <p className="text-sm font-semibold text-zinc-800">Gemini is searching the live web...</p>
              <p className="text-xs text-zinc-400 mt-1">Grounding models with live Google search indexes and maps caches.</p>
            </div>
          )}

          {error && (
            <div className="flex gap-3 rounded-xl bg-rose-50 border border-rose-100 p-4 text-xs text-rose-700">
              <AlertCircle className="h-5 w-5 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold">Grounding API Error</h4>
                <p className="mt-1 leading-relaxed">{error}</p>
                <p className="mt-2 text-zinc-500 font-medium">Please ensure the Gemini API key is configured correctly in the AI Studio panel.</p>
              </div>
            </div>
          )}

          {!loading && !error && (
            <div className="space-y-6">
              {/* Tool: Google Search Structured Listings */}
              {tool === 'search' && (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-4 flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-emerald-500" />
                    <span>Real-time Structured Listings Found</span>
                  </h3>
                  
                  {aiListings.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-zinc-200 p-8 text-center text-xs text-zinc-400">
                      No matching listings were found. Try a different query or location.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {aiListings.map((listing) => (
                        <ListingCard key={listing.id} listing={listing} displayCurrency={displayCurrency} />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Tool: Google Maps Geography */}
              {tool === 'maps' && mapsText && (
                <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-5 space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                    <Compass className="h-3.5 w-3.5 text-emerald-500" />
                    <span>Google Maps Grounding Analysis</span>
                  </h3>
                  <div className="prose prose-sm max-w-none text-zinc-700 text-xs leading-relaxed space-y-2 whitespace-pre-line font-medium">
                    {mapsText}
                  </div>
                </div>
              )}

              {/* Grounding Source Links (REQUIRED) */}
              {groundingLinks.length > 0 && (
                <div className="bg-zinc-50 border border-zinc-150 rounded-xl p-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-3">
                    References & Grounding Citations
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {groundingLinks.map((link, idx) => (
                      <a
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-2 bg-white rounded-lg border border-zinc-200 hover:border-emerald-500 text-zinc-700 hover:text-zinc-950 transition-colors font-medium"
                      >
                        <span className="truncate max-w-[200px]">{link.title}</span>
                        <ArrowUpRight className="h-3.5 w-3.5 text-zinc-400 shrink-0 ml-2" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
