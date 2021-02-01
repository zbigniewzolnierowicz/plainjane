import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

export interface IPublicUser {
  id: string
  name: string
  nickname: string
  email?: string
  profile?: string
}

@Entity()
export class User implements IPublicUser {
  @PrimaryGeneratedColumn()
  id: string

  @Column({ nullable: true, type: 'varchar' })
  googleId?: string

  @Column({ nullable: true, type: 'varchar' })
  twitterId?: string

  @Column({ type: 'varchar' })
  name: string

  @Column({ type: 'varchar' })
  nickname: string

  @Column({ nullable: true, type: 'varchar' })
  email?: string

  @Column({ nullable: true, type: 'varchar' })
  profile?: string
}