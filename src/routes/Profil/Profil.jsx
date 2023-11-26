import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import {
  collection,
  getDocs,
  query,
  where,
  getDoc,
  doc,
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
        await getSessionData(data.secretSantaSessionId)
      } catch (error) {
        console.error("Can't fetch data", error)
      }
      console.log(sessionData);
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
    const arraybuff = [];

    // Use map to create an array of promises
    const promises = data.map(async (element) => {
      const sessionRef = collection(db, 'secretSanta');
      const sessionDocRef = doc(sessionRef, element);
      const docSnapshot = await getDoc(sessionDocRef);

      if (docSnapshot.exists()) {
        arraybuff.push(docSnapshot.data());
      } else {
        console.error('Error while retrieving session data');
      }
    });

    // Wait for all promises to resolve
    await Promise.all(promises);

    // Update the state after all asynchronous operations are done
    setSessionData(arraybuff);
  };

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
                <p className="profile__fname">
                  {userData.name.split(' ')[0]}
                </p>
                <Button className={'button__profile'}>Edit profile</Button>
              </div>
            </div>
            <p className="profile__email">{userData.email}</p>
            <LogoutButton />
          </div>
          <div className="sessions">
            <h2>My Secret Santa</h2>
            {sessionData?.map((session, index) => (
              <div className="sessions__recap" key={index}>
                <Button className="button__tertiary">{session.eventName}</Button>
                <FontAwesomeIcon icon={faTrash} className="sessions__icon" />
              </div>
            ))
            }
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
