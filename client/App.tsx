import * as React from 'react'
import { User } from '../server/services/db/entity/User'

const App: React.FC = () => {
  const [profile, setProfile] = React.useState<User | undefined>()
  React.useEffect(() => {
    fetch('/api/auth/profile').then(res => res.json() as Promise<User>).then(data => setProfile(data))
  }, [])
  return profile ? (
    <div>
      <pre>{JSON.stringify(profile)}</pre>
      <img src={`/static/avatars/${profile.profile}`} />
      <a href="/api/auth/logout">Log out</a>
    </div>
  ) : (
    <a href="/api/auth/google">Log in with Google</a>
  )
}

export default App
