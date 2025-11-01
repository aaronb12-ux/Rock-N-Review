import React, { useContext } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { User, LogOut, Music } from "lucide-react";
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

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Profile Card */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl border border-slate-800 p-6">
            <div className="flex flex-col md:flex-row items-center md:items-center gap-6">
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div className="w-24 h-24 bg-gradient-to-br from-slate-700 to-slate-800 rounded-full flex items-center justify-center border-4 border-slate-600 shadow-xl">
                  <User className="w-12 h-12 text-slate-200" />
                </div>
              </div>

              {/* User Info */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold text-white mb-2">{userData.username}</h1>
                <p className="text-slate-400 text-base mb-3">{userData.email}</p>
                
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 rounded-lg border border-slate-700">
                  <span className="text-xs text-slate-400">Member since</span>
                  <span className="text-xs font-semibold text-white">{created}</span>
                </div>
              </div>

              {/* Sign Out Button */}
              <button
                onClick={handleSignOut}
                className="bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl px-5 py-2.5 transition-all flex items-center gap-2 shadow-lg hover:shadow-red-900/20 flex-shrink-0"
              >
                <LogOut className="w-4 h-4 text-red-400" />
                <span className="text-red-400 font-medium text-sm">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Profile;