function TrendingBanner() {
  return (
    <div>
    <span className="relative inline-block">
      <span className="absolute inset-0 bg-indigo-800 opacity-10 transform"></span>
      <span className="relative z-10 text-3xl font-bold font-serif text-indigo-800 tracking-widest drop-shadow-md px-8 py-3 border-x-4 border-indigo-700 flex items-center">
      <svg
            className="w-6 h-6 ml-3 text-indigo-700"
            fill="currentColor"
            viewBox="0 0 20 20"
          ></svg>
        <span className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-700 bg-clip-text text-transparent">Current Trending</span>
        <svg
            className="w-6 h-6 ml-3 text-indigo-700"
            fill="currentColor"
            viewBox="0 0 20 20"
          ></svg>
      </span>
      <span className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-indigo-700 to-transparent"></span>
    </span>
  </div>
  )
}

export default TrendingBanner;



<svg
            className="w-6 h-6 ml-3 text-indigo-700"
            fill="currentColor"
            viewBox="0 0 20 20"
          ></svg>