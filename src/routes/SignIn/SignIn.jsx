import React, { useRef, useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import { auth } from '../../firebase/Firebase'
import { signInWithEmailAndPassword, setPersistence, browserLocalPersistence } from 'firebase/auth'

import { faUser, faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'

import Input from '../../components/Input/Input'
import HeaderCard from '../../layout/HeaderCard/HeaderCard'

import './SignIn.scss'

export default function SignIn() {
  const navigate = useNavigate()
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const [message, setMessage] = useState('')
  const navigation = useNavigate();

  const [showPassword, setShowPassword] = useState(false)

  const handleSignIn = async (e) => {
    e.preventDefault()
    setPersistence(auth, browserLocalPersistence).then(async () => {
      await signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      ).then(() => {
        setMessage('Connexion réussie')
        navigation('/create');

      }).catch((error) => {
        setMessage('Make sure to fill all fields correctly !')
      })
      return navigate('/profile')
    }).catch(() => {
      setMessage('Make sure to fill in all fields correctly!')
    })

  }

  return (
    <div className="signin">
      <HeaderCard secondaryTitle={'SignIn'} />
      <form onSubmit={handleSignIn}>
        <Input
          placeholder="yourmail@gmail.com"
          type="email"
          id="email"
          inputRef={emailRef}
          icon={faUser}
          required
        />
        <Input
          placeholder="your secret password"
          type={showPassword ? 'text' : 'password'}
          icon={showPassword ? faEyeSlash : faEye}
          onClickIcon={() => setShowPassword(!showPassword)}
          id="password"
          inputRef={passwordRef}
          required
        />
        <Link to="/forgottenPassword" className="link">
          Forgot Password ?
        </Link>
        {message && <p className="errorMessage">{message}</p>}
        <input type="submit" value="SIGN IN" />
        <div className="signup2">
          <p className="signup2-text">Don't have an account ? &#160;</p>
          <Link to="/signup" className="signup2-link">
            Click here !
          </Link>
        </div>
      </form>
    </div>
  )
}