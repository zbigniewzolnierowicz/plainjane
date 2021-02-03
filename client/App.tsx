import * as React from 'react'
import { Route, Switch } from 'react-router'
import Profile from './routes/Profile'

const App: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/user/" component={Profile} />
      <Route path="/user/:nickname" component={Profile} />
    </Switch>
  )
}

export default App
