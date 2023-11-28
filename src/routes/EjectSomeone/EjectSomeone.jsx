import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import './EjectSomeone.scss'

function EjectSomeone() {
  const { state } = useLocation();
  const { secretSanta, id, userid } = state;
  const [names, setNames] = useState([]);

  useEffect(() => {
    setNames(secretSanta.participants.filter((obj) => obj.id !== userid));
  }, [secretSanta])

  const excludeSomeOne = (name) => {
    
  }

  return (
    <div className="ejectSomeonePage">
      <h1>You don't want to run into someone?</h1>
      <p>
        All you have to do is click on his name, and you will have a better
        chance of not coming across it.
      </p>
      <div className="list">
        {names.map((name) => (
          <button key={name.id} onClick={() => excludeSomeOne(name.name)}>{name.name}</button>
        ))}
      </div>
      <button className="noEject">I WANT TO EJECT NOBODY</button>
    </div>
  )
}

export default EjectSomeone
