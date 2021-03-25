import * as React from 'react'
import { useParams } from 'react-router'

import { IPublicUser } from '../../shared/PublicUser'
import { useSelector } from 'react-redux'

import styled from 'styled-components'
import { RootState } from '@client/store'

interface IProfilePathParams {
  username?: string
}

const ProfileWrapper = styled.div`
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: 1fr 2fr;
  gap: 1em;
  padding: 1em;
  width: fit-content;
  background: rgba( 255, 255, 255, 0.25 );
  box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
  backdrop-filter: blur( 11.0px );
  border-radius: 10px;
  border: 1px solid rgba( 255, 255, 255, 0.18 );
`

const ProfileName = styled.p`
  grid-column: 2 / -1;
  grid-row: 1 / 2;
`

const ProfileEmail = styled.p`
  grid-column: 2 / -1;
  grid-row: 2 / -1;
`

const LOGOUT_REDIRECT = '/user'

const Profile: React.FC = () => {
  const { username } = useParams<IProfilePathParams>()
  const user = useSelector<RootState, IPublicUser | undefined>(({ user }) => user.user)
  return (
    <div>
      <h1>User Data</h1>
      <p>{username}</p>
      {user ? (
        <a href={`/api/auth/logout?redirect=${LOGOUT_REDIRECT}`}>Log out</a>
      ) : (
        <a href="/api/auth/google">Log in</a>
      )}
      <pre>
        {JSON.stringify(user, null, 2)}
      </pre>
    </div>
  )
}

export default Profile
