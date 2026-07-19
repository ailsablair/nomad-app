import React, { useState } from 'react';
import { CORE_WEBSITES, OTHER_WEBSITES } from '../data';
import { Globe, ArrowUpRight, ShieldCheck, Zap, Info, ShieldAlert } from 'lucide-react';

export const WebsiteList: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'core' | 'other'>('core');

  const getCompetitionBadgeColor = (comp: string) => {
    switch (comp) {
      case 'Low':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/30';
      case 'Medium':
        return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/30';
      default:
        return 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/20 dark:text-rose-400 dark:border-rose-900/30';
    }
  };

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      {/* Tab Controls */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100 pb-4">
        <div>
          <h2 className="font-sans font-bold text-zinc-900 text-lg">Alternative Rental Directories</h2>
          <p className="text-xs text-zinc-500 mt-1">
            Carefully selected alternative networks with higher ratios of openings to seekers outside major metropolitan cores.
          </p>
        </div>
        <div className="flex bg-zinc-100 p-1 rounded-xl shrink-0">
          <button
            onClick={() => setActiveTab('core')}
            className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-semibold transition-all ${
              activeTab === 'core'
                ? 'bg-white text-zinc-950 shadow-sm'
                : 'text-zinc-500 hover:text-zinc-900'
            }`}
          >
            <Zap className="h-3.5 w-3.5" />
            <span>Core Unconventional (8)</span>
          </button>
          <button
            onClick={() => setActiveTab('other')}
            className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-semibold transition-all ${
              activeTab === 'other'
                ? 'bg-white text-zinc-950 shadow-sm'
                : 'text-zinc-500 hover:text-zinc-900'
            }`}
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>High-Applicant Advantage (25)</span>
          </button>
        </div>
      </div>

      {/* Info Notice */}
      <div className="mb-6 flex gap-3 rounded-xl bg-zinc-50 border border-zinc-150 p-4 text-xs text-zinc-600 leading-relaxed">
        <Info className="h-5 w-5 text-zinc-400 shrink-0 mt-0.5" />
        <div>
          {activeTab === 'core' ? (
            <p>
              <strong>Core Unconventional Networks:</strong> These websites focus exclusively on non-standard lease structures (monthly terms between 1 week and 1 year) and highly specific rustic accommodation typologies like fire lookouts, boats, and caretaker ranches.
            </p>
          ) : (
            <p>
              <strong>High-Advantage Rentals (Low Applicant Competition):</strong> These platforms avoid the high-competition algorithms of mainstream sites like Zumper or Apartments.com. They favor local owners, direct-landlord emails, and physical newspaper/forum boards, yielding a much higher response rate for applicants outside costly cities.
            </p>
          )}
        </div>
      </div>

      {/* Content Lists */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] border-collapse text-left">
          <thead>
            <tr className="border-b border-zinc-200 text-xs font-bold uppercase tracking-wider text-zinc-500">
              <th className="py-3 px-4 w-1/4">Website Name</th>
              <th className="py-3 px-4 w-2/5">Platform Description</th>
              <th className="py-3 px-4">Primary Focus</th>
              <th className="py-3 px-4">Rental Term</th>
              <th className="py-3 px-4 text-center">Applicant Competition</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 text-xs text-zinc-700">
            {(activeTab === 'core' ? CORE_WEBSITES : OTHER_WEBSITES).map((site) => (
              <tr key={site.id} className="hover:bg-zinc-50/50 transition-colors">
                {/* Name & URL Link */}
                <td className="py-4 px-4 font-semibold text-zinc-900">
                  <a
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 hover:text-emerald-600"
                  >
                    <Globe className="h-4 w-4 text-zinc-400 group-hover:text-emerald-500" />
                    <span>{site.name}</span>
                    <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </td>

                {/* Description */}
                <td className="py-4 px-4 text-zinc-600 leading-relaxed font-normal">
                  {site.description}
                </td>

                {/* Focus */}
                <td className="py-4 px-4 font-medium text-zinc-800">
                  {site.focus}
                </td>

                {/* Term */}
                <td className="py-4 px-4 font-mono text-zinc-500">
                  {site.avgTerm}
                </td>

                {/* Competition */}
                <td className="py-4 px-4 text-center">
                  <span className={`inline-block rounded-lg border px-2 py-1 font-semibold text-[10px] uppercase tracking-wide ${getCompetitionBadgeColor(site.competition)}`}>
                    {site.competition}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
