import Layout from "../../components/layout";
import Router, { useRouter } from "next/router";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import client from "../../lib/apollo-client";
import { PostProps } from "../../components/post";
import { GetServerSideProps } from "next";
import ReactMarkdown from "react-markdown";

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

const Post: React.FC<{ data: { post: PostProps } }> = (props) => {
  const id = useRouter().query.id;

  const [publish] = useMutation(PublishMutation);
  const [deletePost] = useMutation(DeleteMutation);

  let title = props.data.post.title;
  if (!props.data.post.published) {
    title = `編集中...${title}`;
  }

  return (
    <Layout>
      <div>
        <h2>{title}</h2>
        <ReactMarkdown>{props.data.post.content}</ReactMarkdown>
        {!props.data.post.published && (
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log("hoge");
  const id = String(
    // 記事idをクエリパラメータから受け取る
    Array.isArray(context.params?.id)
      ? context.params?.id[0]
      : context.params?.id
  );
  const { data } = await client.query({
    query: gql`
      query PostQuery($id: ID!) {
        post(id: $id) {
          id
          title
          content
          published
        }
      }
    `,
    variables: { id },
  });

  return {
    props: {
      data,
    },
  };
};

export default Post;
