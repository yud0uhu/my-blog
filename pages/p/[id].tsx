import React from "react";
import Router, { useRouter } from "next/router";
import { useMutation, useQuery } from "@apollo/client";
import ReactMarkdown from "react-markdown";
import Layout from "../../components/layout";
import { pQuery } from "./query";
import postStyled from "./styles/postStyle";

const Post = () => {
  const id = useRouter().query.id;
  const { data, loading, error } = useQuery(pQuery.PostQuery, {
    variables: { id },
  });

  const [publish] = useMutation(pQuery.PublishMutation);
  const [deletePost] = useMutation(pQuery.DeleteMutation);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  const title = data.post.title;
  const unpublished = !data.post.published;

  return (
    <Layout>
      <postStyled.StyledPost>
        <a className="back" href="#" onClick={() => Router.push("/")}>
          ←
        </a>
        <div>
          <postStyled.StyledTitle unpublished={unpublished}>
            {title}
          </postStyled.StyledTitle>
          <small>{data.post.createdAt}</small>
          <ReactMarkdown>{data.post.content}</ReactMarkdown>
          {unpublished && (
            <button
              onClick={async (e) => {
                await publish({
                  variables: {
                    id,
                  },
                });
                Router.push("/");
              }}
            >
              公開する
            </button>
          )}
        </div>
      </postStyled.StyledPost>
    </Layout>
  );
};

export default Post;
