import Layout from "../../components/layout";
import gql from "graphql-tag";
import Post, { PostProps } from "../../components/post";
import { useQuery } from "@apollo/client";
import Router from "next/router";

const Drafts: React.FC<{ data: { drafts: PostProps[] } }> = () => {
  const { data, loading, error } = useQuery(DraftsQuery);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;
  return (
    <Layout>
      <div className="page">
        <main>
          <a className="back" href="#" onClick={() => Router.push("/")}>
            ←
          </a>
          <h1>記事の管理</h1>
          <div className="items-container">
            {data.drafts.map((post: PostProps) => (
              <div key={post.id} className="post">
                <Post post={post} />
                <div>{post.published ? "公開中" : "非公開"}</div>
              </div>
            ))}
          </div>
        </main>
      </div>
      <style jsx>{`
        .page {
          padding: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
          border-radius: 20px;
        }

        .post:hover {
          box-shadow: 0px -300px 300px 0px rgba(240, 235, 235, 0.8) inset;
        }

        .items-container {
          display: flex;
          flex-wrap: wrap;
          z-index: 99;
          margin-top: 30px;
        }

        .items-container > * {
          word-break: break-word;
          width: 300px;
          height: 300px;
          margin-right: 30px;
          margin-bottom: 30px;
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

const DraftsQuery = gql`
  query DraftsQuery {
    drafts {
      id
      title
      content
      published
    }
  }
`;

export default Drafts;
