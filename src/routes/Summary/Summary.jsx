import React from "react";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const SummaryPage = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        signInAnonymously(auth)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log("Utilisateur connecté anonymement :", user);
          })
          .catch((error) => {
            console.error("Erreur de connexion anonyme :", error);
          });
      }
    });
    return () => unsubscribe();
  }, [auth, navigate]);
}
 
export default function Summary () {
    return (
        <p>
            Summary
        </p>
    )
}