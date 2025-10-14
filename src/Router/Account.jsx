import React, { useContext } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { User, Mail, Calendar, LogOut, Music, Star, Heart, Users, UserPlus } from "lucide-react";
import AccountBanner from "../Components/AccountBanner";
import Header from "../Components/Header";
import { AuthContext } from "../Context/AuthContext";
import { auth } from "../firebase";

const Profile = () => {
  const user_info = useContext(AuthContext);
  const userData = user_info?.userData || {};
  const created = userData.created ? userData.created.slice(0, 10) : "Unknown";

  const location = useLocation();
  const currentSearch = location.state?.searchInput;

  const navigate = useNavigate();
  const handleSignOut = () => {
    signOut(auth)
      .then(() => navigate("/"))
      .catch((error) => console.log("Error signing out:", error));
  };

  if (user_info.userData === null) {
    return (
      <div className="bg-slate-950 min-h-screen">
        <Header currentSearch={currentSearch} />
        <div className="flex items-center justify-center mt-5">
          <AccountBanner />
        </div>
        <div className="flex flex-col items-center justify-center mt-30 px-4 text-center">
          <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-6">
            <Music className="mr-1 text-slate-400 h-10 w-10" />
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-3"></h2>
          
          <p className="text-slate-300 text-2xl mb-6 max-w-md">
            <span>
              <Link className="text-white" to={'/signup'}>Make an account</Link>
              <text> or </text>
              <Link className="text-white" to={'/Login'}>login</Link>
              <text> to see your profile!</text>
            </span>
          </p>
        </div>
      </div>
    );
  }

  if (user_info.userData) {
    return (
      <div className="bg-slate-950 min-h-screen">
        <Header currentSearch={currentSearch} />
        
        <div className="flex items-center justify-center mt-5">
          <AccountBanner />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Profile Header Section */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl border border-slate-800 p-8 mb-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-br from-slate-700 to-slate-800 rounded-full flex items-center justify-center border-4 border-slate-600 shadow-xl">
                  <User className="w-16 h-16 text-slate-200" />
                </div>
              </div>

              {/* User Info */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-4xl font-bold text-white mb-2">{userData.username}</h1>
                <p className="text-slate-400 mb-4">{userData.email}</p>
                
                <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-slate-400 mb-6">
                  <Calendar className="w-4 h-4" />
                  <span>Member since {created}</span>
                </div>

                {/* Stats Row */}
                <div className="flex gap-8 justify-center md:justify-start">
                  <div>
                    <p className="text-3xl font-bold text-white">0</p>
                    <p className="text-sm text-slate-400">Reviews</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-white">0</p>
                    <p className="text-sm text-slate-400">Saved</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-white">0</p>
                    <p className="text-sm text-slate-400">Followers</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-white">0</p>
                    <p className="text-sm text-slate-400">Following</p>
                  </div>
                </div>
              </div>

              {/* Sign Out Button */}
              <button
                onClick={handleSignOut}
                className="bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl px-6 py-3 transition-all flex items-center gap-2 shadow-lg hover:shadow-red-900/20"
              >
                <LogOut className="w-5 h-5 text-red-400" />
                <span className="text-red-400 font-medium">Sign Out</span>
              </button>
            </div>
          </div>

          {/* Quick Actions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Link
              to="/reviewed"
              state={{ searchInput: currentSearch }}
              className="group bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-all hover:shadow-lg hover:shadow-blue-900/10"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center group-hover:bg-slate-700 transition-colors">
                  <Star className="w-6 h-6 text-blue-400" />
                </div>
                <span className="text-3xl font-bold text-white">0</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Reviewed Albums</h3>
              <p className="text-sm text-slate-400">Your album reviews and ratings</p>
            </Link>

            <Link
              to="/saved"
              state={{ searchInput: currentSearch }}
              className="group bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-all hover:shadow-lg hover:shadow-pink-900/10"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center group-hover:bg-slate-700 transition-colors">
                  <Heart className="w-6 h-6 text-pink-400" />
                </div>
                <span className="text-3xl font-bold text-white">0</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Saved Albums</h3>
              <p className="text-sm text-slate-400">Albums on your wishlist</p>
            </Link>

            <Link
              to="/homepage"
              state={{ searchInput: currentSearch }}
              className="group bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-all hover:shadow-lg hover:shadow-purple-900/10"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center group-hover:bg-slate-700 transition-colors">
                  <Music className="w-6 h-6 text-purple-400" />
                </div>
                <span className="text-xl font-bold text-white">Explore</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Discover Music</h3>
              <p className="text-sm text-slate-400">Find new albums to enjoy</p>
            </Link>
          </div>

          {/* Collection Details */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Your Collection</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                to="/reviewed"
                state={{ searchInput: currentSearch }}
                className="group flex items-center gap-4 p-5 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 rounded-xl transition-all"
              >
                <div className="w-14 h-14 bg-slate-800 rounded-lg flex items-center justify-center group-hover:bg-slate-700 transition-colors flex-shrink-0">
                  <Star className="w-7 h-7 text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-lg font-bold text-white mb-1">Reviewed Albums</p>
                  <p className="text-sm text-slate-400">View and manage your reviews</p>
                </div>
              </Link>

              <Link
                to="/saved"
                state={{ searchInput: currentSearch }}
                className="group flex items-center gap-4 p-5 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 rounded-xl transition-all"
              >
                <div className="w-14 h-14 bg-slate-800 rounded-lg flex items-center justify-center group-hover:bg-slate-700 transition-colors flex-shrink-0">
                  <Heart className="w-7 h-7 text-pink-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-lg font-bold text-white mb-1">Saved Albums</p>
                  <p className="text-sm text-slate-400">Albums you want to explore</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Profile;