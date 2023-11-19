import React from 'react';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from "../../firebase/Firebase";

import Button from '../../components/Button/Button';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/'); 
    } catch (error) {
      console.error('Erreur lors de la déconnexion :', error);
    }
  };

  return (
    <Button className={'button__tertiary'} onClick={handleLogout}>
      Disconnect
    </Button>
  )
}

export default LogoutButton;