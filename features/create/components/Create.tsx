import React, { useEffect, useState } from 'react'
import Router from 'next/router'
import { text_to_token } from '../../../markdown-parser/pkg/markdown_parser'
import { useMutation } from '@apollo/client'
import {
  BackLink,
  StyledCreate,
  StyledTextArea,
  StyledInput,
} from '../styles/createStyles'
import { Input as MantineInput, Badge, TextInput } from '@mantine/core'
import { CreateDraftsMutation } from '../query'
import { FaArrowLeft, FaTags, FaTimes } from 'react-icons/fa'
import {
  StyledButton,
  ButtonContainer,
  StyledTextInput,
} from '../../../components/layout/styles'
import { Session } from 'next-auth'
interface CreateProps {
  session: Session | null
}
function Create({ session }: CreateProps) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [markdownContent, setMarkdownContent] = useState('')

  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState('')

  const convertContent = (content: string) => {
    console.log(content)
    setContent(content)
    setMarkdownContent(text_to_token(content))
  }

  const [createDraft] = useMutation(CreateDraftsMutation)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await createDraft({
      variables: {
        title,
        content,
        tags: tags.map((label) => ({ label })),
      },
    })
    Router.push('/drafts')
  }

  const handleTagInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value)
  }

  const handleTagAdd = () => {
    if (tagInput.trim() !== '') {
      setTags([...tags, tagInput.trim()])
      setTagInput('')
    }
  }

  const handleTagClick = (tag: string) => {
    setTags(tags.filter((t) => t !== tag))
  }

  return (
    <StyledCreate>
      <form onSubmit={handleSubmit}>
        <BackLink href="#" onClick={() => Router.push('/')}>
          <FaArrowLeft />
        </BackLink>

        <ButtonContainer style={{ right: '150px' }}>
          <StyledButton disabled={!content || !title}>保存する</StyledButton>
        </ButtonContainer>

        <div>
          <StyledTextInput
            icon={<FaTags />}
            placeholder="関連するキーワードを追加する"
            value={tagInput}
            onChange={handleTagInput}
            type="title"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                handleTagAdd()
              }
            }}
          />
          {tags.map((tag, index) => (
            <Badge key={index} size="lg" variant="outline">
              {tag}
              <button
                className="tag-remove-button"
                onClick={() => handleTagClick(tag)}
              >
                <FaTimes />
              </button>
            </Badge>
          ))}
        </div>

        <StyledInput
          type="title"
          autoFocus
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          value={title}
        />
        <StyledTextArea
          cols={50}
          onChange={(e) => convertContent(e.target.value)}
          placeholder="Write in Content"
          rows={8}
          value={content}
        />
        <h1>Preview</h1>
        {markdownContent && (
          <div
            className="text-align:right"
            dangerouslySetInnerHTML={{ __html: markdownContent }}
          />
        )}
      </form>
    </StyledCreate>
  )
}

export default Create
