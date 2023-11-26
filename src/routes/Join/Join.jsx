import React, { useRef } from 'react'

import { collection, getDocs } from 'firebase/firestore'

import { db } from '../../firebase/Firebase'

import HeaderCard from '../../layout/HeaderCard/HeaderCard'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'

import './Join.scss'

export default function Join() {
  const sessionIdRef = useRef(null)

  const handleJoinSession = async () => {
    const enteredCode = sessionIdRef.current.value

    try {
      const participantsCollection = await getDocs(
        collection(db, 'secretSanta')
      )

      participantsCollection.forEach((participantDoc) => {
        const participantData = participantDoc.data()

        console.log(participantData.participants)

        if (participantData) {
          const giftedIdeas = participantData.giftedIdeas

          console.log(giftedIdeas)

          const isCodeValid =
            giftedIdeas &&
            giftedIdeas.some((giftedIdea) => giftedIdea.id === enteredCode)

          if (isCodeValid) {
            console.log('Code valide. Faites ce que vous devez faire ici.')
          } else {
            console.log('Code invalide')
          }
        }
      })
    } catch (error) {
      console.error('Erreur lors de la récupération des participants', error)
    }
  }

  return (
    <div className="join">
      <HeaderCard secondaryTitle={'Enter your verification code'} />
      <p>We sent the code in the email of invitation</p>
      <Input
        placeholder={'Code'}
        name="code"
        id="code"
        type="string"
        required={true}
        inputRef={sessionIdRef}
      />
      <Button className="button__color--primary" onClick={handleJoinSession}>
        Submit
      </Button>
    </div>
  )
}
