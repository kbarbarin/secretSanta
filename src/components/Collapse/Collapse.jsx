import React, { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

import './Collapse.scss'

export default function Collapse({ label, text }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div>
      <div className="collapse">
        <div className="collapse__titleContainer">
          <p className="collapse__title">{label}</p>
          {isOpen ? (
            <FontAwesomeIcon
              icon={faChevronUp}
              className="collapse__icon"
              onClick={() => setIsOpen(false)}
            />
          ) : (
            <FontAwesomeIcon
              icon={faChevronDown}
              className="collapse__icon"
              onClick={() => setIsOpen(true)}
            />
          )}
        </div>
        {isOpen && (
          <div>
            <div className="collapse__desc">{text}</div>
          </div>
        )}
      </div>
    </div>
  )
}
