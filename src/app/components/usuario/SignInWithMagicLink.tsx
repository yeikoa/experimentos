'use client'
import { useSendSignInLinkToEmail } from 'react-firebase-hooks/auth'
import { auth } from '../../firebase/app'
import { useState } from 'react'


const SignInWithMagicLink = () => {
  const [sendSignInLinkToEmail, sending, fbError] =
    useSendSignInLinkToEmail(auth)
  const [email, setEmail] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)


  const actionCodeSettings = {
    url: process.env.NEXT_PUBLIC_FIREBASE_MAGIC_LINK_CONTINUE_URL as string,
    handleCodeInApp: true,
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    await sendSignInLinkToEmail(email, actionCodeSettings)

    // Temporarily store user's email in localStorage for match-check on sign-in page
    window.localStorage.setItem('emailForSignIn', email)

    setIsSuccess(true)
  }

  return (
    <div>
      <text>Sign In With Magic Link</text>
      
      {isSuccess ? (
        <text>Check your email 💌</text>
      ) : (
        <>
          <text>
            Enter your email and we will send you a link to sign in.
          </text>
          <form onSubmit={handleSubmit}>
            <input
              required
              type="email"
              name="email"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />

            {fbError && <text>{fbError.message}</text>}

            <button type="submit" disabled={sending}>
              Send Link To Sign-In
            </button>
          </form>
        </>
      )}
    </div>
  )
}

export default SignInWithMagicLink