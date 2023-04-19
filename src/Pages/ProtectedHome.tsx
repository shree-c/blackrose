import { Navigate } from 'react-router-dom'
import InitialLoad from '../components/InitialLoad'
import { useState, useEffect } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { app } from '../firebaseInit'

const auth = getAuth(app)
function ProtectedHome() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }
      setIsLoading(false)
    })
  }, [])
  return (
    <div>
      {
        (isLoading) ? <InitialLoad /> :
          (isLoggedIn) ? <Navigate to={'/dashboard'} /> : <Navigate to={'/login'} />
      }
    </div>
  )
}

export default ProtectedHome
