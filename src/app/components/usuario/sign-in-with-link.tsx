import { useSignInWithEmailLink } from 'react-firebase-hooks/auth'
import { auth } from '../../firebase/app'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const SignInWithLinkPage = () => {
  const [signInWithEmailLink, user, loading,fbError] = useSignInWithEmailLink(auth)
  const [email, setEmail] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    signInAndRedirect(email)
  }

  const signInAndRedirect = async (email: string) => {
    try {
      const currentUrl = `${window.location.origin}${router.asPath}`

      await signInWithEmailLink(email, currentUrl)

      // Clean localStorage
      window.localStorage.removeItem('emailForSignIn')

      // Redirect user to home page
      await router.push('/')
    } catch (error) {
      console.log('Error in signInAndRedirect: ', error)
    }
  }

  useEffect(() => {
    const emailFromStorage = window.localStorage.getItem('emailForSignIn')

    if (emailFromStorage) {
      signInAndRedirect(emailFromStorage)
    }
  }, [])

  return (
    <div>
      <h1>Signing In With Magic Link</h1>
      
      {loading ? (
        <text>⏱️ Wait while we're authenticating you...</text>
      ) : (
        <>
          <text>
            {`Please, confirm the email you used to request this sign-in link
             so we can confirm your identity.`}
          </text>
          <form onSubmit={handleSubmit}>
            <input
              required
              type="email"
              name="email"
              placeholder="Enter email used to sign-in..."
              onChange={(e) => setEmail(e.target.value)}
            />

            {fbError && fbError.message && <text>{fbError.message}</text>}

            <button type="submit" disabled={loading}>
              Confirm Email & Log In
            </button>
          </form>
        </>
      )}
    </div>
  )

}
export default SignInWithLinkPage