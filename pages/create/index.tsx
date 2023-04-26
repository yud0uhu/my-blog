import React, { use, useEffect, useState } from "react";
import Layout from "../../components/layout";
import Router from "next/router";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { text_to_token } from "../../markdown-parser/pkg";

const CreateDraftMutation = gql`
  mutation CreateDraftMutation(
    $title: String!
    $content: String
    $authorEmail: String!
  ) {
    createDraft(title: $title, content: $content, authorEmail: $authorEmail) {
      id
      title
      content
      published
      author {
        id
        name
      }
    }
  }
`;

function Draft() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [markdownContent, setMarkdownContent] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");

  const convertContent = (content: string) => {
    console.log(content);
    setContent(content);
    setMarkdownContent(text_to_token(content));
  };

  const [createDraft] = useMutation(CreateDraftMutation);

  return (
    <Layout>
      <div>
        <form
          onSubmit={async (e) => {
            e.preventDefault();

            await createDraft({
              variables: {
                title,
                content,
                authorEmail,
              },
            });
            Router.push("/drafts");
          }}
        >
          <h1>Create Draft</h1>
          <input
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            type="text"
            value={title}
          />
          <input
            onChange={(e) => setAuthorEmail(e.target.value)}
            placeholder="Author (email adress)"
            type="text"
            value={authorEmail}
          />
          <textarea
            cols={50}
            onChange={(e) => convertContent(e.target.value)}
            placeholder="Write in Content"
            rows={8}
            value={content}
          />
          <h1>Preview</h1>
          <div
            dangerouslySetInnerHTML={{
              __html: markdownContent,
            }}
          />
          <input
            disabled={!content || !title || !authorEmail}
            type="submit"
            value="Create"
          />
          <a className="back" href="#" onClick={() => Router.push("/")}>
            or Cancel
          </a>
        </form>
      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        input[type="text"],
        textarea {
          width: 100%;
          padding: 1.5rem;
          margin: 0.5rem 0;
          /* border-radius: 0.25rem; */
          border: 0.125rem solid #0000;
          background: white;
          border-radius: 20px;
          box-shadow: 0 10px 20px rgb(240, 235, 235, 0.3);
        }
        input[type="text"]:focus,
        textarea {
          outline: #0000;
          height: 400px;
          resize: none;
        }
        input[type="submit"] {
          height: 35px;
          width: 96px;
          position: fixed;
          top: 0;
          right: 0;
          margin: 10px 10px;
          z-index: 999;
          border: 0;
          border-radius: 10px;
          background-color: rgb(240, 235, 235);
          box-shadow: 0 10px 20px rgb(240, 235, 235, 0.3);
          border: 0.125rem solid #0000;
          font: bold;
        }

        .back {
          position: fixed;
          top: 20px;
          left: 30px;
          z-index: 999;
          border: 0;
          margin-left: 1rem;
          color: black;
        }
      `}</style>
    </Layout>
  );
}

export default Draft;
