import React, { useRef, useState } from "react";
import { auth } from "../../firebase/Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { doc, collection, setDoc } from "firebase/firestore";
import { db } from "../../firebase/Firebase";

export default function SignUp(props) {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    const [message, setMessage] = useState("");

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