import { hash, argon2id } from 'argon2'
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

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
  username: string

  @Column({ nullable: true, type: 'varchar' })
  email?: string

  @Column({ nullable: true, type: 'varchar' })
  profile?: string

  @BeforeInsert()
  async setPassword(password?: string): Promise<void> {
    if (this.password) {
      this.password = await hash(password || this.password, { type: argon2id })
    }
  }

  get sanitizedUser(): IPublicUser {
    const { name, username, profile, email } = this
    return {
      name,
      username,
      profile,
      email,
    }
  }
}
