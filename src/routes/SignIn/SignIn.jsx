import React, { useRef, useState } from "react";
import { auth } from "../../firebase/Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

import Input from '../../components/Input/Input';

export default function SignUp(props) {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [message, setMessage] = useState("");

    const createAccount = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
            .then((userCredential) => {
                setMessage("Connexion réussie");
            })
            .catch((error) => {
                const errorMessage = error.message;
                setMessage(errorMessage);
            });
    }

    return (
        <div>
            <h1>SignIn</h1>
            <form onSubmit={createAccount}>
                <Input placeholder="yourmail@gmail.com" type="email" id="email" ref={emailRef} required /><br /><br />
                <Input placeholder="your secret password" type="password" id="password" ref={passwordRef} required /><br /><br />
                {message && <p>{message}</p>}

                <input type="submit" value="SignIn" />
            </form>
        </div>
    )
}