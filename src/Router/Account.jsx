import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { User, Mail, Calendar } from "lucide-react";
import { Button } from "react-bootstrap";
import AccountBanner  from "../Components/AccountBanner"
import Header from "../Components/Header";
import { AuthContext } from "../Context/AuthContext";
import { auth } from "../firebase"

const Account = () => {

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
      <div className="min-h-screen bg-indigo-50">
        <Header currentSearch={currentSearch} />
    
        <div className="flex justify-center items-center mt-5">
          <AccountBanner />
        </div>
    
        <div className="max-w-lg mx-auto px-4 mt-8">
          {/* Profile Card */}
          <div className="p-6 mb-6">
            
    
            <div className="space-y-4 ">
              {/* Username */}
              <div className="flex items-center p-3  border-2  border-indigo-800 rounded-lg">
                <User className="w-5 h-5 text-indigo-600 mr-3" />
                <div className="flex-1">
                  <p className="text-sm text-indigo-800 font-bold font-serif font-medium">Username</p>
                  <p className="text-indigo-800 font-semibold font-serif">{user_info.userData.username}</p>
                </div>
              </div>
    
              {/* Email */}
              <div className="flex items-center p-3 border-indigo-800 border-2  rounded-lg">
                <Mail className="w-5 h-5 text-indigo-600 mr-3" />
                <div className="flex-1">
                  <p className="text-sm text-indigo-800 font-medium font-bold font-serif ">Email</p>
                  <p className="text-indigo-800 font-semibold font-bold font-serif break-all">{user_info.userData.email}</p>
                </div>
              </div>
    
              {/* Account Created */}
              <div className="flex items-center p-3 border-indigo-800 border-2 rounded-lg">
                <Calendar className="w-5 h-5 text-indigo-600 mr-3" />
                <div className="flex-1">
                  <p className="text-sm text-indigo-800 font-medium font-bold font-serif">Account Created</p>
                  <p className="text-indigo-800 font-semibold font-bold font-serif">{created}</p>
                </div>
              </div>
            </div>
          </div>
    
          {/* Sign Out Button */}
          <Button
            variant="danger"
            size="lg"
            className="w-full py-3 rounded-xl "
            onClick={handleSignOut}
          >
            <span className="font-bold font-serif"> Sign Out</span>
          </Button>
        </div>
      </div>
    );
  }

};

export default Account;


