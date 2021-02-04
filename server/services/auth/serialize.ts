import { IPublicUser } from '../../../shared/PublicUser'
import { obfuscateUser } from '../../utils/obfuscateUser'
import Connection from '../db/connection'
import { User } from '../db/entity/User'

const serialize = async (expressUser: Express.User, done: (err: Error | null, id?: string) => void): Promise<void> => {
  const user = expressUser as unknown as IPublicUser
  const connection = await Connection
  const userRepository = connection.getRepository(User)
  const [foundUser] = await userRepository.find({ where: { nickname: user.nickname } })
  done(null, foundUser.id)
}

const deserialize = async (id: string, done: (err: Error | null, user?: Express.User) => void): Promise<void> => {
  const connection = await Connection
  const userRepository = connection.getRepository(User)
  const [user] = await userRepository.findByIds([ id ])
  const obfuscatedUser: IPublicUser = obfuscateUser(user)
  done(null, obfuscatedUser)
}

export {
  serialize,
  deserialize,
}
