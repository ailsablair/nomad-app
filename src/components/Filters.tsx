import React from 'react';
import { FilterState } from '../types';
import { SlidersHorizontal, RotateCcw, Calendar, DollarSign, Bed, Bath, Shield, Layers } from 'lucide-react';

interface FiltersProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
}

export const Filters: React.FC<FiltersProps> = ({ filters, onChange, onReset }) => {
  const accommodationTypes = [
    { value: 'cabin', label: 'Cabins' },
    { value: 'tiny_home', label: 'Tiny Homes' },
    { value: 'house_boat', label: 'Houseboats' },
    { value: 'fire_watch_tower', label: 'Fire Lookouts' },
    { value: 'lighthouse', label: 'Lighthouses' },
    { value: 'trailer', label: 'Trailers' },
    { value: 'other', label: 'Other Unique' }
  ];

  const handleTypeToggle = (type: string) => {
    const isSelected = filters.accommodationTypes.includes(type);
    const updatedTypes = isSelected
      ? filters.accommodationTypes.filter((t) => t !== type)
      : [...filters.accommodationTypes, type];
    onChange({ ...filters, accommodationTypes: updatedTypes });
  };

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 lg:sticky lg:top-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between border-b border-zinc-100 pb-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-zinc-900" />
          <h2 className="font-sans font-semibold text-zinc-900 text-sm">Search Filters</h2>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-emerald-600 transition-colors"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Reset</span>
        </button>
      </div>

      <div className="space-y-6">
        {/* Target Region */}
        <div className="border-b border-zinc-150 pb-5">
          <label className="mb-2.5 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500">
            <span>🌐</span>
            <span>Target Region</span>
          </label>
          <div className="space-y-2.5">
            <label className="flex items-center gap-2.5 text-xs text-zinc-800 cursor-pointer">
              <input
                type="radio"
                name="region"
                checked={!filters.includeUS}
                onChange={() => onChange({ ...filters, includeUS: false })}
                className="h-4.5 w-4.5 border-zinc-300 text-emerald-600 focus:ring-emerald-500 accent-emerald-600"
              />
              <span className="font-semibold">Canada Only 🇨🇦</span>
            </label>
            <label className="flex items-center gap-2.5 text-xs text-zinc-800 cursor-pointer">
              <input
                type="radio"
                name="region"
                checked={filters.includeUS}
                onChange={() => onChange({ ...filters, includeUS: true })}
                className="h-4.5 w-4.5 border-zinc-300 text-emerald-600 focus:ring-emerald-500 accent-emerald-600"
              />
              <span className="font-semibold">Include United States 🇺🇸</span>
            </label>
            {!filters.includeUS ? (
              <p className="mt-1.5 rounded-lg bg-emerald-50/50 border border-emerald-100 p-2 text-[10px] leading-relaxed text-emerald-800 font-medium">
                ✅ Showing only Canadian listings that do not require an international visa.
              </p>
            ) : (
              <p className="mt-1.5 rounded-lg bg-amber-50 border border-amber-100 p-2 text-[10px] leading-relaxed text-amber-800 font-medium">
                ⚠️ Note: US stays require a valid US visa or work permit for Canadian residents.
              </p>
            )}
          </div>
        </div>

        {/* Date Available */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500">
            <Calendar className="h-3.5 w-3.5 text-zinc-400" />
            <span>Date Available From</span>
          </label>
          <input
            type="date"
            value={filters.dateAvailable}
            onChange={(e) => onChange({ ...filters, dateAvailable: e.target.value })}
            className="w-full rounded-xl border border-zinc-200 px-3.5 py-2 text-xs text-zinc-700 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
          />
        </div>

        {/* Cost Range */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500">
            <DollarSign className="h-3.5 w-3.5 text-zinc-400" />
            <span>Monthly Cost (Max)</span>
          </label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="500"
              max="3000"
              step="50"
              value={filters.maxPrice}
              onChange={(e) => onChange({ ...filters, maxPrice: Number(e.target.value) })}
              className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-zinc-200 accent-emerald-600"
            />
            <span className="font-mono text-xs font-bold text-zinc-800 shrink-0 w-12 text-right">
              ${filters.maxPrice}
            </span>
          </div>
        </div>

        {/* Bedrooms */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500">
            <Bed className="h-3.5 w-3.5 text-zinc-400" />
            <span>Minimum Bedrooms</span>
          </label>
          <div className="grid grid-cols-4 gap-1.5">
            {['any', 1, 2, 3].map((val) => {
              const isSelected = filters.bedrooms === val;
              return (
                <button
                  key={val}
                  type="button"
                  onClick={() => onChange({ ...filters, bedrooms: val as any })}
                  className={`rounded-lg py-1.5 text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-zinc-950 text-white'
                      : 'bg-zinc-50 text-zinc-700 border border-zinc-200 hover:bg-zinc-100'
                  }`}
                >
                  {val === 'any' ? 'Any' : `${val}+`}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bathrooms count */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500">
            <Bath className="h-3.5 w-3.5 text-zinc-400" />
            <span>Minimum Bathrooms</span>
          </label>
          <div className="grid grid-cols-4 gap-1.5">
            {['any', 1, 2].map((val) => {
              const isSelected = filters.bathroomsCount === val;
              return (
                <button
                  key={val}
                  type="button"
                  onClick={() => onChange({ ...filters, bathroomsCount: val as any })}
                  className={`rounded-lg py-1.5 text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-zinc-950 text-white'
                      : 'bg-zinc-50 text-zinc-700 border border-zinc-200 hover:bg-zinc-100'
                  }`}
                >
                  {val === 'any' ? 'Any' : `${val}+`}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bathrooms Location type */}
        <div>
          <label className="mb-2.5 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500">
            <Shield className="h-3.5 w-3.5 text-zinc-400" />
            <span>Bathroom Type</span>
          </label>
          <div className="flex flex-col gap-2">
            {[
              { value: 'any', label: 'Any Bathroom' },
              { value: 'indoor', label: 'Indoor Bathroom Only' },
              { value: 'outdoor', label: 'Outdoor Bathroom Only' },
              { value: 'both', label: 'Both Indoor & Outdoor' }
            ].map((option) => (
              <label key={option.value} className="flex items-center gap-2 text-xs text-zinc-700 cursor-pointer">
                <input
                  type="radio"
                  name="bathroomType"
                  value={option.value}
                  checked={filters.bathroomType === option.value}
                  onChange={() => onChange({ ...filters, bathroomType: option.value as any })}
                  className="h-4.5 w-4.5 rounded-full border-zinc-300 text-emerald-600 focus:ring-emerald-500 accent-emerald-600"
                />
                <span className="font-medium">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Pet Friendly */}
        <div>
          <label className="mb-2.5 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500">
            <span className="text-zinc-400">🐶</span>
            <span>Pet Friendly</span>
          </label>
          <div className="flex items-center gap-4">
            {[
              { value: 'any', label: 'Any' },
              { value: true, label: 'Allowed' }
            ].map((option) => {
              const isSelected = filters.petFriendly === option.value;
              return (
                <button
                  key={option.value.toString()}
                  type="button"
                  onClick={() => onChange({ ...filters, petFriendly: option.value as any })}
                  className={`flex-1 rounded-lg py-2 text-xs font-semibold transition-all border ${
                    isSelected
                      ? 'bg-emerald-500 text-white border-emerald-500 shadow-sm'
                      : 'bg-zinc-50 text-zinc-700 border-zinc-200 hover:bg-zinc-100'
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Types of Accommodation */}
        <div>
          <label className="mb-3.5 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500">
            <Layers className="h-3.5 w-3.5 text-zinc-400" />
            <span>Accommodation Types</span>
          </label>
          <div className="space-y-2">
            {accommodationTypes.map((type) => {
              const isChecked = filters.accommodationTypes.includes(type.value);
              return (
                <label key={type.value} className="flex items-center gap-2.5 text-xs text-zinc-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleTypeToggle(type.value)}
                    className="h-4 w-4 rounded border-zinc-300 text-emerald-600 focus:ring-emerald-500 accent-emerald-600"
                  />
                  <span className="font-medium">{type.label}</span>
                </label>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
