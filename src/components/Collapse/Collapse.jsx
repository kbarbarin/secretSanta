import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import './Collapse.scss'

export default function Collapse({ label, text }) {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="collapse" onClick={handleToggle}>
      <div className="collapse__titleContainer">
        <p className="collapse__title">{label}</p>
        {isOpen ? (
          <FontAwesomeIcon icon={faChevronUp} className="collapse__icon" />
        ) : (
          <FontAwesomeIcon icon={faChevronDown} className="collapse__icon" />
        )}
      </div>
      {isOpen && (
        <div>
          <div className="collapse__desc">{text}</div>
        </div>
      )}
    </div>
  )
}
