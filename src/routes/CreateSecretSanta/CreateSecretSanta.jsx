import React, { useState } from 'react'

import { doc, setDoc, updateDoc, collection, arrayUnion, query, getDocs, where } from 'firebase/firestore'

import { db, auth } from '../../firebase/Firebase'

import HeaderCard from '../../layout/HeaderCard/HeaderCard'
import Input from '../../components/Input/Input'
import emailjs from '@emailjs/browser';


import './CreateSecretSanta.scss'
import { useNavigate } from 'react-router-dom'

export default function CreateSecretSanta() {
  const [total, setTotal] = useState(2)
  const [participants, setParticipants] = useState(
    Array.from({ length: 2 }, () => ({ email: '', firstName: '' }))
  )
  const [eventName, setEventName] = useState('')
  const [eventDesc, setEventDesc] = useState('')
  const [eventDate, setEventDate] = useState('')

  const navigate = useNavigate();

  const today = new Date().toISOString().split('T')[0]

  const incrementTotal = () => {
    setTotal(total + 1)
    setParticipants([...participants, { email: '', firstName: '' }])
  }

  const decrementTotal = () => {
    if (total > 2) {
      setTotal(total - 1)
      setParticipants(participants.slice(0, participants.length - 1))
    }
  }

  const handleEmailChange = (index, email) => {
    const updatedParticipants = [...participants]
    updatedParticipants[index].email = email
    setParticipants(updatedParticipants)
  }

  const handleFirstNameChange = (index, firstName) => {
    const updatedParticipants = [...participants]
    updatedParticipants[index].firstName = firstName
    setParticipants(updatedParticipants)
  }

  const handleEventDateChange = (e) => {
    const enteredDate = e.target.value

    if (enteredDate < today) {
      alert("La date de l'événement ne peut pas être antérieure à aujourd'hui.")
    } else {
      setEventDate(enteredDate)
    }
  }

  const generateSessionId = (length) => {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let code = ''

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length)
      code += characters.charAt(randomIndex)
    }
    return code
  }

  const generateParticipantsArray = () => {
    const arrayBuff = []

    participants.forEach((element) => {
      arrayBuff.push({
        name: element.firstName,
        email: element.email,
        id: generateSessionId(6),
        isProfilCompleted: false,
        giftedIdeas: []
      })
    })
    return arrayBuff;
  }

  const addToFirebase = async (event) => {
    event.preventDefault()
    const session = {
      id: generateSessionId(8),
      participants: generateParticipantsArray(participants),
      exclusionArray: [],
      priceArray: [],
      eventName: eventName,
      eventDesc: eventDesc,
      eventDate: eventDate,
    }

    try {
      const newDocRef = doc(collection(db, 'secretSanta'));
      await setDoc(newDocRef, session);
      const newDocId = newDocRef.id;
      session.participants.forEach((element) => {
        emailjs.send(
          "service_ktjeuxa",
          "template_bklalgq",
          {
            receiver_email: element.email,
            receiver: element.name,
            organisator: auth.currentUser?.displayName,
            date: eventDate,
            password: session.id + element.id,
            link: 'https://ho-ho.site/summary/' + session.id + '/' + element.id
          },
          "yF0RNO3NA52uH5dgL");
      })

      const usersCollectionRef = collection(db, 'users');
      const q = query(usersCollectionRef, where('uid', '==', auth.currentUser.uid));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const userDocRef = querySnapshot.docs[0].ref;
        await updateDoc(userDocRef, {
          secretSantaSessionId: arrayUnion(newDocId),
        });
      }
      navigate(`/summary/${session.id}/${session.participants[0].id}`);
    } catch (error) {
      console.error(
        "Erreur lors de l'enregistrement des données dans Firebase : ",
        error
      );
    }
  };

  return (
    <div className='create'>
      <form onSubmit={addToFirebase} className="form">
        <HeaderCard mainTitle={'Create my Secret Santa'} />
        <div>
          <div className="titles">
            <h2 className="form__title--white">Tell us more about your</h2>
            <h2 className="form__title--yellow">Secret Santa</h2>
          </div>
          <div className="form__group">
            <Input
              type={'text'}
              placeholder={'Name of the event*'}
              onChange={(e) => setEventName(e.target.value)}
              value={eventName}
              name="event-name"
              id="event-name"
              required={true}
            />
            <Input
              type={'text'}
              name="event-desc"
              id="event-desc"
              placeholder="Description"
              value={eventDesc}
              onChange={(e) => setEventDesc(e.target.value)}
            />
          </div>
          <h2 className="form__catTitle">
            <span className="info__title--white">When is your </span>
            <span className="info__title--yellow">Secret Santa?</span>
          </h2>
          <Input
            type={'date'}
            name="event-date"
            id="event-date"
            placeholder="Date of the event"
            value={eventDate}
            onChange={(e) => handleEventDateChange(e)}
          />
        </div>
        <div className="participant">
          <h2 className="form__catTitle">
            <span className="info__title--white">Who is </span>
            <span className="info__title--yellow">invited?</span>
          </h2>
          <div className="participant__buttonContainer">
            <button onClick={decrementTotal} className="participant__button">
              -
            </button>
            <h2 className="participant__number">{total}</h2>
            <button onClick={incrementTotal} className="participant__button">
              +
            </button>
          </div>
        </div>
        <div>
        </div>
        <div>
          {participants.map((participant, index) => (
            <div key={index} className="participant__container">
              <p className='participant__index'>{index + 1}.</p>
              <Input
                type="text"
                id={`name_${index}`}
                placeholder="Prénom"
                value={participant.firstName}
                onChange={(e) => handleFirstNameChange(index, e.target.value)}
                required={true}
              />
              <Input
                type="email"
                placeholder="Adresse e-mail"
                value={participant.email}
                id={`mail${index}`}
                onChange={(e) => handleEmailChange(index, e.target.value)}
                required={true}
              />
            </div>
          ))}
        </div>
        <button type="submit" className='form__button'>Create</button>
      </form>
    </div>
  )
}

// ! Cette fonction ne sert qu'a tester l'algo de la fonction attribution

// const attribution_test = () => {
//     var nbTry = 100000; // eviter de dépasser les 100K
//     var fail = 0;

//     const checkAutoGift = (result) => {
//         for (var i = 0; i !== result.length; i++) {
//             if (result[i].gifted === result[i].gifter)
//             return -1;
//         }
//         return 1;
//     }

//     for (var i = 0; i !== nbTry; i++) {
//         const result = attribution();
//         if (checkAutoGift(result) === -1) {
//             fail++;
//             console.log(result);
//         }
//     }

//     console.log("algo fail " +  fail + " times for " + nbTry + " tests");
// }
