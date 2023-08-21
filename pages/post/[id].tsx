import React, { useEffect, useState } from 'react'
import Router, { useRouter } from 'next/router'
import { useMutation, useQuery } from '@apollo/client'
import ReactMarkdown from 'react-markdown'
import Layout from '../../components/layout'
import {
  PostQuery,
  PublishMutation,
  DeleteMutation,
} from '../../features/post/query'
import { StyledPost, StyledTitle } from '../../features/post/styles/PostStyles'
import { FaArrowLeft } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { Badge } from '@mantine/core'
import fetchPostData, {
  FetchPostDataResult,
} from '../../services/fetchPostData'

const Post = () => {
  const router = useRouter()
  const id = router.query.id

  const [postData, setPostData] = useState<FetchPostDataResult | null>(null)

  useEffect(() => {
    if (id) {
      const fetchedData = fetchPostData(id)
      setPostData(fetchedData)
    }
  }, [id])

  const { data, loading, error } = useQuery(PostQuery, {
    variables: { id },
  })

  const [publish] = useMutation(PublishMutation)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Oh no... {error.message}</p>

  const title = data.post.title
  const unpublished = !data.post.published

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Layout>
        <StyledPost>
          <a className="back" href="#" onClick={() => Router.push('/')}>
            <FaArrowLeft />
          </a>
          <div>
            <StyledTitle unpublished={unpublished}>{title}</StyledTitle>
            <small>{data.post.createdAt}</small>
            <div>
              {data.post.tags.map((tag: { id: string; label: string }) => (
                <Badge key={tag.id} size="lg" variant="outline">
                  {tag.label}
                </Badge>
              ))}
            </div>
            <ReactMarkdown>{data.post.content}</ReactMarkdown>
            {unpublished && (
              <button
                onClick={async (e) => {
                  await publish({
                    variables: {
                      id,
                    },
                  })
                  Router.push('/')
                }}
              >
                公開する
              </button>
            )}
          </div>
        </StyledPost>
      </Layout>
    </motion.div>
  )
}

export default Post
