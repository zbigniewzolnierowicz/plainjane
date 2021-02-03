import * as React from 'react'
import { useParams } from 'react-router'
import useSWR from 'swr'

import { IPublicUser } from '../../shared/PublicUser'
import { IError } from '../../shared/Error'
import axios, { AxiosError } from 'axios'
// import fetcher from '../utils/fetcher'

interface IProfilePathParams {
  nickname?: string
}

const Profile: React.FC = () => {
  const { nickname } = useParams<IProfilePathParams>()
  const userDataPath = nickname ? `/api/auth/user/${nickname}` : '/api/auth/user'
  const userData = useSWR<IPublicUser, IError>(userDataPath, (url) => axios.get(url).then(data => data.data).catch((err: AxiosError) => { throw err.response?.data }))
  return (
    <div>
      <h1>User Data</h1>
      <p>{nickname}</p>
      <a href="/api/auth/google">Log in</a>
      <pre>
        {JSON.stringify(userData, null, 2)}
      </pre>
    </div>
  )
}

export default Profile
