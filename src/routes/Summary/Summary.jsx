import React, { useEffect } from "react";
import { getAuth, signInAnonymously } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function Summary () {
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserAndSignIn = async () => {
      if (!auth.currentUser) {
        try {
          await signInAnonymously(auth);
        } catch (error) {
          console.error('Erreur lors de la connexion anonyme :', error);
        }
      } else {
        console.log('Utilisateur déjà connecté:', auth.currentUser);
      }
    };

    checkUserAndSignIn();
  }, [auth]);

  return (
    <p>
      Summary
    </p>
  );
}