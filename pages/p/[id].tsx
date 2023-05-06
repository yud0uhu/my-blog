import Layout from "../../components/layout";
import Router, { useRouter } from "next/router";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/client";
import { PostProps } from "../../components/post";
import ReactMarkdown from "react-markdown";

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
  // 記事idをクエリパラメータから受け取る
  const id = useRouter().query.id;
  const { data, loading, error } = useQuery(PostQuery, {
    variables: { id },
  });

  const [publish] = useMutation(PublishMutation);
  const [deletePost] = useMutation(DeleteMutation);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  let title = data.post.title;
  if (!data.post.published) {
    title = `編集中...${title}`;
  }

  return (
    <Layout>
      <div>
        <h2>{title}</h2>
        <small>{data.post.createdAt}</small>
        <ReactMarkdown>{data.post.content}</ReactMarkdown>
        {!data.post.published && (
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
      <style jsx>{`
        .page {
          padding: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .actions {
          margin-top: 2rem;
        }

        button {
          background: white;
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }

        button + button {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default Post;
