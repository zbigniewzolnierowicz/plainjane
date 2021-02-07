export interface IPost {
  id: string
  title?: string
  content: string
  image?: string
  repliedTo?: IPost
  repliesTo?: IPost[]
}
