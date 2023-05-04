import React, { FC, use, useEffect, useState } from "react";
import Layout from "../../components/layout";
import Router from "next/router";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/client";
import init, { text_to_token } from "../../markdown-parser/pkg";
import {
  CreateDraftMutationDocument,
  DraftsQueryDocument,
  FeedQueryDocument,
} from "../../gql/graphql";

(async () => {
  // wasmをロード
  await init();
})();

const Draft: FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [markdownContent, setMarkdownContent] = useState("");

  const convertContent = (content: string) => {
    console.log(content);
    setContent(content);
    setMarkdownContent(text_to_token(content));
  };

  const [createDraft, { loading, error }] = useMutation(
    CreateDraftMutationDocument,
    {
      refetchQueries: [DraftsQueryDocument],

      onCompleted: () => {
        Router.push("/drafts");
      },
    }
  );
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    createDraft({
      variables: {
        title: title,
        content: content,
      },
    });
    // Router.push("/drafts");
  };
  if (loading) return <p>Submitting...</p>;
  if (error) return <p>Submission error! {error.message}</p>;
  return (
    <Layout>
      <div>
        <form onSubmit={handleSubmit}>
          <button type="submit" disabled={!content || !title}>
            保存する
          </button>
          <a className="back" href="#" onClick={() => Router.push("/")}>
            ←
          </a>
          <input
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            type="title"
            value={title}
          />
          <textarea
            cols={50}
            onChange={(e) => convertContent(e.target.value)}
            placeholder="Write in Content"
            rows={8}
            value={content}
          />
        </form>
        <h1>Preview</h1>

        <div
          contentEditable
          dangerouslySetInnerHTML={{
            __html: markdownContent,
          }}
        />
      </div>
      <style jsx>{`
        .page {
          padding: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        input[type="title"] {
          width: 100%;
          padding: 1.5rem;
          margin: 0.5rem 0;
          background: #0000;
          transition: 0.25s ease-in-out;
          border: none;
          font-size: 1.4rem;
          font-weight: bold;
        }
        input[type="title"]:focus {
          outline: #0000;
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
        button {
          height: 35px;
          width: 96px;
          position: fixed;
          top: 0;
          right: 0;
          margin: 10px 10px;
          z-index: 999;
          border: 0;
          border-radius: 10px;
          background-color: rgb(245, 178, 178);
          box-shadow: 0 10px 20px rgb(240, 235, 235, 0.3);
          border: 0.125rem solid #0000;
          font-weight: bold;
          color: white;
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
};

export default Draft;
