import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useState } from "react"
import { auth } from "../../main";



const SignIn = () => {
    const [email , setEmail ] = useState('');
    const [password, setPassword] = useState('');

    const createUser = async () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredinteial) => {
                // nu är vi inloggade
                console.log("inloggad")
            }) 
            .catch((error) => {
                console.log(error.message);
            });
    }

    const signInUser = async () => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredinteial) => {
            // nu är vi inloggade
            console.log("inloggad")
        }) 
        .catch((error) => {
            console.log(error.message);
        });
    }

    const signOutUser = async () => {
        signOut(auth).then(() => {
            console.log("signed out")
        }).catch((error) => {
            console.log(error.message)
        });
    }

    return (
        <>
            <label>Epost:</label>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}></input>
            <br></br>
            <label>Lösenord:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
            <br></br>

            <button onClick={signInUser}>Sign In</button>
            <button onClick={createUser}>Sign Up</button>
            <button onClick={signOutUser}>Sign out</button>

        </>
    )
}

export default SignIn;