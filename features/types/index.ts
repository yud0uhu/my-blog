export type PostProps = {
  id: number
  title: string
  // author: {
  //   name: string;
  // };
  content: string
  published: boolean
  createdAt: string
  tags: Tags[]
}

type Tags = {
  id: string
  label: string
}
