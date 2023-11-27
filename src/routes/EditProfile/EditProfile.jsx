import React, { useRef, useState } from 'react'
import {
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
  updateProfile,
} from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { db, auth } from '../../firebase/Firebase'

import Input from '../../components/Input/Input'

import './EditProfile.scss'

export default function EditProfile() {
  const nameRef = useRef(null)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const newPasswordRef = useRef(null)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const updateProfileDetails = async (e) => {
    e.preventDefault()

    const user = auth.currentUser

    try {
      setLoading(true)

      const newName = nameRef.current.value.trim()
      const newEmail = emailRef.current.value.trim()
      const newPassword = newPasswordRef.current.value

      const credential = EmailAuthProvider.credential(
        user.email,
        passwordRef.current.value
      )
      await reauthenticateWithCredential(user, credential)

      if (newName !== '') {
        const userDocRef = doc(db, 'users', user.uid)
        await setDoc(userDocRef, { name: newName }, { merge: true })
        setMessage('Nom mis à jour avec succès.')
      }
      if (newEmail !== '') {
        if (newEmail !== user.email) {
          await updateProfile(user, { email: newEmail })
          console.log('Email updated successfully in Firebase profile.')

          const userDocRef = doc(db, 'users', user.uid)
          await setDoc(userDocRef, { email: newEmail }, { merge: true })
          console.log('Email updated successfully in Firestore.')
        }
      }

      if (newPassword !== '') {
        await updatePassword(user, newPassword)
        setMessage('Mot de passe mis à jour avec succès.')
      }

      setMessage('Profil mis à jour avec succès')
    } catch (error) {
      console.error("Code d'erreur:", error.code)
      console.error("Message d'erreur:", error.message)

      setMessage(`Erreur lors de la mise à jour du profil : ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='edit'>
      <h1>Edit Profile</h1>
      <img src="/assets/elf.png" alt="elf" />
      <form onSubmit={updateProfileDetails}>
        <h2>Name</h2>
        <Input type="text" placeholder="Nouveau nom" inputRef={nameRef} />
        <h2>Email</h2>
        <Input type="email" placeholder="Nouvel e-mail" inputRef={emailRef} />
        <h2>Old password</h2>
        <Input
          type="password"
          placeholder="Mot de passe actuel pour la ré-authentification"
          inputRef={passwordRef}
        />
        <h2>New Password</h2>
        <Input
          type="password"
          placeholder="Nouveau mot de passe"
          inputRef={newPasswordRef}
        />
        {message && <p>{message}</p>}
        <input type="submit" value="EDIT MY PROFILE" />
      </form>
    </div>
  )
}
