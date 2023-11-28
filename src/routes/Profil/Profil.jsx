import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import {
  collection,
  getDocs,
  query,
  where,
  getDoc,
  doc,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore'

import { db, auth } from '../../firebase/Firebase'

import Button from '../../components/Button/Button'
import LogoutButton from '../LogOut/Logout'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

import './Profile.scss'

export default function Profil() {
  const [userData, setUserData] = useState(null)
  const [sessionData, setSessionData] = useState([])
  const [loader, setLoader] = useState(true)

  const navigate = useNavigate()

  const redirectToCreate = () => {
    navigate('/create')
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userUid = auth.currentUser.uid
        const data = await getUserData(userUid)
        const newSessionData = await getSessionData(data.secretSantaSessionId)

        setSessionData(() => newSessionData)
      } catch (error) {
        console.error("Can't fetch data", error)
      }

      setLoader(false)
    }

    fetchData()
  }, [])

  const getUserData = async (userUid) => {
    const usersCollection = collection(db, 'users')
    const querySnapshot = await getDocs(
      query(usersCollection, where('uid', '==', userUid))
    )

    const userDataBuff = []
    querySnapshot.forEach((doc) => {
      userDataBuff.push({ id: doc.id, ...doc.data() })
    })
    setUserData(userDataBuff[0])
    return userDataBuff[0]
  }
  const getSessionData = async (data) => {
    const arraybuff = []

    const promises = data.map(async (element) => {
      const sessionRef = collection(db, 'secretSanta')
      const sessionDocRef = doc(sessionRef, element)
      const docSnapshot = await getDoc(sessionDocRef)

      if (docSnapshot.exists()) {
        arraybuff.push(docSnapshot.data())
      } else {
        console.error('Error while retrieving session data')
      }
    })

    await Promise.all(promises)

    return arraybuff
  }

  const deleteSessionIdFromUser = async (sessionId) => {
    try {
      const usersCollection = collection(db, 'users')
      const querySnapshot = await getDocs(
        query(usersCollection, where('uid', '==', auth.currentUser.uid))
      )

      // Get the user document
      const userDoc = querySnapshot.docs[0]

      if (userDoc) {
        // Update the user document to remove the session ID
        const userRef = doc(usersCollection, userDoc.id)
        const updatedSessionIds = userDoc
          .data()
          .secretSantaSessionId.filter((id) => id !== sessionId)

        await updateDoc(userRef, { secretSantaSessionId: updatedSessionIds })
      } else {
        console.error('User not found for updating session ID')
      }
    } catch (error) {
      console.error('Error updating user document:', error)
    }
  }

  const deleteSession = async (sessionId) => {
    try {
      // Delete the session from Firebase
      const sessionRef = collection(db, 'secretSanta')
      const sessionDocRef = query(sessionRef, where('id', '==', sessionId))
      const querySnapshot = await getDocs(sessionDocRef)

      const docToDelete = querySnapshot.docs[0]
      await deleteDoc(docToDelete.ref)
      // Update the state to remove the deleted session
      const updatedSessionData = sessionData.filter(
        (session) => session.id !== sessionId
      )
      await deleteSessionIdFromUser(docToDelete.id)
      setSessionData(updatedSessionData)
    } catch (error) {
      console.error('Error deleting session:', error)
    }
  }

  const openSecretSanta = (index) => {
    const sessionId = sessionData[index].id
    const userId = sessionData[index].participants[0].id
    navigate(`/summary/${sessionId}/${userId}`)
  }

  const handleGoModification = () => {
    navigate('/modification')
  }

  return (
    <>
      {loader ? (
        <div>Profile is loading...</div>
      ) : (
        <div className="profile">
          <h1>My profile</h1>
          <div className="profile__container">
            <div className="profile__infos">
              <img src="/assets/elf.png" alt="elf" />
              <div className="profile__name">
                <p className="profile__fname">{userData.name.split(' ')[0]}</p>
                <Button
                  onClick={handleGoModification}
                  className={'button__profile'}
                >
                  Edit profile
                </Button>
              </div>
            </div>
            <p className="profile__email">{userData.email}</p>
            <LogoutButton />
          </div>
          <div className="sessions">
            <h2>My Secret Santa</h2>
            {sessionData?.map((session, index) => (
              <div className="sessions__recap" key={session.id}>
                <Button
                  onClick={() => {
                    openSecretSanta(index)
                  }}
                  className="button__tertiary"
                >
                  {session.eventName}
                </Button>
                <FontAwesomeIcon
                  icon={faTrash}
                  className="sessions__icon"
                  onClick={() => deleteSession(session.id)}
                />
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
      )}
    </>
  )
}
