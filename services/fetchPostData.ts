import { useQuery } from '@apollo/client'
import { PostQuery } from '../features/post/query'

export interface FetchPostDataResult {
  loading: boolean
  error?: string
  post?: {
    title: string
    published: boolean
  }
}

const fetchPostData = (id: any): FetchPostDataResult => {
  try {
    const { data, loading, error } = useQuery(PostQuery, {
      variables: { id },
    })

    if (loading) {
      return { loading: true }
    }

    // if (error) {
    //   return { error: error.message }
    // }

    const post = data.post

    return { loading: false, post }
  } catch (error) {
    return {
      loading: false,
      error: 'An error occurred while fetching post data.',
    }
  }
}

export default fetchPostData
