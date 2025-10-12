import { User } from 'lucide-react';

const AccountBanner = () => {
    return (
        <div className="relative">
          <div className="inline-flex items-center gap-3 bg-slate-900 border-2 border-slate-700 rounded-lg px-6 py-3 shadow-lg">
            <User className="w-6 h-6 text-slate-400" />
            <span className="text-2xl font-bold text-white tracking-wide">
              Account Info
            </span>
            <User className="w-6 h-6 text-slate-400" />
          </div>
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3/4 h-0.5 bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
        </div>
    )
}

export default AccountBanner