import { Strategy } from 'passport-local'
import UserErrorRepository from '../communication/users/errors'
import Connection from '../db/connection'
import { User } from '../db/entity/User'
import { verify } from 'argon2'

const LocalPassportStrategy = new Strategy(
  {
    usernameField: 'username',
    passwordField: 'password',
  },
  async function(nickname, password, done) {
    const connection = await Connection
    const userRepository = connection.getRepository(User)
    const potentialUser = await userRepository.findOne({ where: { nickname } })
    if (potentialUser) {
      if (potentialUser.password && verify(potentialUser.password, password)) {
        done(null, potentialUser)
      } else {
        done(UserErrorRepository.incorrect_password)
      }
    } else {
      done(UserErrorRepository.user_not_found)
    }
  },
)

export default LocalPassportStrategy
