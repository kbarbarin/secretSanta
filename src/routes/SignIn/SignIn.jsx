import React, { useRef, useState } from "react";
import { auth } from "../../Firebase/Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function SignUp(props) {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [message, setMessage] = useState("");

    const createAccount = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
            .then((userCredential) => {
                setMessage("Connexion réussie");
                // Signed up 
                // const user = userCredential.user;
                // ...
            })
            .catch((error) => {
                // const errorCode = error.code;
                const errorMessage = error.message;
                setMessage(errorMessage);
                // ..
            });
    }

    return (
        <div>
            <h1>SignIn</h1>
            <form onSubmit={createAccount}>
                <label htmlFor="email">Email :</label>
                <input type="email" id="email" ref={emailRef} required /><br /><br />

                <label htmlFor="password">Mot de passe :</label>
                <input type="password" id="password" ref={passwordRef} required /><br /><br />
                {message && <p>{message}</p>}

                <input type="submit" value="SignIn" />
            </form>
        </div>
    )
}