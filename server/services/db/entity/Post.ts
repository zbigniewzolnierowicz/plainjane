import { Column, Entity, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent } from 'typeorm'
import { IPost } from '@shared/Post'

@Entity()
@Tree('closure-table')
export class Post implements IPost {
  @PrimaryGeneratedColumn()
  id: string

  @Column({ type: 'varchar', nullable: true })
  title?: string

  @Column({ type: 'varchar', nullable: false })
  content: string

  @Column({ type: 'varchar', nullable: true })
  image?: string

  @TreeParent()
  repliedTo?: Post

  @TreeChildren()
  repliesTo?: Post[]
}
