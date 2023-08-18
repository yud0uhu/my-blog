import React, { useState } from 'react'
import { Badge } from '@mantine/core'
import { FaTags, FaTimes } from 'react-icons/fa'
import { StyledTextInput } from '../../../../components/layout/styles'

interface TagInputProps {
  tags: string[]
  onTagAdd: (tag: string) => void
  onTagRemove: (tag: string) => void
}

const TagInput: React.FC<TagInputProps> = ({ tags, onTagAdd, onTagRemove }) => {
  const [tagInput, setTagInput] = useState('')

  const handleTagInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value)
  }

  const handleEnterKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const trimmedTagInput = tagInput.trim()
      if (trimmedTagInput !== '') {
        onTagAdd(trimmedTagInput)
        console.log(trimmedTagInput)
        setTagInput('')
      }
    }
  }

  return (
    <>
      <StyledTextInput
        icon={<FaTags />}
        placeholder="関連するキーワードを追加する"
        value={tagInput}
        onChange={handleTagInput}
        onKeyDown={handleEnterKey}
        autoFocus
      />
      {tags.map((tag, index) => (
        <Badge key={index} size="lg" variant="outline">
          {tag}
          <button
            className="tag-remove-button"
            onClick={() => onTagRemove(tag)}
          >
            <FaTimes />
          </button>
        </Badge>
      ))}
    </>
  )
}

export default TagInput
