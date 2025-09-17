import React, { useContext } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { User, Mail, Calendar, LogOut, Music, Star, Heart } from "lucide-react";
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
      <div className="bg-indigo-50 min-h-screen flex flex-col">
        <Header currentSearch={currentSearch} />
        
        <div className="flex items-center justify-center mt-5">
          <AccountBanner />
        </div>

        <div className="py-6 mx-auto px-4 max-w-6xl w-full">
          <div className="space-y-5">
            
            {/* Account Details */}
            <div className="bg-white rounded-lg shadow-md border border-indigo-100 overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-900 to-indigo-900 py-2 px-5">
                <h3 className="text-md font-bold text-white font-serif flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  Account Information
                </h3>
              </div>
              
              <div className="p-5 space-y-3">
                <div className="flex items-center p-3 bg-indigo-50 border border-indigo-200 rounded-lg">
                  <User className="w-5 h-5 text-indigo-600 mr-3" />
                  <div className="flex-1">
                    <p className="text-sm text-indigo-700 font-bold font-serif">Username</p>
                    <p className="text-indigo-800 font-semibold font-serif">{userData.username}</p>
                  </div>
                </div>

                <div className="flex items-center p-3 bg-indigo-50 border border-indigo-200 rounded-lg">
                  <Mail className="w-5 h-5 text-indigo-600 mr-3" />
                  <div className="flex-1">
                    <p className="text-sm text-indigo-700 font-bold font-serif">Email</p>
                    <p className="text-indigo-800 font-semibold font-serif break-all">{userData.email}</p>
                  </div>
                </div>

                <div className="flex items-center p-3 bg-indigo-50 border border-indigo-200 rounded-lg">
                  <Calendar className="w-5 h-5 text-indigo-600 mr-3" />
                  <div className="flex-1">
                    <p className="text-sm text-indigo-700 font-bold font-serif">Account Created</p>
                    <p className="text-indigo-800 font-semibold font-serif">{created}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Music Collection Navigation */}
            <div className="bg-white rounded-lg shadow-md border border-indigo-100 overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-900 to-indigo-900 py-2 px-5">
                <h3 className="text-md font-bold text-white font-serif flex items-center">
                  <Music className="w-4 h-4 mr-2" />
                  Your Music Collection
                </h3>
              </div>
              
              <div className="p-5 space-y-3">
                <Link
                  to="/reviewed"
                  state={{ searchInput: currentSearch }}
                  className="flex items-center p-3 bg-indigo-50 border border-indigo-200 rounded-lg hover:bg-indigo-100 hover:border-indigo-300 transition-all duration-200"
                >
                  <Star className="w-5 h-5 text-indigo-600 mr-3" />
                  <div className="flex-1">
                    <p className="text-indigo-800 font-bold font-serif">Reviewed Albums</p>
                    <p className="text-sm text-indigo-600 font-serif">View all your album reviews</p>
                  </div>
                </Link>
                
                <Link
                  to="/saved"
                  state={{ searchInput: currentSearch }}
                  className="flex items-center p-3 bg-indigo-50 border border-indigo-200 rounded-lg hover:bg-indigo-100 hover:border-indigo-300 transition-all duration-200"
                >
                  <Heart className="w-5 h-5 text-indigo-600 mr-3" />
                  <div className="flex-1">
                    <p className="text-indigo-800 font-bold font-serif">Saved Albums</p>
                    <p className="text-sm text-indigo-600 font-serif">Albums you want to check out</p>
                  </div>
                </Link>

                <Link
                  to="/homepage"
                  state={{ searchInput: currentSearch }}
                  className="flex items-center p-3 bg-indigo-50 border border-indigo-200 rounded-lg hover:bg-indigo-100 hover:border-indigo-300 transition-all duration-200"
                >
                  <Music className="w-5 h-5 text-indigo-600 mr-3" />
                  <div className="flex-1">
                    <p className="text-indigo-800 font-bold font-serif">Discover Albums</p>
                    <p className="text-sm text-indigo-600 font-serif">Explore trending and featured music</p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Sign Out */}
            <div className="bg-white rounded-lg shadow-md border border-indigo-100 overflow-hidden mx-auto w-[300px]">
  <button
    onClick={handleSignOut}
    className="w-full flex items-center p-4 text-left hover:bg-red-50 transition-colors"
  >
    <LogOut className="w-5 h-5 text-red-600 mr-3" />
    <div className="flex-1">
      <p className="text-red-600 font-bold font-serif text-sm">Sign Out</p>
      <p className="text-xs text-red-500 font-serif">End your current session</p>
    </div>
  </button>
</div>

          </div>
        </div>
      </div>
    );
  }
};

export default Profile;