import React from 'react'
import './RevealPage.scss'
import Button from '../../components/Button/Button'

function RevealPage() {
  return (
    <div className="revealPage">
      <h1>Your Secret Santa is...</h1>
      <div className='revealBall'>
        <img src="assets/reveal.png" alt="reveal" />
        <h2>Léo</h2>
      </div>
      <Button className="revealBtn">NEED ANY IDEAS? CLICK ME!</Button>
    </div>
  )
}

export default RevealPage
