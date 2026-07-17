import React from 'react';
import { Listing } from '../types';
import { MapPin, Bed, Bath, Dog, ArrowUpRight, Sparkles, AlertCircle } from 'lucide-react';

interface ListingCardProps {
  listing: Listing;
  displayCurrency?: 'CAD' | 'USD';
}

export const ListingCard: React.FC<ListingCardProps> = ({ listing, displayCurrency = 'CAD' }) => {
  const [imgError, setImgError] = React.useState(!listing.photoUrl);

  const CONVERSION_RATE = 1.35; // 1 USD = 1.35 CAD

  let displayPrice = listing.price;
  if (displayCurrency === 'CAD') {
    if (listing.country === 'US') {
      displayPrice = Math.round(listing.price * CONVERSION_RATE);
    }
  } else { // displayCurrency === 'USD'
    if (listing.country === 'CA') {
      displayPrice = Math.round(listing.price / CONVERSION_RATE);
    }
  }

  // Map internal types to user-friendly titles
  const typeLabels: Record<string, string> = {
    house_boat: 'Houseboat',
    cabin: 'Cabin',
    tiny_home: 'Tiny Home',
    fire_watch_tower: 'Fire Watch Tower',
    lighthouse: 'Lighthouse',
    trailer: 'Vintage Trailer',
    other: 'Unique Stay'
  };

  const getBathroomTypeText = (type: string) => {
    if (type === 'both') return 'Indoor/Outdoor Baths';
    if (type === 'outdoor') return 'Outdoor Bath Only';
    return 'Indoor Bath Only';
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative aspect-video w-full overflow-hidden bg-zinc-100 flex items-center justify-center">
        {!imgError ? (
          <img
            src={listing.photoUrl}
            alt={listing.title}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex flex-col items-center justify-center gap-1.5 text-zinc-400 p-4 select-none">
            <span className="text-3xl">📷</span>
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">No Photo Available</span>
          </div>
        )}
        
        {/* Accommodation Type Badge */}
        <span className="absolute top-3 left-3 rounded-lg bg-zinc-950/80 px-2.5 py-1 text-xs font-semibold tracking-wide text-white backdrop-blur-sm">
          {typeLabels[listing.type] || 'Unique Stay'}
        </span>

        {/* AI Grounded Sparkle Badge */}
        {listing.isAI && (
          <span className="absolute top-3 right-3 flex items-center gap-1 rounded-lg bg-emerald-500 px-2.5 py-1 text-xs font-semibold text-white shadow-sm">
            <Sparkles className="h-3.5 w-3.5" />
            <span>AI Real-time</span>
          </span>
        )}

        {/* Country Badge */}
        <span className="absolute bottom-3 right-3 rounded-lg bg-white/95 px-2 py-0.5 text-[11px] font-bold text-zinc-800 backdrop-blur-sm flex items-center gap-1 shadow-sm border border-zinc-150">
          <span>{listing.country === 'CA' ? '🇨🇦' : '🇺🇸'}</span>
          <span>{listing.country === 'CA' ? 'Canada' : 'USA'}</span>
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className="font-sans font-semibold text-base text-zinc-900 group-hover:text-emerald-600 transition-colors line-clamp-1">
            {listing.title}
          </h3>
          <div className="text-right shrink-0">
            <span className="font-mono text-lg font-bold text-zinc-950">${displayPrice}</span>
            <span className="text-xs text-zinc-500 font-medium">/mo {displayCurrency}</span>
          </div>
        </div>

        {/* Location */}
        <div className="mb-3 flex items-center gap-1 text-xs text-zinc-500">
          <MapPin className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
          <span className="truncate">{listing.location}</span>
        </div>

        {/* Description */}
        <p className="mb-4 text-xs leading-relaxed text-zinc-600 line-clamp-2">
          {listing.description}
        </p>

        {/* Specs Row */}
        <div className="mt-auto grid grid-cols-2 gap-y-2 gap-x-4 border-t border-zinc-100 pt-4 pb-4 text-xs text-zinc-600 font-medium">
          <div className="flex items-center gap-2">
            <Bed className="h-4 w-4 text-zinc-400 shrink-0" />
            <span>{listing.bedrooms} {listing.bedrooms === 1 ? 'Bed' : 'Beds'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Bath className="h-4 w-4 text-zinc-400 shrink-0" />
            <span className="truncate" title={getBathroomTypeText(listing.bathroomType)}>
              {listing.bathrooms} {listing.bathrooms === 1 ? 'Bath' : 'Baths'} ({listing.bathroomType})
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Dog className="h-4 w-4 text-zinc-400 shrink-0" />
            <span className={listing.petFriendly ? "text-emerald-600 font-semibold" : "text-zinc-500"}>
              {listing.petFriendly ? 'Pet Friendly' : 'No Pets'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-zinc-400 shrink-0" />
            <span className="truncate">Available {listing.availableDate}</span>
          </div>
        </div>

        {/* Outbound Button Link */}
        <a
          href={listing.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 py-2.5 px-4 text-xs font-semibold text-white transition-all duration-200 hover:bg-emerald-600 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        >
          <span>Apply on {listing.sourceName}</span>
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
};
