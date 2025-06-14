import React from 'react';
import { Music, Star } from 'lucide-react';
function TracksBanner() {
    return (
        <div>
        <span className="relative inline-block">
          <span className="absolute inset-0 bg-white opacity-10 transform rotate-1"></span>
          <span className="relative text-3xl font-bold font-serif text-indigo-900 tracking-widest drop-shadow-md px-8 py-3 border-x-4 flex items-center">
            <Music className="w-6 h-6 mr-3 text-white" />
            <span  className="drop-shadow-lg text-white">Tracks</span>
            <Music className="w-6 h-6 mr-3 text-white" />
          </span>
          <span className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent"></span>
        </span>
      </div>
    )
}

export default TracksBanner