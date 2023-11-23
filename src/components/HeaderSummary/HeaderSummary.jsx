import React from 'react'

import './HeaderSummary.scss'

export default function HeaderSummary({ name }) {
  const date = '2023-12-26'
  const today = new Date()
  const day = today.getDate()
  const month = today.getMonth() + 1
  const year = today.getFullYear()

  return (
    <div className="headerSum">
      <h3 className="headerSum__title">{name}</h3>
      <div className="headerSum__container">
        <p className="headerSum__desc">The event will begin in</p>
        <div className="headerSum__date">
          <span className="headerSum__time">
            <p>X</p>
            <p>Days</p>
          </span>
          <span className="headerSum__time">
            <p>X</p>
            <p>Hours</p>
          </span>
          <span className="headerSum__time">
            <p>X</p>
            <p>Minutes</p>
          </span>
        </div>
      </div>
    </div>
  )
}
