import React, { useRef } from 'react'

import HeaderCard from '../../layout/HeaderCard/HeaderCard'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'

import './Join.scss'

export default function Join() {
  const sessionIdRef = useRef(null)

  const handleJoinSession = () => {
    console.log(sessionIdRef.current.value)
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
