import React, { useRef, useState } from "react";
import { auth } from "../../firebase/Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

import Input from '../../components/Input/Input';

import { faUser, faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'

import './SignIn.scss'

export default function SignUp(props) {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [message, setMessage] = useState("");
    const [showPassord, setShowPassword] = useState(false);

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
        <div className="signin">
            <h1>SignIn</h1>
            <form onSubmit={createAccount}>
                <Input
                    placeholder="yourmail@gmail.com"
                    type="email"
                    id="email"
                    ref={emailRef}
                    icon={faUser}
                    required
                />
                <Input
                    placeholder="your secret password"
                    type={showPassord ? "text" : "password"}
                    icon={showPassord ? faEyeSlash : faEye}
                    onClickIcon={() => setShowPassword(!showPassord)}
                    id="password"
                    ref={passwordRef}
                    required
                />
                {message && <p>{message}</p>}

                <input type="submit" value="SIGN IN" />
            </form>
        </div>
    )
}