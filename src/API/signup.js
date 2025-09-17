import axios from "axios"
import { createUserWithEmailAndPassword} from 'firebase/auth'

const duplicateUserName =  async (username) => { //function checks if username already exists
    try {
      const response = await axios.get(`http://localhost:8080/users/username/${username}`);   //api call to backend to see if username already exists, will return 200 if found 

        return response.status === 200; //user name found
 
    } catch (error) { //if there is an error, that means no duplicate username was found
        if (error.response?.status === 404) { return false }
        throw error
    }
}

export const submitUser = async (username, email, password, auth) => { //function checks for dup username and valid fields, then creates the user

    if (password.length < 8) return { error: "badPassword" } //invalid password check

    const isDuplicate = await duplicateUserName(username) //duplicate username check

    if (isDuplicate) return { error: "duplicateUsername"}

    try {

      const userCredential = await createUserWithEmailAndPassword(auth, email, password); //creating the user in firebase
      const uid = userCredential.user.uid

      const response = await axios.post(`http://localhost:8080/users`, { //adding the user to *my* backend
        userid: uid,
        email: email,
        username: username,
        created: new Date().toLocaleString().split(',')[0],
      })
      
      if (response.status === 201 ) {
        return {status : true} //new user created
      }  
      
    } catch (error) {
      if (error.code === "auth/email-already-in-use") return { error: "duplicateEmail" } //duplicate email
      if (error.code === "auth/invalid-email") return { error: "badEmail" } //invalid email
      return { error: "unknown" } //unknown error
    }
}

