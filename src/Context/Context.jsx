import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { AuthContext } from './AuthContext';  // Import from the new file
import axios from "axios";
import {API_BASE_URL} from '../Config/api';

export function AuthProvider({ children }) {
  const [userData, setUserData] = useState(null);
  
  useEffect(() => {
    const auth = getAuth();
    
    const unsubscribe = onAuthStateChanged(auth, async (firebaseuser) => {
      if (firebaseuser) {
        const userid = firebaseuser.uid;
        setUserData(null);
        
        let attempts = 0;
        const maxAttempts = 5;
        const delay = 1000; 
        
        while (attempts < maxAttempts) {
          try {
            const response = await axios.get(`${API_BASE_URL}/users/${userid}`);      
            
            if (response.data) {
              setUserData(response.data);
              break;
            } 
          } catch (error) {
            attempts++;
            
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


