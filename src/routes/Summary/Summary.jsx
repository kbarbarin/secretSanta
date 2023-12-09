import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { collection, where, getDocs, query, updateDoc } from 'firebase/firestore'
import emailjs from '@emailjs/browser';

import HeaderCard from '../../layout/HeaderCard/HeaderCard'
import HeaderSummary from '../../components/HeaderSummary/HeaderSummary'
import { db } from '../../firebase/Firebase'

import './Summary.scss'

export default function Summary() {
  const { id, userid } = useParams()
  const navigate = useNavigate()
  const [secretSanta, setSecretSanta] = useState({})
  const [ready, setReady] = useState([])
  const [loader, setLoader] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
  })


  const attribution = () => {
    const gifter = secretSanta.participants // mettre le tableau participants
    const gifted = [...gifter]
    const assossiationArray = [] // tableau d'objet gifter, gifted
    const size = gifter.length

    function getRandomInt(max) {
      return Math.floor(Math.random() * max)
    }

    for (var i = 0; i < size - 2; i++) {
      var gifterIndex = 0
      var giftedIndex = 0

      while (gifter[gifterIndex] === gifted[giftedIndex]) {
        gifterIndex = getRandomInt(size - i)
        giftedIndex = getRandomInt(size - i)
      }
      assossiationArray.push({
        gifter: gifter[gifterIndex],
        gifted: gifted[giftedIndex],
      })
      gifter.splice(gifterIndex, 1)
      gifted.splice(giftedIndex, 1)
    }
    if (gifter[0] === gifted[0] || gifter[1] === gifted[1]) {
      assossiationArray.push({ gifter: gifter[0], gifted: gifted[1] })
      assossiationArray.push({ gifter: gifter[1], gifted: gifted[0] })
    } else {
      assossiationArray.push({ gifter: gifter[0], gifted: gifted[0] })
      assossiationArray.push({ gifter: gifter[1], gifted: gifted[1] })
    }
    console.table('assossiation', assossiationArray)
    return assossiationArray
  }

  useEffect(() => {
    const getSecretSanta = async () => {
      const usersCollectionRef = collection(db, 'secretSanta')
      const q = query(usersCollectionRef, where('id', '==', id))
      const querySnapshot = await getDocs(q)
      setSecretSanta(querySnapshot.docs[0].data())
      console.log(querySnapshot.docs[0].data())
      setReady(querySnapshot.docs[0].data()?.participants?.filter((obj) => obj.isProfilCompleted === true))
      setLoader(false)
    }
    getSecretSanta()
  }, [id])

  useEffect(() => {
    if (ready.length === secretSanta?.participants?.length) {
      // send mail and set attribution
      secretSanta.participants.forEach((element) => {
        emailjs.send(
          "service_ktjeuxa",
          "template_r7yfahp",
          {
            receiver_email: element.email,
            receiver: element.name,
            link: 'https://ho-ho.site/reveal/' + secretSanta.id + '/' + element.id
          },
          "yF0RNO3NA52uH5dgL");
      })
      const asyncFunc = async () => {
        const usersCollectionRef = collection(db, 'secretSanta');
        const q = query(usersCollectionRef, where('id', '==', secretSanta.id));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const userDocRef = querySnapshot.docs[0].ref;
          await updateDoc(userDocRef, { attributionArray: attribution() });
        }
      }
      asyncFunc();
    }
    // eslint-disable-next-line
  }, [ready, secretSanta]);


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
            <h1>Elf invited:</h1>
            <div className="summary__recap">
              <img src="/assets/elf.png" alt="elf" />
              {secretSanta?.participants?.map((participant) => (
                <div key={participant.id} className="summary__participant">
                  <h3 className="summary__pName">{participant.name}</h3>
                  {participant.id === userid && !participant.isProfilCompleted ?
                    <button onClick={() => navigate('/ejectsomeone', { state: { secretSanta, id, userid } })} className="summary__startButton">START</button>
                    : <h3
                      className={
                        participant.isProfilCompleted
                          ? 'summary__participant--ready'
                          : 'summary__participant--notReady'
                      }
                    >
                      {participant.isProfilCompleted ? 'Ready !' : 'Waiting'}
                      {!participant.isProfilCompleted && (
                        <span className="waiting-animation">
                          <span>.</span>
                          <span>.</span>
                          <span>.</span>
                        </span>
                      )}
                    </h3>}
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
