import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from '../firebase';
import { AuthContext } from './AuthContext';  // Import from the new file
import axios from "axios"

export function AuthProvider({children}) {
  
  
  const [user, setUser] = useState(null)
  
  const [userData, setUserData] = useState(null);


  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (firebaseuser) => {
      
      setUser(firebaseuser)

      if (firebaseuser) {
        //user is signed in
        //api call to get by the uid
        try {
          const res = await axios.get(`http://localhost:8080/users/${firebaseuser.uid}`)
          console.log(res.data)
          setUserData(res.data)
        } catch (error) {
          console.log(error)
          setUserData(null)
        }
      } else {
        //user is signed out
        setUserData(null);
      }
    });

    return () => unsubscribe()
  }, []);
  
  return (
    <AuthContext.Provider value={{userData}}>
      {children}
    </AuthContext.Provider>
  );
}

