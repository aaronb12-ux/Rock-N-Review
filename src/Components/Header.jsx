import { Search, Library, User, Music } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

function Header({accessToken, currentSearch}) {
  const [searchInput, setSearchInput] = useState(currentSearch);
  const [isExpanded, setIsExpanded] = useState(false);
  let navigate = useNavigate()
  

  const routeChangeAlbum = () => {
    if (searchInput.trim()){
      navigate(`/search?album=${encodeURIComponent(searchInput)}`, {
        state: {accessToken, searchInput}
      })
    }
  };

  const routeChangeSaved = () => {
    navigate('/saved', {
      state: {searchInput}
    })
  }

  const routeChangeHome = () => {
    navigate('/Homepage', {
      state: {searchInput}
    })
  }

  const routeChangeReviewed = () => {
    navigate('/reviewed')
  }
 
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className={`sticky top-0 z-20 w-full transition-all duration-300 ${
      scrolled 
        ? "bg-gradient-to-r from-indigo-950 to-indigo-800 shadow-lg py-2" 
        : "bg-gradient-to-r from-indigo-950/95 to-indigo-800/95 backdrop-blur-md py-4"
    } border-b border-indigo-600/50`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6">
        <div className="flex items-center space-x-3 group">
          <div className="relative w-10 h-10">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-300 to-indigo-400 rounded-full shadow-lg group-hover:shadow-indigo-300/20"></div>
            <div className="absolute inset-1 bg-gradient-to-br from-indigo-950 to-indigo-800 rounded-full"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-2 w-2 rounded-full bg-indigo-300 group-hover:scale-110 transition-transform"></div>
            </div>
            <div className="absolute inset-0 border-4 border-indigo-300/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
          <div
          
          >
             <span className="text-3xl font-bold font-serif text-indigo-100 tracking-widest drop-shadow-md">
              <button
              className="cursor-pointer"
              onClick={routeChangeHome}
              >
              Album Adventures
              </button>
              
              </span> 
            <div className="h-0.5 w-0 bg-gradient-to-r from-indigo-300 to-transparent group-hover:w-full transition-all duration-500"></div>
          </div>
        </div>

        <div className={`relative transition-all duration-300 ease-in-out w-64 ${isExpanded ? "scale-105" : ""}`}>
          <input
            className="w-full px-5 py-2.5 rounded-full bg-indigo-900/40 border border-indigo-600/50 text-indigo-100 placeholder-indigo-400/70 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent shadow-inner"
            placeholder="Search for records..."
            
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            onBlur={() => setIsExpanded(false)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                routeChangeAlbum();
              }
            }}
          />
          <button
            onClick={routeChangeAlbum}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-indigo-400 hover:text-indigo-300 transition-colors focus:outline-none cursor-pointer"
          >
            <Search className="h-5 w-5" />
          </button>
        </div>

        <div className="flex items-center space-x-3 cursor-pointer">
          
          <button className="group relative overflow-hidden px-4 py-2.5 rounded-md transition-all duration-300 text-indigo-100 hover:text-white shadow-md hover:shadow-indigo-600/20 focus:outline-none border border-indigo-700/50 cursor-pointer"
          onClick={routeChangeReviewed}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-indigo-600 to-indigo-700 transition-opacity duration-300"></div>
            <div className="relative flex items-center space-x-2">
              <Library className="h-4 w-4" />
              <span className="font-serif text-sm tracking-wide">Reviewed</span>
            </div>
          </button>
          
          <button className="group relative overflow-hidden px-4 py-2.5 rounded-md transition-all duration-300 text-indigo-100 hover:text-white shadow-md hover:shadow-indigo-600/20 focus:outline-none border border-indigo-700/50"
          onClick={routeChangeSaved}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-indigo-600 to-indigo-700 transition-opacity duration-300 cursor-pointer"></div>
            <div className="relative flex items-center space-x-2 cursor-pointer">
              <Music className="h-4 w-4" />
              <span className="font-serif text-sm tracking-wide">Saved</span>
            </div>
          </button>
          
          <button className="group relative overflow-hidden px-4 py-2.5 rounded-md transition-all duration-300 text-indigo-100 hover:text-white shadow-md hover:shadow-indigo-600/20 focus:outline-none border border-indigo-700/50">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-indigo-600 to-indigo-700 transition-opacity duration-300"></div>
            <div className="relative flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span className="font-serif text-sm tracking-wide">Account</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;