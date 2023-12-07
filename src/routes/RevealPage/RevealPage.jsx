import React, { useState } from 'react'
import './RevealPage.scss'
import Button from '../../components/Button/Button'
import { useNavigate } from 'react-router-dom'

function RevealPage() {
  const { id, userid } = useParams()
  const navigate = useNavigate()
  const [secretSanta, setSecretSanta] = useState({})
  const [giftPeople, setGiftPeople] = useState('');
  const [priceRange, setPriceRange] = useState(15);
  const [loader, setLoader] = useState(true)

  useEffect(() => {
    const getSecretSanta = async () => {
      const usersCollectionRef = collection(db, 'secretSanta')
      const q = query(usersCollectionRef, where('id', '==', id))
      const querySnapshot = await getDocs(q)
      setSecretSanta(querySnapshot.docs[0].data())
      const myName = querySnapshot.docs[0].data().participants.filter(elem => (elem.gifter.id === userid))
      setGiftPeople(myName[0].gifted.name);
      setPriceRange(calculerMoyenne(querySnapshot.docs[0].data()?.priceArray));
      setLoader(false)
    }
    getSecretSanta()
  }, [id])

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
          <Button onClick={() => navigate('/giftideas', { state: { priceRange, recommandations } })} className="revealBtn">NEED ANY IDEAS? CLICK ME!</Button>
        </div>
        : <p>loading</p>
      }
    </>
  )
}

export default RevealPage;
