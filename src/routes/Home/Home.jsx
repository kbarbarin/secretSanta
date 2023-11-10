import React from 'react'
import { Outlet } from 'react-router-dom'

import './Home.scss'

import Button from '../../components/Button/Button'

export default function Home() {
  return (
    <div>
      <Outlet />
      <div className="home">
        <img src="assets/logo.png" alt="secret santa's logo" />
        <h1 className="home__title">Ho-Ho! </h1>
        <h1 className="home__title--yellow">It's Secret Santa Time!</h1>
        <div className="home__buttons">
          <Button className="button__color--primary">
            Create my Secret Santa
          </Button>
          <Button className="button__color--secondary">
            Join a Secret Santa
          </Button>
        </div>
      </div>
      <div className="home__treeFooter"></div>
    </div>
  )
}
