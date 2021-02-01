import { OAuth2Strategy } from 'passport-google-oauth'
import Connection from '../db/connection'
import { User } from '../db/entity/User'
import fetch from 'node-fetch'
import { v4 } from 'uuid'

import getEnv from '../../utils/getEnv'
import { S3 } from '../storage'

const GOOGLE_CLIENT_ID = getEnv('GOOGLE_CLIENT_ID')
const GOOGLE_CLIENT_SECRET = getEnv('GOOGLE_CLIENT_SECRET')

const GooglePassportStrategy = new OAuth2Strategy(
  {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:8000/api/auth/google/callback',
  },
  async function(_token, _tokenSecret, profile, done) {
    const connection = await Connection
    const userRepository = connection.getRepository(User)

    let potentialUser = await userRepository.findOne({ where: { googleId: profile.id } })
    if (typeof potentialUser === 'undefined') {
      const generatedNickname = (await import('random-words')).default(3) as string[]
      potentialUser = new User()
      potentialUser.googleId = profile.id
      potentialUser.name = profile.displayName
      potentialUser.nickname = generatedNickname.join('-')
      potentialUser.email = profile.emails?.[0].value
      if (profile.photos) {
        const photo = await fetch(profile.photos[0].value).then(res => res.buffer())
        const id = v4()
        await S3.putObject('avatars', id, photo)
        potentialUser.profile = id
      }
      potentialUser = await userRepository.save(potentialUser)
    }

    done(null, potentialUser)
  }
)

export default GooglePassportStrategy
