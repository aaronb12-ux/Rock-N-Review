import { Search, Library, User, Music, Menu } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

function Header({ currentSearch }) {
  const [searchInput, setSearchInput] = useState(currentSearch);
  const [isExpanded, setIsExpanded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const routeChangeAlbum = () => {
    if (searchInput.trim()) {
      navigate(`/search?album=${encodeURIComponent(searchInput)}`, {
        state: { searchInput }
      });
    }
  };

  const routeChangeSaved = () => navigate('/saved', { state: { searchInput } });
  const routeChangeHome = () => navigate('/Homepage', { state: { searchInput } });
  const routeChangeReviewed = () => navigate('/reviewed', { state: { searchInput } });
  const routeChangeAccount = () => navigate('/account', { state: { searchInput } });

  return (
    <div className={`sticky top-0 z-20 w-full transition-all duration-300 ${
      scrolled
        ? "bg-gradient-to-r from-indigo-950 to-indigo-800 shadow-lg py-2"
        : "bg-gradient-to-r from-indigo-950/95 to-indigo-800/95 backdrop-blur-md py-4"
    } border-b border-indigo-600/50`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6">
        {/* Logo + Title */}
        <div className="flex items-center space-x-3 group">
          <div className="relative w-10 h-10">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-300 to-indigo-400 rounded-full shadow-lg group-hover:shadow-indigo-300/20"></div>
            <div className="absolute inset-1 bg-gradient-to-br from-indigo-950 to-indigo-800 rounded-full"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-2 w-2 rounded-full bg-indigo-300 group-hover:scale-110 transition-transform"></div>
            </div>
            <div className="absolute inset-0 border-4 border-indigo-300/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
          <div>
            <span className="text-2xl md:text-3xl font-bold font-serif text-indigo-100 tracking-widest drop-shadow-md">
              <button onClick={routeChangeHome} className="cursor-pointer">
                Album Adventures
              </button>
            </span>
            <div className="h-0.5 w-0 bg-gradient-to-r from-indigo-300 to-transparent group-hover:w-full transition-all duration-500"></div>
          </div>
        </div>

        {/* Desktop Search */}
        <div className={`hidden md:block relative transition-all duration-300 ease-in-out w-64 ${isExpanded ? "scale-105" : ""}`}>
          <input
            className="w-full px-4 py-2.5 rounded-full bg-indigo-900/40 border border-indigo-600/50 text-indigo-100 placeholder-indigo-400/70 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent shadow-inner"
            placeholder="Search for records..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            onBlur={() => setIsExpanded(false)}
            onKeyDown={(event) => event.key === "Enter" && routeChangeAlbum()}
          />
          <button
            onClick={routeChangeAlbum}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-indigo-400 hover:text-indigo-300 transition-colors focus:outline-none"
          >
            <Search className="h-5 w-5" />
          </button>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          <OriginalButton label="Reviewed" icon={Library} onClick={routeChangeReviewed} />
          <OriginalButton label="Saved" icon={Music} onClick={routeChangeSaved} />
          <OriginalButton label="Account" icon={User} onClick={routeChangeAccount} />
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-indigo-100 hover:text-indigo-300">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 mt-2 space-y-3 pb-2">
          {/* Search (Mobile) */}
          <div className="relative">
            <input
              className="w-full px-4 py-2.5 rounded-full bg-indigo-900/40 border border-indigo-600/50 text-indigo-100 placeholder-indigo-400/70 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent shadow-inner"
              placeholder="Search for records..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(event) => event.key === "Enter" && routeChangeAlbum()}
            />
            <button
              onClick={routeChangeAlbum}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-indigo-400 hover:text-indigo-300"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>

          {/* Mobile Buttons with original styles */}
          <div className="flex flex-col gap-2 mt-4">
            <OriginalButton label="Reviewed" icon={Library} onClick={routeChangeReviewed} fullWidth />
            <OriginalButton label="Saved" icon={Music} onClick={routeChangeSaved} fullWidth />
            <OriginalButton label="Account" icon={User} onClick={routeChangeAccount} fullWidth />
          </div>
        </div>
      )}
    </div>
  );
}

function OriginalButton({ label, icon: Icon, onClick, fullWidth = false }) {
  return (
    <button
      onClick={onClick}
      className={`group relative overflow-hidden px-4 py-2.5 rounded-md transition-all duration-300 text-indigo-100 hover:text-white shadow-md hover:shadow-indigo-600/20 focus:outline-none border border-indigo-700/50 ${fullWidth ? 'w-full flex justify-start items-center space-x-2' : 'cursor-pointer'}`}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-indigo-600 to-indigo-700 transition-opacity duration-300"></div>
      <div className="relative flex items-center space-x-2">
        <Icon className="h-4 w-4" />
        <span className="font-serif text-sm tracking-wide">{label}</span>
      </div>
    </button>
  );
}

export default Header;



