import React from 'react'

import Button from '../../components/Button/Button'
import LogoutButton from '../LogOut/Logout'

import './Profile.scss'

export default function Profil() {
  return (
    <div className="profile">
      <h1>My profile</h1>
      <div className="profile__container">
        <div className="profile__infos">
          <img src="/assets/elf.png" alt="elf" />
          <div className="profile__name">
            <p className="profile__fname">Lucas</p>
            <Button className={'button__profile'}>Edit profile</Button>
          </div>
        </div>
        <p className="profile__email">monadressemail@mail.fr</p>
        {LogoutButton()}
      </div>
    </div>
  )
}
