import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button/Button'

import './Header.scss'

export default function Header() {
  const navigate = useNavigate()
  const handleLogin = () => {
    console.log('coucou')
    navigate('/SignIn')
  }
  return (
    <header>
      <nav>
        <Button className="button__color--primary" onClick={handleLogin}>
          Login
        </Button>
      </nav>
    </header>
  )
}
