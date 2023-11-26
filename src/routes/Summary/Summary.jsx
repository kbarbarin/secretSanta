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
  const [ready, setReady] = useState(0)
  const [loader, setLoader] = useState(true)

  useEffect(() => {
    const getSecretSanta = async () => {
      const usersCollectionRef = collection(db, 'secretSanta')
      const q = query(usersCollectionRef, where('id', '==', id))
      const querySnapshot = await getDocs(q)
      setSecretSanta(querySnapshot.docs[0].data())
      console.log(querySnapshot.docs[0].data())
      console.log(
        querySnapshot.docs[0]
          .data()
          ?.participants?.filter((obj) => obj.isProfilCompleted === true)
      )
      setReady(
        querySnapshot.docs[0]
          .data()
          ?.participants?.filter((obj) => obj.isProfilCompleted === true)
      )
      setLoader(false)
    }
    getSecretSanta()
  }, [id])

  return (
    <>
      {loader ? (
        <p>loading</p>
      ) : (
        <div className="summary">
          <HeaderCard
            mainTitle={secretSanta?.eventName}
            titleDesc={'by ' + secretSanta?.participants[0]?.name}
            className="summary__headerCard"
          />
          <HeaderSummary
            eventDate={secretSanta.eventDate}
            name={secretSanta.eventName}
          />
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
          <div className="summary__desc">
            <p className="summary__descTitle">Description:</p>
            <p className="summary__descContent">{secretSanta?.eventDesc}</p>
          </div>
          <div className="summary__invited">
            <h2>Elf invited:</h2>
            <div className="summary__recap">
              <img src="/assets/elf.png" alt="elf" />
              {secretSanta?.participants?.map((participant) => (
                <div key={participant.id} className="summary__participant">
                  <h3 className="summary__pName">{participant.name}</h3>
                  <h3
                    className={
                      participant.isProfilCompleted
                        ? 'summary__participant--ready'
                        : 'summary__participant--notReady'
                    }
                  >
                    {participant.isProfilCompleted ? 'Ready !' : 'Waiting...'}
                  </h3>
                </div>
              ))}
            </div>
          </div>
          {ready.length !== secretSanta.participants.length && (
            <p className="summary__sentence">
              We are waiting for <b>everyone</b> to join the event!
            </p>
          )}
        </div>
      )}
    </>
  )
}
