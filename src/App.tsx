import { useState, useEffect } from 'react'
import { signOut, getAuth, signInWithRedirect, GoogleAuthProvider, getRedirectResult, onAuthStateChanged } from 'firebase/auth'
import { app } from './firebaseInit'

const auth = getAuth(app)
const gAuthProvider = new GoogleAuthProvider()
function App() {
  const [suser, setSuser] = useState({})
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true)
        setSuser(user)
      } else {
        setIsLoggedIn(false)
      }
    })
  }, [])

  useEffect(() => {
    async function redirectRunner() {
      const result = await getRedirectResult(auth)
      console.log(result?.user)
      if (result)
        setSuser(result.user)
    }
    redirectRunner()
  }, [])
  const handleSignIn = async () => {
    signInWithRedirect(auth, gAuthProvider)
  }
  const handleSignOut = () => {
    signOut(auth).then(() => {
      setIsLoggedIn(false)
      setSuser({})
    }).catch((error) => {
      console.error(error)
    })
  }
  return (
    <div>
      {
        (isLoggedIn) ?
          <button onClick={handleSignOut}>Sign OUT</button>
          :
          <button onClick={handleSignIn}>Sign IN</button>
      }
      {JSON.stringify(suser)}
    </div>
  )
}

export default App
