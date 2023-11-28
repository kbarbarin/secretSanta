import React, { useEffect, useState, useCallback } from 'react'

import './HeaderSummary.scss'

const HeaderSummary = ({ name, eventDate }) => {
  const calculateTimeRemaining = useCallback(() => {
    const today = new Date()
    const eventDateTime = new Date(eventDate)
    const timeDifference = eventDateTime - today

    if (timeDifference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
      }
    }

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
    const hours = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    )
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    )

    return { days, hours, minutes }
  }, [eventDate])

  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining)

  useEffect(() => {
    const calculateAndSetTimeRemaining = () => {
      setTimeRemaining(calculateTimeRemaining())
    }

    const timer = setInterval(calculateAndSetTimeRemaining, 1000)

    return () => clearInterval(timer)
  }, [eventDate, calculateTimeRemaining])

  return (
    <div className="headerSum">
      <h3 className="headerSum__title">{name}</h3>
      <div className="headerSum__container">
        <p className="headerSum__desc">The event will begin in</p>
        <div className="headerSum__date">
          <span className="headerSum__time">
            <p>{timeRemaining.days}</p>
            <p>Days</p>
          </span>
          <span className="headerSum__time">
            <p>{timeRemaining.hours}</p>
            <p>Hours</p>
          </span>
          <span className="headerSum__time">
            <p>{timeRemaining.minutes}</p>
            <p>Minutes</p>
          </span>
        </div>
      </div>
    </div>
  )
}

export default HeaderSummary
