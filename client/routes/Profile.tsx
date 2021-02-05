import * as React from 'react'
import { useParams } from 'react-router'
import useSWR from 'swr'

import { IPublicUser } from '../../shared/PublicUser'
import { IError, IMessage } from '../../shared/Message'
import fetcher from '../utils/fetcher'
import styled from 'styled-components'

interface IProfilePathParams {
  nickname?: string
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

const Profile: React.FC = () => {
  const { nickname } = useParams<IProfilePathParams>()
  const userDataPath = nickname ? `/api/auth/user/${nickname}` : '/api/auth/user'
  const { data, error } = useSWR<IMessage<IPublicUser>, IError>(userDataPath, fetcher, { refreshInterval: 600000 })
  return (
    <div>
      <h1>User Data</h1>
      <p>{nickname}</p>
      <a href="/api/auth/google">Log in</a>
      <a href="/api/auth/logout">Log out</a>
      {data ? (
        <ProfileWrapper>
          <img src={`/static/avatars/${data.content?.profile}`} alt={data.content?.name} />
          <ProfileName>{data.content?.name}</ProfileName>
          <ProfileEmail>{data.content?.email}</ProfileEmail>
        </ProfileWrapper>
      ) : error ? (
        <pre>
          ERROR
          {JSON.stringify(error, null, 2)}
        </pre>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}

export default Profile
