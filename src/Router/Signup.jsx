import React, {useState} from 'react'
import { auth } from '../firebase'
import { Link } from "react-router-dom";
import { submitUser } from "../API/signup"

function Signup({setSignedUp}) {
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUserName] = useState("")
    const [duplicateuser, setDuplicateUser] = useState(false)
    const [badpassword, setBadPassword] = useState(false)
    const [bademail, setBadEmail] = useState(false)
    const [duplicateemail, setDuplicateEmail] = useState(false)


    const handleSubmit = async (e) => {
        e.preventDefault()
        const result = await submitUser(username, email, password, auth)
        switch (result.error) {
          case "duplicateUsername":
            setDuplicateUser(true);
            break;
          case "badPassword":
            setBadPassword(true);
            break;
          case "duplicateEmail":
            setDuplicateEmail(true);
            setBadEmail(false)
            break;
          case "badEmail":
            setBadEmail(true);
            setDuplicateEmail(false)
            break;
          case "unknown":
            break;
          default:
            setSignedUp(true);
        }
    }

    return (
      <div className="flex items-center justify-center min-h-screen bg-indigo-50">

      
        <div className="w-fullpx-6">
          <div className="flex justify-center items-center mb-3">
            <div className="text-center">
              <div className="text-5xl font-bold font-serif text-indigo-800 drop-shadow-md mb-1">
                <div className="cursor-pointer">Album Adventures</div>
              </div>
              <p className="text-md text-gray-600 font-serif italic mt-1">
                Discover. Rate. Repeat.
              </p>
            </div>
          </div>
    
          <div className="overflow-hidden bg-white rounded-2xl shadow-xl">
            <div className="bg-indigo-800 py-6 px-8">
              <h2 className="text-center text-2xl font-bold font-serif drop-shadow-lg text-white mb-1">
                Create Account
              </h2>
            </div>
    
            <div className="px-8 py-6">
              <div onSubmit={handleSubmit}>
                <div className="mb-2">
                  <div
                    className="inline-block text-gray-700 text-sm font-bold font-serif font-medium mb-2"
                    htmlFor="email"
                  >
                    <span>Email</span>
                    {duplicateemail && (
                      <div className="inline-block ml-3 font-bold font-serif text-red-500">
                        Email Already Exists
                      </div>
                    )}
                    {bademail && (
                      <div className="inline-block ml-3 font-bold font-serif text-red-500">
                        Invalid Email
                      </div>
                    )}
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></div>
                    <input
                      type="email"
                      id="email"
                      className="pl-10 w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="you@example.com"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
    
                <div className="mb-2">
                  <div
                    className="inline-block text-gray-700 text-sm font-bold font-serif font-medium mb-2"
                    htmlFor="username"
                  >
                    <span>Username</span>
                    {duplicateuser && (
                      <div className="inline-block ml-3 font-bold font-serif text-red-500">
                        Username Already Exists
                      </div>
                    )}
                  </div>
    
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></div>
                    <input
                      type="username"
                      id="username"
                      className="pl-10 w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      onChange={(e) => setUserName(e.target.value)}
                      required
                    />
                  </div>
                </div>
    
                <div className="mb-6">
                  <div
                    className="inline-block text-gray-700 text-sm font-bold font-serif font-medium mb-2"
                    htmlFor="password"
                  >
                    <span>Password</span>
                    {badpassword && (
                      <div className="inline-block ml-3 font-bold font-serif text-red-500">
                        Invalid Password
                      </div>
                    )}
                  </div>
    
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></div>
                    <input
                      type="password"
                      id="password"
                      className="pl-10 w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="••••••••"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-500 font-bold font-serif mt-2">
                    Must be at least 8 characters
                  </p>
                </div>
    
                <button
                  onClick={handleSubmit}
                  className="w-full flex items-center justify-center bg-indigo-800 text-white font-medium py-3 px-4 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
                >
                  <span className="font-bold font-serif">Sign Up</span>
                </button>
              </div>
            </div>
          </div>
    
          <div className="text-center mt-6 text-gray-600 font-bold font-serif">
                  Already have an account?{" "}
          <Link 
              className="font-medium text-blue-600 hover:text-blue-800 transition-colors font-bold font-serif underline hover:no-underline"
              to={"/Login"}
              style={{ position: 'relative', zIndex: 10 }}
            >
                  Login
          </Link>
          </div>
        </div>
      </div>
    );
    
}

export default Signup



