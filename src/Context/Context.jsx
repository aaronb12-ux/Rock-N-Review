import React, { createContext, useState, useEffect } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import app from '../firebase'
import { Context } from '../App'

export const AuthContext = createContext()


export function AuthProvider({children}) {

    const [user, setUser] = useState(null)

    const auth = getAuth()

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
            //user is signed in
                const uid = user.uid
                const email = user.email
                setUser({
                    uid: uid,
                    email: email,
                    signedin: true,
                })
            } else {
            //user is signed out
            setUser(null)
            }
        })
      }, [])

return (
        <AuthContext.Provider value={[user, setUser]}>
            {children}
        </AuthContext.Provider>
)

}



