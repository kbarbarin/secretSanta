import React, { useRef } from 'react'

import { collection, getDocs, query, where } from 'firebase/firestore'

import { db } from '../../firebase/Firebase'

import HeaderCard from '../../layout/HeaderCard/HeaderCard'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'

import './Join.scss'
import { useNavigate } from 'react-router-dom'

export default function Join() {
  const sessionIdRef = useRef(null)
  const navigate = useNavigate()

  const handleJoinSession = async () => {

    function splitString(str) {
      const firstPart = str.substring(0, 8);
      const secondPart = str.substring(8);

      return [firstPart, secondPart];
    }

    const [firstPart, secondPart] = splitString(sessionIdRef.current.value);
    navigate(`/summury/${firstPart}/${secondPart}`)
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
