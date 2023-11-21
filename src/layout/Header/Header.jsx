import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button/Button'

import './Header.scss'
import Back from '../../components/Back/Back'

export default function Header() {
  const navigate = useNavigate()
  const handleLogin = () => {
    navigate('/signin')
  }
  return (
    <header>
      <nav>
        <Back />
        <Button className="button__color--primary" onClick={handleLogin}>
          Login
        </Button>
      </nav>
    </header>
  )
}
