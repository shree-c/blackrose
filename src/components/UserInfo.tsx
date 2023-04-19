interface user {
  user: any
}
function UserInfo({ user }: user) {
  return (
    <div className='userInfo'>
      <div className="profilePhoto">
        <img src={user.photoURL} alt="profile image" />
      </div>
      <table>
        <tbody>
          <tr>
            <td>Display Name</td>
            <td>{user.displayName}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{user.email}</td>
          </tr>
          <tr>
            <td>Account created on</td>
            <td>{(new Date((user.metadata.creationTime))).toString()}</td>
          </tr>
        </tbody>
      </table>
    </div >
  )
}

export default UserInfo
