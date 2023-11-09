import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { doc, setDoc, collection } from 'firebase/firestore'
import { db } from '../../Firebase/Firebase'

export default function CreateSecretSanta() {
  const [total, setTotal] = useState(2)
  const [participants, setParticipants] = useState(
    Array.from({ length: 2 }, () => ({ email: '', firstName: '' }))
  )
  const [eventName, setEventName] = useState('')
  const [eventDesc, setEventDesc] = useState('')
  const [eventDate, setEventDate] = useState('')

  const today = new Date().toISOString().split('T')[0]

  const navigate = useNavigate()

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

  const generateSessionId = () => {
    const length = 8
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let code = ''

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length)
      code += characters.charAt(randomIndex)
    }
    return code
  }

  const addToFirebase = async () => {
    const session = {
      id: generateSessionId(),
      participant: participants,
      eventName: eventName,
      eventDesc: eventDesc,
      eventDate: eventDate,
    }

    try {
      const newDocRef = doc(collection(db, 'secretSanta'))
      await setDoc(newDocRef, session)

      console.log(
        "Document ajouté avec l'ID généré automatiquement :",
        newDocRef.id
      )

      navigate(`/CreateSecretSanta/${newDocRef.id}`)
    } catch (error) {
      console.error(
        "Erreur lors de l'enregistrement des données dans Firebase : ",
        error
      )
    }
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Créer un secret santa</h1>
      <div>
        <h2>Description de l'évènement</h2>
        <input
          type="text"
          name="event-name"
          id="event-name"
          placeholder="Nom de l'évènement"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />
        <input
          type="text"
          name="event-desc"
          id="event-desc"
          placeholder="Description"
          value={eventDesc}
          onChange={(e) => setEventDesc(e.target.value)}
        />
        <input
          type="date"
          name="event-date"
          id="event-date"
          placeholder="Date de l'événement"
          value={eventDate}
          onChange={handleEventDateChange}
        />
      </div>
      <div>
        <h2>Nombre de participants</h2>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button onClick={decrementTotal}>-</button>
          <p>{total}</p>
          <button onClick={incrementTotal}>+</button>
        </div>
      </div>
      <div>
        <h2>Participants</h2>
        {participants.map((participant, index) => (
          <div key={index}>
            <input
              type="text"
              id={`name_${index}`}
              placeholder="Prénom"
              value={participant.firstName}
              onChange={(e) => handleFirstNameChange(index, e.target.value)}
            />
            <input
              type="email"
              placeholder="Adresse e-mail"
              value={participant.email}
              id={`mail${index}`}
              onChange={(e) => handleEmailChange(index, e.target.value)}
            />
          </div>
        ))}
      </div>
      <button onClick={addToFirebase}>Créer</button>
    </div>
  )
}
