// ContentEditor.tsx
import React from 'react'
import { StyledInput, StyledTextArea } from '../../styles/createStyles'

interface ContentEditorProps {
  title: string
  content: string
  onTitleChange: (title: string) => void
  onContentChange: (content: string) => void
  markdownContent: string
}

const ContentEditor: React.FC<ContentEditorProps> = ({
  title,
  content,
  onTitleChange,
  onContentChange,
  markdownContent,
}) => {
  const convertContent = (content: string) => {
    onContentChange(content)
  }

  return (
    <>
      <StyledInput
        type="title"
        autoFocus
        onChange={(e) => onTitleChange(e.target.value)}
        placeholder="Title"
        value={title}
      />
      <StyledTextArea
        size="xl"
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
    </>
  )
}

export default ContentEditor
