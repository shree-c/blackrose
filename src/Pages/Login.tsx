import { useState, useEffect } from 'react'
import { signOut, getAuth, signInWithRedirect, GoogleAuthProvider, getRedirectResult, onAuthStateChanged } from 'firebase/auth'
import { app } from '../firebaseInit'
import { Navigate } from 'react-router-dom'
import Loading from '../components/Loading'

const auth = getAuth(app)
const gAuthProvider = new GoogleAuthProvider()
function Login() {
  const [loginSuccessful, setLoginSuccessful] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  console.log('render')
  useEffect(() => {
    setLoading(true)
    async function redirectRunner() {
      try {
        const result = await getRedirectResult(auth)
        if (result) {
          setLoginSuccessful(true)
        }
        setLoading(false)
      } catch (err) {
        alert('Login failed. Try again.')
        console.error(err)
      }
    }
    async function observeAuth() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setLoginSuccessful(true)
        }
      })
    }
    observeAuth()
    redirectRunner()
  }, [])

  const handleSignIn = async () => {
    try {
      setLoading(true)
      await signInWithRedirect(auth, gAuthProvider)
    } catch (err) {
      setLoading(false)
      alert(err)
    }
  }
  return (
    <div className='loginBox'>
      {
        (loading && !loginSuccessful) ?
          (<Loading />)
          :
          (
            (loginSuccessful)
              ?
              <Navigate to='/dashboard' />
              :
              <button onClick={handleSignIn} className='button'> <span className='text-green'>Sign in</span> with Google</button>
          )
      }
    </div>
  )
}

export default Login
