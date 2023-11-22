import React, { useRef, useState } from 'react'
import {
  updateEmail,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from 'firebase/auth'
import { doc, updateDoc } from 'firebase/firestore'
import { db, auth } from '../../firebase/Firebase'

export default function EditProfile() {
  const nameRef = useRef(null)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const [message, setMessage] = useState('')

  const updateProfile = async (e) => {
    e.preventDefault()

    const user = auth.currentUser
    const credential = EmailAuthProvider.credential(
      user.email,
      passwordRef.current.value
    )

    try {
      await reauthenticateWithCredential(user, credential)

      if (nameRef.current.value !== '') {
        const userDocRef = doc(db, 'users', user.uid)
        await updateDoc(userDocRef, { name: nameRef.current.value })
      }

      if (emailRef.current.value !== '') {
        await updateEmail(user, emailRef.current.value)
      }

      if (passwordRef.current.value !== '') {
        await updatePassword(user, passwordRef.current.value)
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
          placeholder="Current Password"
          ref={passwordRef}
          required
        />

        <input type="submit" value="Update Profile" />
      </form>

      {message && <p>{message}</p>}
    </div>
  )
}
