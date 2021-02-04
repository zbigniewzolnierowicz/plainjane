import * as React from 'react'
import { Route, Switch } from 'react-router'
import Profile from './routes/Profile'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import GlobalStyle from './style/global'

const Wrapper = styled.div`
  color: rgba(0 100 100 / 100%);
`

const Root = () => {
  return (
    <Wrapper>
      <Helmet>
        <html lang="en" />
        <title>EEEEEEEE</title>
      </Helmet>
      <p>EEEEEEEEE</p>
    </Wrapper>
  )
}

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <Switch>
        <Route exact path="/user/" component={Profile} />
        <Route path="/user/:nickname" component={Profile} />
        <Route path="/" component={Root} />
      </Switch>
    </>
  )
}

export default App
