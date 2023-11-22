import React, { useRef, useState } from 'react'
import { updateEmail, updatePassword } from 'firebase/auth'
import { doc, updateDoc } from 'firebase/firestore'
import { db, auth } from '../../firebase/Firebase'

export default function EditProfile() {
  const nameRef = useRef(null)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const newPasswordRef = useRef(null)
  const [message, setMessage] = useState('')

  const updateProfile = async (e) => {
    e.preventDefault()

    const user = auth.currentUser

    try {
      // Collecter les nouvelles informations du profil
      const newName = nameRef.current.value
      const newEmail = emailRef.current.value
      const newPassword = newPasswordRef.current.value

      // Mettre à jour le nom dans Firestore si fourni
      if (newName !== '') {
        const userDocRef = doc(db, 'users', user.uid)
        await updateDoc(userDocRef, { name: newName })
      }

      // Mettre à jour l'email si fourni
      if (newEmail !== '') {
        await updateEmail(user, newEmail)
      }

      // Mettre à jour le mot de passe si fourni
      if (newPassword !== '') {
        await updatePassword(user, newPassword)
      }

      setMessage('Profile updated successfully')
    } catch (error) {
      console.error('Error code:', error.code)
      console.error('Error message:', error.message)
      setMessage(`Error updating profile: ${error.message}`)
    }
  }

  return (
    <div>
      <h1>Edit Profile</h1>

      <form onSubmit={updateProfile}>
        <input type="text" placeholder="New Name" ref={nameRef} />
        <input type="email" placeholder="New Email" ref={emailRef} />
        <input
          type="password"
          placeholder="New Password"
          ref={newPasswordRef}
        />

        <input type="submit" value="Update Profile" />
      </form>

      {message && <p>{message}</p>}
    </div>
  )
}
