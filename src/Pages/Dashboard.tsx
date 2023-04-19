import { getAuth, signOut } from 'firebase/auth'
import { Navigate } from 'react-router-dom'
import { app } from '../firebaseInit'
import { useState } from 'react'
const auth = getAuth(app)
function Dashboard({ }) {
  const [successFulSignout, setSuccessfulSignout] = useState<boolean>(false)
  const handleSignOut = () => {
    signOut(auth).then(() => {
      setSuccessfulSignout(true)
    }).catch((error) => {
      console.error(error)
    })
  }
  return (
    <div className='loginBox'>
      {
        (!auth.currentUser || successFulSignout) ?
          <Navigate to='/login' />
          :
          (
            <>
              <div>Dashboard</div>
              <button onClick={handleSignOut} className='button'>Sign out</button>
            </>
          )
      }
    </div>
  )
}

export default Dashboard
