import axios from "axios"


 function submit(auth, email, password) { //function that creates a user
        
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          setSignedUp(true)
        })
        .catch((error) => {
            console.log(error.errorCode)
        })
}

