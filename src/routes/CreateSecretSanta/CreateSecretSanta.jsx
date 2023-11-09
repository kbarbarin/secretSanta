import React, { useState } from 'react'

export default function CreateSecretSanta() {
  const [total, setTotal] = useState(2)
  const [participants, setParticipants] = useState(
    Array.from({ length: 2 }, () => ({ email: '', firstName: '' }))
  )

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

  console.log(participants)

  return (
    <>
      <h1>Créer un secret santa</h1>
      <div>
        <h2>Description de l'évènement</h2>
      </div>
      <div>
        <h2>Nombre de participants</h2>
        <div style={{ display: 'flex' }}>
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
    </>
  )
}
