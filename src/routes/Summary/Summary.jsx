import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { collection, where, getDocs, query } from 'firebase/firestore'

import HeaderCard from '../../layout/HeaderCard/HeaderCard'
import HeaderSummary from '../../components/HeaderSummary/HeaderSummary'
import { db } from '../../firebase/Firebase'

import './Summary.scss'

export default function Summary() {
  const { id, userid } = useParams()
  const [secretSanta, setSecretSanta] = useState({})
  const [ready, setReady] = useState(0);

  useEffect(() => {
    const getSecretSanta = async () => {
      const usersCollectionRef = collection(db, 'secretSanta')
      const q = query(usersCollectionRef, where('id', '==', id))
      const querySnapshot = await getDocs(q)
      setSecretSanta(querySnapshot.docs[0].data())
      console.log(querySnapshot.docs[0].data());
      console.log(querySnapshot.docs[0].data()?.participants?.filter(obj => obj.isProfilCompleted === true));
      setReady(querySnapshot.docs[0].data()?.participants?.filter(obj => obj.isProfilCompleted === true));
    }
    getSecretSanta()
  }, [])

  return (
    <div className="summary">
      <HeaderCard
        mainTitle={secretSanta?.eventName}
        titleDesc={'by Lucas'}
        className="summary__headerCard"
      />
      <HeaderSummary />
      <div className="summary__participants">
        <div className="summary__pill">
          <p>{secretSanta?.participants?.length}</p>
          <p>Invited</p>
        </div>
        <div className="summary__pill">
          <p>{ready.length}</p>
          <p>Ready</p>
        </div>
      </div>
      <div className="summary_desc">
        <p className="summary__descTitle">Description:</p>
        <p className="summary__descContent">
          {secretSanta?.eventDesc}
        </p>
      </div>
    </div>
  )
}
