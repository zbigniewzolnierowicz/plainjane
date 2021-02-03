import { IPublicUser } from '../../shared/PublicUser'
import { User } from '../services/db/entity/User'

export const obfuscateUser = (user: User): IPublicUser => ({ name: user.name, nickname: user.nickname, email: user.email, profile: user.profile })

export default obfuscateUser
