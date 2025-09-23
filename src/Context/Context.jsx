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
        const userid = firebaseuser.uid;
        setUserData(null);
        
        // Add retry logic for newly created users
        let attempts = 0;
        const maxAttempts = 5;
        const delay = 1000; // 1 second
        
        while (attempts < maxAttempts) {
          try {
            const response = await axios.get(`https://album-review-app-lnmu.onrender.com/users/${userid}`);      
            
            if (response.data) {
              console.log('got user data');
              setUserData(response.data);
              break; // Success, exit the loop
            } 
          } catch (error) {
            attempts++;
            console.log(`Attempt ${attempts} failed, retrying in ${delay}ms...`);
            
            if (attempts < maxAttempts) {
              await new Promise(resolve => setTimeout(resolve, delay));
            } else {
              console.log('fetching user failed after all attempts');
            }
          }
        }
      } else {
        setUserData(null);
      }
    });
    
    return () => unsubscribe();
  }, []);
  
  return (
    <AuthContext.Provider value={{ userData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
}


