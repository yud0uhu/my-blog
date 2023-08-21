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
import useFetchPostData from '../../services/fetchPostData'

const Post = () => {
  const router = useRouter()
  const id = router.query.id as string

  const { loading, error, post } = useFetchPostData(id)

  const [publish] = useMutation(PublishMutation)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Oh no... {error}</p>

  const title = post.title
  const unpublished = post.published === false

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
            <small>{post.createdAt}</small>
            <div>
              {post.tags.map((tag: { id: string; label: string }) => (
                <Badge key={tag.id} size="lg" variant="outline">
                  {tag.label}
                </Badge>
              ))}
            </div>
            <ReactMarkdown>{post.content}</ReactMarkdown>
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
