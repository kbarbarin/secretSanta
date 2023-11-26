import React from 'react'

import HeaderCard from '../../layout/HeaderCard/HeaderCard'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'

import './Join.scss'

export default function Join() {
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
      />
      <Button className="button__color--primary">Submit</Button>
    </div>
  )
}
