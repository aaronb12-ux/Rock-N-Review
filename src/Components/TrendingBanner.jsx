import { TrendingUp } from 'lucide-react';

function TrendingBanner() {
  return (
    <div className="relative">
      <div className="inline-flex items-center gap-3 bg-slate-900 border-2 border-slate-700 rounded-lg px-6 py-3 shadow-lg">
        <TrendingUp className="w-6 h-6 text-slate-400" />
        <span className="text-2xl font-bold text-white tracking-wide">
          Currently Trending
        </span>
        <TrendingUp className="w-6 h-6 text-slate-400" />
      </div>
    </div>
  )
}

export default TrendingBanner;