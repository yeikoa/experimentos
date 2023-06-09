'use client'
import { useSignInWithGoogle } from 'react-firebase-hooks/auth'
import { auth } from '../../firebase/app'

const SignInWithProvider: React.FC = () => {
  const [signInWithGoogle, user, loading, fbError] = useSignInWithGoogle(auth)
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <button disabled={loading} onClick={() => signInWithGoogle()}>
        Continue with Google
      </button>

      {fbError && <p>{fbError.message}</p>}
    </div>
  )
}


export default SignInWithProvider