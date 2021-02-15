import { hash } from 'argon2'
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
  nickname: string

  @Column({ nullable: true, type: 'varchar' })
  email?: string

  @Column({ nullable: true, type: 'varchar' })
  profile?: string

  @BeforeInsert()
  async setPassword(password?: string): Promise<void> {
    if (this.password) {
      this.password = await hash(password || this.password)
    }
  }

  get sanitizedUser(): IPublicUser {
    const { name, nickname, profile, email } = this
    return {
      name,
      nickname,
      profile,
      email,
    }
  }
}
