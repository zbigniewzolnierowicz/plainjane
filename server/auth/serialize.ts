import Connection from '../services/db/connection'
import { IPublicUser, User } from '../services/db/entity/User'

const serialize = (user: Express.User, done: (err: Error | null, id?: string) => void): void => {
  done(null, (user as unknown as User).id)
}

const deserialize = async (id: string, done: (err: Error | null, user?: Express.User) => void): Promise<void> => {
  const connection = await Connection
  const userRepository = connection.getRepository(User)
  const user = (await userRepository.findByIds([ id ]))[0]
  const obfuscatedUser: IPublicUser = { id: user.id, name: user.name, nickname: user.nickname, email: user.email, profile: user.profile }
  done(null, obfuscatedUser)
}

export {
  serialize,
  deserialize
}
