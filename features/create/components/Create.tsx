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
import { Switch } from '@mantine/core'
interface CreateProps {
  session: Session | null
}
function Create() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [markdownContent, setMarkdownContent] = useState('')
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true)

  useEffect(() => {
    if (!autoSaveEnabled) {
      return
    }

    const autoSave = setTimeout(() => {
      saveDraft()
    }, 60000)

    return () => {
      clearTimeout(autoSave)
    }
  }, [title, content, autoSaveEnabled])

  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState('')

  const convertContent = (content: string) => {
    setContent(content)
    setMarkdownContent(text_to_token(content))
  }

  const [createDraft] = useMutation(CreateDraftsMutation)

  const saveDraft = async () => {
    await createDraft({
      variables: {
        title,
        content,
        tags: tags.map((label) => ({ label })),
      },
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await saveDraft()
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
  const handleAutoSaveToggle = () => {
    setAutoSaveEnabled(!autoSaveEnabled)
  }

  return (
    <StyledCreate>
      <form onSubmit={handleSubmit}>
        <BackLink href="#" onClick={() => Router.push('/')}>
          <FaArrowLeft />
        </BackLink>

        <ButtonContainer style={{ right: '150px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <StyledButton disabled={!content || !title}>保存する</StyledButton>

            <Switch
              label="Auto Save"
              size="lg"
              checked={autoSaveEnabled}
              onChange={handleAutoSaveToggle}
              style={{ marginLeft: '1rem' }}
            />
          </div>
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
