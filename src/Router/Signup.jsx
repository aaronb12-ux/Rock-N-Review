import React, {useState} from 'react'
import { createUserWithEmailAndPassword, getAuth} from 'firebase/auth'
import { Link } from "react-router-dom";
import axios from "axios"
import { FALSE } from 'sass';


function Signup({setSignedUp}) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUserName] = useState("")
    const auth = getAuth()

    const [duplicateuser, setDuplicateUser] = useState(false)
    const [badpassword, setBadPassWord] = useState(false)
    const [bademail, setBadEmail] = useState(false)
    const [duplicateemail, setDuplicateEmail] = useState(false)


    //after a user completes the form on the 'SignUp' page and clicks submit, call this method
    
    //need to check duplicate username, valid password, and email
    const duplicateUserName =  async (username) => {
      
        try {
          
          const response = await axios.get(`http://localhost:8080/users/username/${username}`);
                   
           if (response.status === 200) {
            return true
          } 

        } catch (err) {
            if (err.response && err.response.status === 404) {
              console.log("user not found")
              return false
            }
        }
    }


    const badPassword = (password) => {
      return password.length <= 8
    }
    
  
    const submit = async () => {
      

      const isDuplicate = await duplicateUserName(username)

      if (isDuplicate) {
        setDuplicateUser(true)
        return
      }


      if (badPassword(password)) {
        setBadPassWord(true)
        return
      }

      try {
        
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const uid = userCredential.user.uid

        axios.post(`http://localhost:8080/users`, {
          userid: uid,
          email: email,
          username: username,
          created: new Date(),
        })
        
        setSignedUp(true)
        
      } catch (error) {
        if (error.code === "auth/email-already-in-use") {
            setDuplicateEmail(true)
          
        } else if (error.code === "auth/invalid-email") {
            setBadEmail(true)
        }    
      }
      
    }

    return (
      <div className="flex items-center justify-center min-h-screen bg-indigo-50">
        <div className="w-fullpx-6">
          <div className="flex justify-center items-center mb-5">
            <div className="text-center">
              <div className="text-4xl mb-1">🎧</div>
              <div className="text-5xl font-bold font-serif text-indigo-500 drop-shadow-md mb-1">
                <div className="cursor-pointer">Album Adventures</div>
              </div>
              <p className="text-md text-gray-600 font-serif italic mt-1">
                Discover. Rate. Repeat.
              </p>
            </div>
          </div>
    
          <div className="overflow-hidden bg-white rounded-2xl shadow-xl">
            <div className="bg-indigo-600 py-6 px-8">
              <h2 className="text-center text-2xl font-bold font-serif drop-shadow-lg text-white mb-1">
                Create Account
              </h2>
            </div>
    
            <div className="px-8 py-6">
              <div onSubmit={submit}>
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
                  onClick={submit}
                  className="w-full flex items-center justify-center bg-indigo-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
                >
                  <span className="font-bold font-serif">Sign Up</span>
                </button>
              </div>
            </div>
          </div>
    
          <div className="text-center mt-6 text-gray-600 font-bold font-serif">
            Already have an account?{" "}
            <Link
              className="font-medium text-blue-600 hover:text-blue-800 transition-colors font-bold font-serif"
              to={"/Login"}
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    );
    
}

export default Signup



