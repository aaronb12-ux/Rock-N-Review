import React from 'react';
import { Star } from 'lucide-react';

export default function ReviewedBanner() {
  return (
    <div className="relative">
      <div className="inline-flex items-center gap-3 bg-slate-900 border-2 border-slate-700 rounded-lg px-6 py-3 shadow-lg">
        <Star className="w-6 h-6 text-slate-400" />
        <span className="text-2xl font-bold text-white tracking-wide">
          Reviewed
        </span>
        <Star className="w-6 h-6 text-slate-400" />
      </div>
    </div>
  )
}