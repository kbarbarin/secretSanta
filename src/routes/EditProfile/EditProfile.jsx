import React, { useRef, useState } from 'react'
import {
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
} from 'firebase/auth'
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'
import { db, auth } from '../../firebase/Firebase'

import Input from '../../components/Input/Input'

import './EditProfile.scss'

export default function EditProfile() {
  const nameRef = useRef(null)
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
      const newPassword = newPasswordRef.current.value

      const credential = EmailAuthProvider.credential(
        user.email,
        passwordRef.current.value
      )
      await reauthenticateWithCredential(user, credential)

      if (newName !== '') {
        // Requête pour obtenir l'ID du document de l'utilisateur
        const q = query(
          collection(db, 'users'),
          where('email', '==', user.email)
        )
        const querySnapshot = await getDocs(q)
        let userId
        querySnapshot.forEach((doc) => {
          // doc.data() est jamais undefined pour les requêtes de documents
          console.log(doc.id, ' => ', doc.data())
          userId = doc.id
        })

        const userDocRef = doc(db, 'users', userId)
        await updateDoc(userDocRef, { name: newName })
        setMessage('Nom mis à jour avec succès.')
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
    <div className="edit">
      <h1>Edit Profile</h1>
      <img src="/assets/elf.png" alt="elf" />
      <form onSubmit={updateProfileDetails}>
        <h2>Name</h2>
        <Input type="text" placeholder="Nouveau nom" inputRef={nameRef} />
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
