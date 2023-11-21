import React from 'react'

import './HeaderSummary.scss'

export default function HeaderSummary({ name }) {
  return (
    <div className="headerSum">
      <h3 className="headerSum__title">Secret Santa's name</h3>
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
