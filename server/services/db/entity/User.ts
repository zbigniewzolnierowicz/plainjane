import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { hash } from 'argon2'

import { IPublicUser } from '../../../../shared/PublicUser'

@Entity()
export class User implements IPublicUser {
  @PrimaryGeneratedColumn()
  id: string

  @Column({ nullable: true, type: 'varchar' })
  googleId?: string

  @Column({ nullable: true, type: 'varchar' })
  twitterId?: string

  @Column({ nullable: true, type: 'varchar' })
  password?: string

  @Column({ type: 'varchar' })
  name: string

  @Column({ type: 'varchar', unique: true })
  nickname: string

  @Column({ nullable: true, type: 'varchar' })
  email?: string

  @Column({ nullable: true, type: 'varchar' })
  profile?: string

  get sanitizedUser(): IPublicUser {
    const { name, nickname, profile, email } = this
    return {
      name,
      nickname,
      profile,
      email,
    }
  }

  constructor(partialUser: Partial<User>) {
    const { password: unhashedPassword, ...data } = partialUser
    let password: string | undefined
    if (unhashedPassword) {
      hash(unhashedPassword).then(hashedPassword => {
        password = hashedPassword
      })
    } else {
      password = undefined
    }
    Object.assign(this, { ...data, password })
  }
}
