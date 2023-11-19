import React from 'react'

import { useNavigate } from 'react-router-dom'

import Button from '../../components/Button/Button'
import LogoutButton from '../LogOut/Logout'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

import './Profile.scss'

export default function Profil() {
  const sessions = ['mon ss 1', 'mon ss 2', 'mon ss 3']
  const navigate = useNavigate()

  const redirectToCreate = () => {
    navigate('/create')
  }
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
      <div className="sessions">
        <h2>My Secret Santa</h2>
        {sessions.map((session, index) => (
          <div className="sessions__recap" key={index}>
            <Button className="button__tertiary">{session}</Button>
            <FontAwesomeIcon icon={faTrash} className="sessions__icon" />
          </div>
        ))}
        <Button
          className="button__color--primary bottom"
          onClick={redirectToCreate}
        >
          Create a Secret Santa
        </Button>
      </div>
    </div>
  )
}
