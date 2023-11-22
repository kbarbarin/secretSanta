import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { auth } from '../../firebase/Firebase'
import Button from '../../components/Button/Button'

import './Header.scss'
import Back from '../../components/Back/Back'

export default function Header() {
  const [button, setButton] = useState("SIGN IN");
  const [navigation, setNavigation] = useState("/signin");
  const location = useLocation()
  const navigate = useNavigate()

  const isCreateOrSummaryPage = /^\/(create\/?)?$|^\/create\/\w+$|^\/summary$/i.test(location.pathname);

  useEffect(() => {
    if (location.pathname === '/') {
      setButton('SIGN IN');
      setNavigation("/signin");
    }
    else if (isCreateOrSummaryPage) {
      setButton('MY PROFILE');
      setNavigation("/profile");
    }
    else if (
      location.pathname === '/quizz' ||
      location.pathname === '/giftideas' ||
      location.pathname === '/secretsanta'
    ) {
      if (auth.currentUser) {
        setButton('MY PROFILE');
        setNavigation("/profile");
      } else {
        setButton('SIGN IN');
        setNavigation("/signin");
      }
    } else if  (location.pathname === '/signin') {
        setButton('SIGN UP');
        setNavigation("/signup");
    } else if  (location.pathname === '/profile') {
      setButton('');
      setNavigation("");
  }
  }, [location, isCreateOrSummaryPage])

  const handleNavigation = () => {
    navigate(navigation);
  }
  return (
    <header>
      <nav>
        <Back />
        {button !== "" && <Button className="button__color--primary" onClick={handleNavigation}>
          {button}
        </Button>}
      </nav>
    </header>
  )
}
