import Welcome from './Welcome'
import Dashboard from './Dashboard'

const Main = ({ user, handleLogout }) => {
  if (user) {
    return (
      <Dashboard user={user} handleLogout={handleLogout} />
    )
  }
  return (
    <Welcome />
  )
}

export default Main