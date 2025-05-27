import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'


const firebaseConfig = {

        apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      
        authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
      
        projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
      
        storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
      
        messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
      
        appId: import.meta.env.VITE_FIREBASE_APPID,
      
      };


const app = getApps().length ? getApp() : initializeApp(firebaseConfig); 

export const auth = getAuth(app)
export default app
