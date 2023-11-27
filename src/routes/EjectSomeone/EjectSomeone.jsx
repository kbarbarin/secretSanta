import React from 'react'
import './EjectSomeone.scss'

function EjectSomeone() {
  const names = ['Hassan', 'Lucas', 'Jean-Mathieu', 'Killian', 'Audrey', 'Léo']

  return (
    <div className="ejectSomeonePage">
      <h1>You don't want to run into someone?</h1>
      <p>
        All you have to do is click on his name, and you will have a better
        chance of not coming across it.
      </p>
      <div className="list">
        {names.map((name, index) => (
          <button key={index}>{name}</button>
        ))}
      </div>
      <button className="noEject">I WANT TO EJECT NOBODY</button>
    </div>
  )
}

export default EjectSomeone
