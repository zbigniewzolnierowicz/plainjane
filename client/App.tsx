import * as React from 'react'
import { Route, Switch } from 'react-router'
import Profile from './routes/Profile'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import GlobalStyle from './style/global'
import { Provider, useSelector, useDispatch } from 'react-redux'
import { logIn, logInError, logInPending, RootState, store } from './store'
import { IMessage, AuthMessages, IError, AuthErrors } from '@shared/Message'
import { IPublicUser } from '@shared/PublicUser'
import axios, { AxiosError } from 'axios'
import { NavLink } from 'react-router-dom'
import { down } from 'styled-breakpoints'

const Root = () => {
  const user = useSelector<RootState>(state => state.user)
  return (
    <div>
      <Helmet>
        <html lang="en" />
        <title>EEEEEEEE</title>
      </Helmet>
      <p>EEEEEEEEE</p>
      <pre>{JSON.stringify(user)}</pre>
    </div>
  )
}

const Wrapper = styled.div`
  color: rgba(0, 0, 0, 1);
  background: #6b705c;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: row;
  ${down('md')} {
    flex-direction: column;
  }
`

const RouterContainer = styled.main`
  background: #ffe8d6;
  width: 100%;
  max-width: 80%;
  margin-top: 1em;
  margin-bottom: 1em;
  border-top-right-radius: 2em;
  border-bottom-right-radius: 2em;
  padding: 1em;
  overflow: auto;
  ${down('md')} {
    flex-direction: column;
    height: 100%;
    max-width: unset;
    width: unset;
    margin-right: 1em;
  }
`

const StyledLink = styled(NavLink)`
  text-align: center;
  min-width: 10ch;
  width: 100%;
  &:first-of-type {
    margin-block-start: 1em;
  }
  &:last-of-type {
    margin-block-end: 1em;
  }
  color: black;
  padding-block-start: 1em;
  padding-block-end: 1em;
  &.active {
    background-color: #B7B7A4;
    border-top-left-radius: 1em;
    border-bottom-left-radius: 1em;
    ${down('md')} {
      border-top-right-radius: 1em;
      border-bottom-left-radius: 0;
    }
  }
  ${down('md')} {
    border: none;
    &:first-of-type {
      border-top: none;
      margin-block-start: 0;
    }
    &:last-of-type {
      margin-block-end: 0;
    }
  }
`

const AdvancedLink = styled(NavLink)`
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 2.2em auto;
  padding-left: 1ch;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  place-items: center;
  color: black;
  font-size: 20px;
  img {
    max-height: 2.2em;
    border-radius: 99999px;
  }
  &.active {
    background-color: #B7B7A4;
    border-top-left-radius: 1em;
    border-bottom-left-radius: 1em;
    ${down('md')} {
      border-top-right-radius: 1em;
      border-bottom-left-radius: 0;
    }
  }
`

const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  width: 30ch;
  height: 100%;
  font-size: 20px;
  padding: 1ch;
  padding-right: 0;
  ${down('md')} {
    flex-direction: row;
    height: unset;
    width: unset;
    margin-left: 1ch;
    margin-right: 1ch;
    justify-content: stretch;
    padding: 1ch;
    padding-bottom: 0;
  }
`

const InternalApp: React.FC = () => {
  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(logInPending())
    axios
      .get<IMessage<AuthMessages, IPublicUser>>('/api/auth/user')
      .then(({ data }) => {
        data.content && dispatch(logIn(data.content))
      })
      .catch((err: AxiosError<IError<AuthErrors>>) => {
        console.log(err.response)
        dispatch(logInError())
      })
  }, [])
  return (
    <Wrapper>
      <RouterContainer>
        <Switch>
          <Route exact path="/user/" component={Profile} />
          <Route path="/" component={Root} />
        </Switch>
      </RouterContainer>
      <Sidebar>
        <StyledLink exact to="/">Home</StyledLink>
        <AdvancedLink exact to="/user">
          <img src="https://placekitten.com/300/300" />
          User
        </AdvancedLink>
      </Sidebar>
    </Wrapper>
  )
}

const App: React.FC = () => (
  <Provider store={store}>
    <GlobalStyle />
    <InternalApp />
  </Provider>
)

export default App
