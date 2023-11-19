import React from 'react'

import { useNavigate } from 'react-router-dom'

import './Back.scss'

export default function Back() {
  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <button onClick={handleGoBack} className="back">
      ❮ Go back
    </button>
  )
}
