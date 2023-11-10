import React from 'react'
import Button from '../../components/Button/Button'

import './Header.scss'
export default function Header() {
  return (
    <header>
      <nav>
        <Button className="button__color--primary">Login</Button>
      </nav>
    </header>
  )
}
