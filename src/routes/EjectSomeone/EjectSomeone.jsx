import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

import { updateDoc, collection, arrayUnion, query, getDocs, where } from 'firebase/firestore';

import { db } from '../../firebase/Firebase'

import './EjectSomeone.scss'

function EjectSomeone() {
  const { state } = useLocation();
  const { secretSanta, id, userid } = state;
  const navigate = useNavigate();
  const [names, setNames] = useState([]);

  useEffect(() => {
    setNames(secretSanta.participants.filter((obj) => obj.id !== userid));
  }, [secretSanta, userid])

  const excludeSomeOne = async (name) => {
    const user = secretSanta.participants.filter((obj) => obj.id === userid)
    const usersCollectionRef = collection(db, 'secretSanta');
      const q = query(usersCollectionRef, where('id', '==', id));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const userDocRef = querySnapshot.docs[0].ref;
        await updateDoc(userDocRef, {exclusionArray: arrayUnion({name: user[0].name, exclude: name})});
      }
      navigate(`/quiz`, {state: {id, userid}});
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
      <button onClick={() => navigate('/quiz')}className="noEject">I WANT TO EJECT NOBODY</button>
    </div>
  )
}

export default EjectSomeone
