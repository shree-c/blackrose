import { Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { app } from '../firebaseInit'
import Loading from '../components/Loading'

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
        (isLoading) ? <Loading /> :
          (isLoggedIn) ? <Navigate to={'/dashboard'} /> : <Navigate to={'/login'} />
      }
    </div>
  )
}

export default ProtectedHome
