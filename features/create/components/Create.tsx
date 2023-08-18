import React, { useEffect, useState } from 'react'
import Router from 'next/router'
import { text_to_token } from '../../../markdown-parser/pkg/markdown_parser'
import { useMutation } from '@apollo/client'
import { BackLink, StyledCreate } from '../styles/createStyles'
import { Input as MantineInput, Badge, TextInput } from '@mantine/core'
import { CreateDraftsMutation } from '../query'
import { FaArrowLeft, FaTags, FaTimes } from 'react-icons/fa'
import {
  StyledButton,
  ButtonContainer,
  StyledContainer,
} from '../../../components/layout/styles'
import { Session } from 'next-auth'
import { Switch } from '@mantine/core'
import ContentEditor from './content-editor/ContentEditor'
import TagInput from './tag-input/TagInput'

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

  const handleTagAdd = (tag: string) => {
    if (tag.trim() !== '') {
      setTags([...tags, tag.trim()])
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

        <StyledContainer>
          <TagInput
            tags={tags}
            onTagAdd={handleTagAdd}
            onTagRemove={handleTagClick}
          />
          <ContentEditor
            title={title}
            content={content}
            onTitleChange={setTitle}
            onContentChange={convertContent}
            markdownContent={markdownContent}
          />
        </StyledContainer>
      </form>
    </StyledCreate>
  )
}

export default Create
