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

  if (user_info.userData) {
    return (
      <div className="bg-slate-950 min-h-screen flex flex-col">
        <Header currentSearch={currentSearch} />
        
        <div className="flex items-center justify-center mt-5">
          <AccountBanner />
        </div>

        <div className="py-8 mx-auto px-6 max-w-6xl w-full">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column - Profile Info */}
            <div className="lg:col-span-1 space-y-6">
              {/* Profile Card */}
              <div className="bg-slate-950 rounded-xl shadow-lg border border-slate-800 overflow-hidden p-8">
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center border-4 border-slate-700 mb-4">
                    <User className="w-12 h-12 text-slate-300" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">{userData.username}</h2>
                  <p className="text-slate-400 text-sm mb-6">{userData.email}</p>
                  
                  {/* Followers/Following */}
                  <div className="flex gap-4 w-full mb-6">
                    <button className="flex-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg p-3 transition-colors">
                      <p className="text-2xl font-bold text-white">0</p>
                      <p className="text-xs text-slate-400">Followers</p>
                    </button>
                    <button className="flex-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg p-3 transition-colors">
                      <p className="text-2xl font-bold text-white">0</p>
                      <p className="text-xs text-slate-400">Following</p>
                    </button>
                  </div>

                  <div className="w-full space-y-2">
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <Calendar className="w-4 h-4" />
                      <span>Joined {created}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sign Out */}
              <button
                onClick={handleSignOut}
                className="w-full bg-slate-950 hover:bg-slate-900 border border-slate-800 rounded-xl p-4 transition-colors flex items-center justify-center gap-2"
              >
                <LogOut className="w-5 h-5 text-red-400" />
                <span className="text-red-400 font-bold">Sign Out</span>
              </button>
            </div>

            {/* Right Column - Collections */}
            <div className="lg:col-span-2 space-y-6">
              {/* Stats Overview */}
              <div className="grid grid-cols-3 gap-6">
                <Link
                  style={{ textDecoration: 'none'}}
                  to="/reviewed"
                  state={{ searchInput: currentSearch }}
                  className="bg-slate-950 border border-slate-800 rounded-xl p-4 hover:bg-slate-900 hover:border-slate-700 transition-all"
                >
                  <Star className="w-6 h-6 text-slate-400 mb-3" />
                  <p className="text-2xl font-bold text-white">0</p>
                  <p className="text-sm text-slate-400">Reviews</p>
                </Link>
                
                <Link
                  to="/saved"
                  state={{ searchInput: currentSearch }}
                  className="bg-slate-950 border border-slate-800 rounded-xl p-4 hover:bg-slate-900 hover:border-slate-700 transition-all"
                >
                  <Heart className="w-6 h-6 text-slate-400 mb-3" />
                  <p className="text-2xl font-bold text-white">0</p>
                  <p className="text-sm text-slate-400">Saved</p>
                </Link>

                <Link
                  to="/homepage"
                  state={{ searchInput: currentSearch }}
                  className="bg-slate-950 border border-slate-800 rounded-xl p-4 hover:bg-slate-900 hover:border-slate-700 transition-all"
                >
                  <Music className="w-6 h-6 text-slate-400 mb-3" />
                  <p className="text-2xl font-bold text-white">Discover</p>
                  <p className="text-sm text-slate-400">Explore</p>
                </Link>
              </div>

              {/* Quick Actions */}
              <div className="bg-slate-950 rounded-xl shadow-lg border border-slate-800 p-6">
                <h3 className="text-lg font-bold text-white mb-4">Your Collection</h3>
                <div className="space-y-3">
                  <Link
                    to="/reviewed"
                    state={{ searchInput: currentSearch }}
                    className="flex items-center p-4 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-all"
                  >
                    <Star className="w-5 h-5 text-slate-400 mr-3" />
                    <div className="flex-1">
                      <p className="text-white font-bold">Reviewed Albums</p>
                      <p className="text-sm text-slate-400">View all your album reviews</p>
                    </div>
                  </Link>
                  
                  <Link
                    to="/saved"
                    state={{ searchInput: currentSearch }}
                    className="flex items-center p-4 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-all"
                  >
                    <Heart className="w-5 h-5 text-slate-400 mr-3" />
                    <div className="flex-1">
                      <p className="text-white font-bold">Saved Albums</p>
                      <p className="text-sm text-slate-400">Albums you want to check out</p>
                    </div>
                  </Link>

                  <Link
                    to="/homepage"
                    state={{ searchInput: currentSearch }}
                    className="flex items-center p-4 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-all"
                  >
                    <Music className="w-5 h-5 text-slate-400 mr-3" />
                    <div className="flex-1">
                      <p className="text-white font-bold no-underline">Discover Albums</p>
                      <p className="text-sm text-slate-400">Explore trending and featured music</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
};

export default Profile;