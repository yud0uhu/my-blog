import React, { useEffect, useState } from "react";
import Router from "next/router";
import { text_to_token } from "../../../markdown-parser/pkg/markdown_parser";
import { useMutation } from "@apollo/client";
import {
  BackLink,
  StyledCreate,
  StyledTextArea,
  Input,
} from "../styles/createStyles";
import { CreateDraftMutation } from "../query";
import { FaArrowLeft } from "react-icons/fa";
import Layout, {
  StyledButton,
  ButtonContainer,
} from "../../../components/layout";

function Create() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [markdownContent, setMarkdownContent] = useState("");

  const convertContent = (content: string) => {
    console.log(content);
    setContent(content);
    setMarkdownContent(text_to_token(content));
  };

  const [createDraft] = useMutation(CreateDraftMutation);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createDraft({
      variables: {
        title,
        content,
      },
    });
    Router.push("/drafts");
  };

  return (
    <StyledCreate>
      <form onSubmit={handleSubmit}>
        <BackLink href="#" onClick={() => Router.push("/")}>
          <FaArrowLeft />
        </BackLink>

        <ButtonContainer style={{ right: "50px" }}>
          <StyledButton disabled={!content || !title}>保存する</StyledButton>
        </ButtonContainer>
        <Input
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
          <div dangerouslySetInnerHTML={{ __html: markdownContent }} />
        )}
      </form>
    </StyledCreate>
  );
}

export default Create;
