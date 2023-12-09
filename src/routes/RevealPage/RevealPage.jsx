import React, { useState, useParams, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, where, getDocs, query } from 'firebase/firestore'

import Button from '../../components/Button/Button'
import { db } from '../../firebase/Firebase'
import './RevealPage.scss'

export default function RevealPage() {
  const { id, userid } = useParams()
  const navigate = useNavigate()
  const [giftPeople, setGiftPeople] = useState('');
  const [giftRecomandation, setGiftRecomandation] = useState('');
  const [priceRange, setPriceRange] = useState(15);
  const [loader, setLoader] = useState(true)

  useEffect(() => {
    const getSecretSanta = async () => {
      const usersCollectionRef = collection(db, 'secretSanta')
      const q = query(usersCollectionRef, where('id', '==', id))
      const querySnapshot = await getDocs(q)
      const myName = querySnapshot.docs[0].data().participants.filter(elem => (elem.gifter.id === userid))
      setGiftPeople(myName[0].gifted.name);
      setGiftRecomandation(myName[0].gifted.giftedIdeas);
      setPriceRange(calculerMoyenne(querySnapshot.docs[0].data()?.priceArray));
      setLoader(false)
    }
    getSecretSanta()
  }, [id, userid])

    const calculerMoyenne = (priceArray) => {
      if (priceArray.length === 0)
        return null;
      const moyenne = priceArray.reduce((sum, element) => sum + element, 0) / priceArray.length;
      return moyenne;
    }

  return (
    <>
      {loader ?
        <div className="revealPage">
          <h1>Your Secret Santa is...</h1>
          <div className='revealBall'>
            <img src="/assets/reveal.png" alt="reveal" />
            <h2>{giftPeople}</h2>
          </div>
          <Button onClick={() => navigate('/giftideas', { state: { priceRange, recommandations: giftRecomandation } })} className="revealBtn">NEED ANY IDEAS? CLICK ME!</Button>
        </div>
        : <p>loading</p>
      }
    </>
  )
}
