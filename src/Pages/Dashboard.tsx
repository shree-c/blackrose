import { getAuth, signOut } from 'firebase/auth'
import { Navigate } from 'react-router-dom'
import { app } from '../firebaseInit'
import { useState } from 'react'
import UserInfo from '../components/UserInfo'
const auth = getAuth(app)
function Dashboard({ }) {
  const [successFulSignout, setSuccessfulSignout] = useState<boolean>(false)
  const user = auth.currentUser
  const handleSignOut = () => {
    signOut(auth).then(() => {
      setSuccessfulSignout(true)
    }).catch((error) => {
      console.error(error)
    })
  }
  return (
    <div className="dashboardBox">
      {
        (!auth.currentUser || successFulSignout) ?
          <Navigate to='/login' />
          :
          (
            <div className='dashboardInfo'>
              <UserInfo user={user} />
              <button onClick={handleSignOut} className='button signout'>
                Sign out
              </button>
            </div>
          )
      }
    </div>
  )
}

export default Dashboard
