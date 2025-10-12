import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase'
import Header from "../Components/Header";

const Login = () => {

     const navigate = useNavigate()
     const [email, setEmail] = useState("")
     const [password, setPassword] = useState("")
     const [invalidcredential, setInvalidCredential] = useState(false)

     const login = async (auth, email, password) => {
      
      signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
              navigate('/Homepage') 
          })
          .catch((error) => {
              setInvalidCredential(true)     
          })
  }

    const handleSubmit = async (e) => {
        e.preventDefault()
        login(auth, email, password)   
    }
 
    return ( <div className="flex items-center justify-center min-h-screen bg-slate-950">
        

        <div className="w-full max-w-xl px-6">
        <div className="flex justify-center items-center mb-3">
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-1">
                <div className="cursor-pointer">Rock N' Review</div>
              </div>
              <p className="text-md text-slate-400 italic mt-1">
                Discover. Rate. Repeat.
              </p>
            </div>
          </div>
          <div className="overflow-hidden bg-slate-900 rounded-2xl shadow-2xl border border-slate-800">
            <div className="bg-slate-800 py-6 px-8">
              <h2 className="text-center text-2xl font-bold text-white mb-1">Login</h2>
            </div>
            
            <div className="px-8 py-6">
              <div onSubmit={handleSubmit}>
              <div className="h-6 flex items-center justify-center">
                {invalidcredential && (
                  <div className="font-bold text-red-400">
                    Invalid Credentials
                </div>
                      )}
              </div>
                <div className="mb-5">
                  <label className="block text-slate-300 text-sm font-bold font-medium mb-2" htmlFor="email">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    
                    </div>
                    <input
                      type="email"
                      id="email"
                      className="pl-10 w-full p-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-slate-600 focus:border-slate-600 transition-all"
                      placeholder="you@example.com"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-slate-300 font-bold text-sm font-medium mb-2" htmlFor="password">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    
                    </div>
                    <input
                      type="password"
                      id="password"
                      className="pl-10 w-full p-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-slate-600 focus:border-slate-600 transition-all"
                      placeholder="••••••••"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                </div>
                
                <button
                  onClick={handleSubmit}
                  className="w-full flex items-center justify-center bg-slate-800 text-white font-medium py-3 px-4 rounded-lg hover:bg-slate-700 transition-all"
                   
                >
                  <span className="font-bold">Log In</span>
                 
                </button>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-6 text-slate-400 font-bold">
            Don't have an account?{" "}
             <Link 
                className="font-medium text-slate-300 hover:text-white transition-colors font-bold underline hover:no-underline"
                to={"/signup"}
                style={{ position: 'relative', zIndex: 10 }}
              >
                Signup
              </Link>
          </div>
        </div>
      
    </div>)
}

export default Login