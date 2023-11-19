import React, { useEffect, useState } from 'react'
import { auth } from '../../firebase/Firebase'
import { useNavigate } from 'react-router-dom'

export default function PrivateRoute(props) {
    const navigation = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
          if (user) {
            setUser(user);
          } else {
            navigation('/signin');
          }
        });
    
        return () => unsubscribe(); // Nettoyer l'effet lors du démontage du composant
      }, [navigation]);

      return <>{user ? props.children : null}</>;
}