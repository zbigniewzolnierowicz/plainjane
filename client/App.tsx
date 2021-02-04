import * as React from 'react'
import { Route, Switch } from 'react-router'
import Profile from './routes/Profile'
import Helmet from 'react-helmet'

const Root = () => {
  return (
    <div>
      <Helmet>
        <html lang="en" />
        <title>EEEEEEEE</title>
      </Helmet>
      <p>EEEEEEEEE</p>
    </div>
  )
}

const App: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/user/" component={Profile} />
      <Route path="/user/:nickname" component={Profile} />
      <Route path="/" component={Root} />
    </Switch>
  )
}

export default App
