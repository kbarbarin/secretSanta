import React from 'react'
import './RevealPage.scss'
import Button from '../../components/Button/Button'
import { useNavigate } from 'react-router-dom'

function RevealPage() {
  const navigate = useNavigate()
  const recommandations = [];
  const priceRange = 5;

  return (
    <div className="revealPage">
      <h1>Your Secret Santa is...</h1>
      <div className='revealBall'>
        <img src="/assets/reveal.png" alt="reveal" />
        <h2>Léo</h2>
      </div>
      <Button onClick={() => navigate('/giftideas', {state: {priceRange, recommandations}})}className="revealBtn">NEED ANY IDEAS? CLICK ME!</Button>
    </div>
  )
}

export default RevealPage
