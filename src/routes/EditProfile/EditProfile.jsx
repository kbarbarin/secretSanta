import React, { useRef, useState } from 'react'
import {
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
  updateEmail,
  updateProfile,
} from 'firebase/auth'
import { doc, updateDoc } from 'firebase/firestore'
import { db, auth } from '../../firebase/Firebase'

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
        await updateDoc(userDocRef, { name: newName })
        setMessage('Nom mis à jour avec succès.')
      }
      if (newEmail !== '') {
        if (newEmail !== user.email) {
          await updateProfile(user, { email: newEmail })
          console.log('Email updated successfully in Firebase profile.')

          const userDocRef = doc(db, 'users', user.uid)
          await updateDoc(userDocRef, { email: newEmail })
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
    <div>
      <h1>Modifier le profil</h1>

      <form onSubmit={updateProfileDetails}>
        <input type="text" placeholder="Nouveau nom" ref={nameRef} />
        <input type="email" placeholder="Nouvel e-mail" ref={emailRef} />
        <input
          type="password"
          placeholder="Mot de passe actuel pour la ré-authentification"
          ref={passwordRef}
        />
        <input
          type="password"
          placeholder="Nouveau mot de passe"
          ref={newPasswordRef}
        />

        <button type="submit" disabled={loading}>
          Mettre à jour le profil
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  )
}