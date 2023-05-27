import Welcome from './Welcome'
import Dashboard from './Dashboard'

const Main = ({ user, handleLogout, handleTimeout }) => {
  if (user) {
    return (
      <Dashboard user={user} handleLogout={handleLogout} handleTimeout={handleTimeout} />
    )
  }
  return (
    <Welcome />
  )
}

export default Main