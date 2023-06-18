import Layout from "../../components/layout";
import Router, { useRouter } from "next/router";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/client";
import ReactMarkdown from "react-markdown";
import { StyledPost, StyledTitle } from "./styles/postStyle";
import { PostProps } from "../../features/types";

const PostQuery = gql`
  query PostQuery($id: ID!) {
    post(id: $id) {
      id
      title
      content
      published
      createdAt
    }
  }
`;

const PublishMutation = gql`
  mutation PublishMutation($id: ID!) {
    publish(id: $id) {
      id
      title
      content
      published
    }
  }
`;

const DeleteMutation = gql`
  mutation DeleteMutation($id: ID!) {
    deletePost(id: $id) {
      id
      title
      content
      published
    }
  }
`;

const Post: React.FC<{ data: { post: PostProps } }> = () => {
  const id = useRouter().query.id;
  const { data, loading, error } = useQuery(PostQuery, {
    variables: { id },
  });

  const [publish] = useMutation(PublishMutation);
  const [deletePost] = useMutation(DeleteMutation);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  const title = data.post.title;  
  const unpublished = !data.post.published;

  return (
    <Layout>
      <StyledPost>
        <a className="back" href="#" onClick={() => Router.push("/")}>
          ←
        </a>
        <StyledTitle unpublished={unpublished}>{title}</StyledTitle>
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
      </StyledPost>
    </Layout>
};

export default Post;
