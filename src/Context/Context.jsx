import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { AuthContext } from './AuthContext';  // Import from the new file
import axios from "axios";

export function AuthProvider({ children }) {
  const [userData, setUserData] = useState(null);
  
  useEffect(() => {
    const auth = getAuth();
    
    const unsubscribe = onAuthStateChanged(auth, async (firebaseuser) => {
      if (firebaseuser) {
        const userid = firebaseuser.uid; // getting logged in user id
        
        // Clear previous user data immediately when auth state changes
        setUserData(null);
        
        try {
          const response = await axios.get(`https://album-review-app-lnmu.onrender.com/users/${userid}`);      
          
          if (response.data) {
            console.log('got user data');
            setUserData(response.data);    
          } 
        } catch (error) {
          console.log(error.message);
          console.log('fetching user failed');
          // Keep userData as null for failed requests/new users
        }
      } else {
        // User signed out
        setUserData(null);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);
  
  return (
    <AuthContext.Provider value={{ userData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
}


