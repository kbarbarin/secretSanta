import React, { useRef, useState } from "react";
import { auth } from "../../Firebase/Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function SignUp(props) {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    const [message, setMessage] = useState("");

    const createAccount = (e) => {
        e.preventDefault();
        if (
            emailRef.current.value
            && passwordRef.current.value
            && confirmPasswordRef.current.value
            && (passwordRef.current.value === confirmPasswordRef.current.value)
        ) {
            createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
                .then((userCredential) => {
                    setMessage("Création de compte réussie");
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
        } else {
            setMessage("Rempli correctement le formulaire");
        }
    }

    return (
        <div>
            <h1>SignUp</h1>
            <form onSubmit={createAccount}>
                <label htmlFor="email">Email :</label>
                <input type="email" id="email" ref={emailRef} required /><br /><br />

                <label htmlFor="password">Mot de passe :</label>
                <input type="password" id="password" ref={passwordRef} required /><br /><br />

                <label htmlFor="confirm_password">Confirmer le mot de passe :</label>
                <input type="password" id="confirm_password" ref={confirmPasswordRef} required /><br /><br />
                {message && <p>{message}</p>}

                <input type="submit" value="SignUp" />
            </form>
        </div>
    )
}