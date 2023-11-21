import React, { useRef, useState } from 'react'

import { Link } from 'react-router-dom'

import { auth } from '../../firebase/Firebase'
import { signInAnonymously } from 'firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth'

import { faUser, faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'

import Input from '../../components/Input/Input'
import HeaderCard from '../../layout/HeaderCard/HeaderCard'

import './SignIn.scss'

export default function SignUp(props) {
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const [message, setMessage] = useState('')
  const [showPassord, setShowPassword] = useState(false)

  const createAccount = (e) => {
    e.preventDefault()
    signInWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then(() => {
        setMessage('Connexion réussie')
      })
      .catch((error) => {
        setMessage('Make sure to fill all fields correctly !')
      })
  }

  const handleAnonymousSignIn = async () => {
    try {
      await signInAnonymously(auth);
      console.log('Connexion anonyme réussie');
    } catch (error) {
      console.error('Erreur de connexion:', error);
    }
  };

  

  return (
    <div className="signin">
      <HeaderCard secondaryTitle={'SignIn'} />
      <form onSubmit={createAccount}>
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
          type={showPassord ? 'text' : 'password'}
          icon={showPassord ? faEyeSlash : faEye}
          onClickIcon={() => setShowPassword(!showPassord)}
          id="password"
          inputRef={passwordRef}
          required
        />
        <Link to="/forgottenPassword" className="link">
          Forgot Password ?
        </Link>
        {message && <p className="errorMessage">{message}</p>}

        <input type="submit" value="SIGN IN" />
        <button type="button" onClick={handleSignInAnonymously}>
          Sign In Anonymously
        </button>
        <input type="submit" value="SIGN IN"/>
        <div className="signup">
          <p className="signup-text">Don't have an account ? &#160;</p>
          <Link to="/signup" className="signup-link">
            Click here !
          </Link>
        </div>
      </form>
    </div>
  )
}
