import Layout from '../components/layout'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/client'
import { FormEvent, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { Badge, Group } from '@mantine/core'

import { PostProps } from '../features/types'
import Post from '../features/post/components/Post'
import { getServerSession } from 'next-auth/next'
import { GetServerSidePropsContext } from 'next/types'
import { authOptions } from './api/auth/[...nextauth]'
import LogoSVG from '../components/elements/logo/LogoSVG'
import {
  StyledTextInput,
  TagBadgesContainer,
} from '../components/layout/styles'
import { filterPosts } from '../features/create/query'

const Blog: React.FC<{
  data: { filterPosts: PostProps[] }
}> = () => {
  const [text, setText] = useState('')
  const [searchString, setSearchString] = useState<string | null>('')

  const [expanded, setExpanded] = useState(false)
  const [colorScheme, setColorScheme] = useState('light')
  const { loading, error, data } = useQuery(filterPosts, {
    variables: { searchString },
    // pollInterval: 500,
    fetchPolicy: 'cache-and-network',
  })

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault()
    console.log(searchString)
    setSearchString(text)
  }

  const borderColor = colorScheme === 'dark' ? '#ACA4CE' : '#2d283b'

  const [selectedTag, setSelectedTag] = useState<string | null>(null) // 選択されたタグを管理

  const handleTagClick = (tagLabel: string) => {
    setSelectedTag(tagLabel)
  }

  const toggleExpand = () => {
    setExpanded(!expanded)
  }

  if (loading) return null
  if (error) return <p>Oh no... {error.message}</p>

  return (
    <Layout backgroundColor={colorScheme === 'dark' ? '#ACA4CE' : 'white'}>
      <div className="logo-container">
        <FaSearch
          style={{
            marginBottom: '8px',
            color: borderColor,
            fontSize: '24px',
            cursor: 'pointer',
          }}
          onClick={toggleExpand}
        />
        <LogoSVG color={borderColor} />
      </div>
      {expanded && (
        <Group
          position="center"
          mt="xl"
          style={{ justifyContent: 'flex-start' }}
        >
          <form onSubmit={handleFormSubmit} className="search-box">
            <StyledTextInput
              variant="filled"
              radius="xl"
              size="md"
              withAsterisk
              mt="sm"
              mr="xl"
              rightSection={<FaSearch type="submit" />}
              placeholder="キーワードで検索"
              min={0}
              max={99}
              style={{
                width: '340px',
                color: borderColor,
              }}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </form>
        </Group>
      )}

      {/* タグ一覧を表示 */}
      <div className="tags-container">
        <TagBadgesContainer>
          {data &&
            data.filterPosts.map((post: PostProps) => (
              <div
                key={post.id}
                className={`tag ${
                  selectedTag === post.tags[0]?.label ? 'selected' : ''
                }`}
                onClick={() => handleTagClick(post.tags[0]?.label)}
              >
                {post.tags.map((tag, index) => (
                  <Badge key={index} size="lg" variant="outline">
                    {tag.label}
                  </Badge>
                ))}
              </div>
            ))}
        </TagBadgesContainer>
      </div>
      {/* タグが選択されている場合、対応する投稿を表示 */}
      {selectedTag ? (
        <div className="items-container">
          {data &&
            data.filterPosts.map(
              (post: PostProps) =>
                // 選択されたタグに一致する投稿のみ表示
                post.tags[0]?.label === selectedTag && (
                  <div key={post.id} className="post">
                    <Post post={post} />
                  </div>
                )
            )}
        </div>
      ) : (
        // タグが選択されていない場合、すべての投稿を表示
        <div className="items-container">
          {data &&
            data.filterPosts.map((post: PostProps) => (
              <div key={post.id} className="post">
                <Post post={post} />
              </div>
            ))}
        </div>
      )}
    </Layout>
  )
}

export default Blog

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      session: await getServerSession(context.req, context.res, authOptions),
    },
  }
}
