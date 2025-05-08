import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

//initializing firebase and creating a Firebase App object

const firebaseConfig = {

        apiKey: "AIzaSyCYWfWiTDnGzfuIw2KS4UusPsekAcW-mdA",
      
        authDomain: "albumadventures-dev.firebaseapp.com",
      
        projectId: "albumadventures-dev",
      
        storageBucket: "albumadventures-dev.firebasestorage.app",
      
        messagingSenderId: "61696534013",
      
        appId: "1:61696534013:web:32720c6153132500e42594"
      
      };

const app = initializeApp(firebaseConfig)

export default app
export const auth = getAuth(app)
