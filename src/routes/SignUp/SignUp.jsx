import React, { useRef, useState } from "react";
import { auth } from "../../firebase/Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { doc, collection, setDoc } from "firebase/firestore";
import { db } from "../../firebase/Firebase";
import { Link } from "react-router-dom";

import Input from "../../components/Input/Input";
import HeaderCard from '../../layout/HeaderCard/HeaderCard'


import { faUser, faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'

import './SignUp.scss';

export default function SignUp(props) {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const [message, setMessage] = useState("");
  const [showPassord, setShowPassword] = useState(false);
  const [showConfirmPassord, setShowConfirmPassword] = useState(false);

    const createAccount = (e) => {
        e.preventDefault();
        if (passwordRef.current.value === confirmPasswordRef.current.value) {
          createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
            .then(async (userCredential) => {
              setMessage('Création de compte réussie');
              console.log(userCredential.user.uid);
      
              const userDocRef = doc(collection(db, 'users'));
              console.log(userDocRef);
              const userData = {
                // username: userCredential.user.displayName,
                uid: userCredential.user.uid,
                email: userCredential.user.email,
                secretSantaSessionId: [],
              };
              await setDoc(userDocRef, userData);
            })
            .catch((error) => {
              console.error('Erreur lors de la création du compte :', error.code, error.message);
              setMessage(error.message);
            });
        } else {
          setMessage('Remplissez correctement le formulaire');
        }
      };

    return (
      <div className="signup">
        <HeaderCard secondaryTitle={'SignUp'} />

        <form onSubmit={createAccount}>
          <Input
            placeholder="yourmail@gmail.com"
            type="email"
            id="email"
            inputRef={emailRef}
            icon={faUser}
            required
          />
          <Input
            placeholder="your secret password"
            type={showPassord ? 'text' : 'password'}
            icon={showPassord ? faEyeSlash : faEye}
            onClickIcon={() => setShowPassword(!showPassord)}
            id="password"
            inputRef={passwordRef}
            required
          />
          <Input
            placeholder="confirm your secret password"
            type={showPassord ? 'text' : 'password'}
            icon={showPassord ? faEyeSlash : faEye}
            onClickIcon={() => setShowConfirmPassword(!showConfirmPassord)}
            id="password"
            inputRef={passwordRef}
            required
          />
          {message && <p className="errorMessage">{message}</p>}

          <input type="submit" value="SIGN UP" />
          <div className="signin">
            <p className="signin-text">Already have an account ? &#160;</p>
            <Link to="/SignIn" className="signin-link">
              Click here !
            </Link>
          </div>
        </form>
      </div>
    )
}