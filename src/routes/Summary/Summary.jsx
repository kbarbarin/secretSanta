import React, { useEffect } from "react";
import { getAuth, signInAnonymously } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const SummaryPage = () => {
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
}

export default function Summary () {
    return (
        <p>
            Summary
        </p>
    )
}