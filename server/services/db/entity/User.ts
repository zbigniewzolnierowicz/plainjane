import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { IPublicUser } from '../../../../shared/PublicUser'

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

  @Column({ type: 'varchar', unique: true })
  nickname: string

  @Column({ nullable: true, type: 'varchar' })
  email?: string

  @Column({ nullable: true, type: 'varchar' })
  profile?: string
}
