export default function SavedBanner() {

    return (
        <div>
            <span className="relative inline-block">
        <span className="absolute inset-0 bg-amber-800 opacity-10 transform rotate-1"></span>
        <span className="relative z-10 text-3xl font-bold font-serif text-amber-800 tracking-widest drop-shadow-md px-8 py-3 border-x-4 border-amber-700 flex items-center">
          <svg className="w-6 h-6 mr-3 text-amber-700" fill="currentColor" viewBox="0 0 20 20">
            <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
          </svg>
          <span className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-700 bg-clip-text text-transparent">Saved</span>
          <svg className="w-6 h-6 ml-3 text-amber-700" fill="currentColor" viewBox="0 0 20 20">
            <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
          </svg>
        </span>
        <span className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-700 to-transparent"></span>
      </span>
        </div>
    )
}

