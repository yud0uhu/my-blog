import Layout from "../components/layout";
import gql from "graphql-tag";
import client from "../lib/apollo-client";
import Post, { PostProps } from "../components/post";

const Blog: React.FC<{ data: { feed: PostProps[] } }> = (props) => {
  return (
    <Layout>
      <div className="page">
        <main>
          <div className="items-container">
            {props.data.feed.map((post) => (
              <div key={post.id} className="post">
                <Post post={post} />
              </div>
            ))}
          </div>
        </main>
      </div>
      <style jsx>{`
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
      `}</style>
    </Layout>
  );
};

export async function getServerSideProps() {
  const { data } = await client.query({
    query: gql`
      query FeedQuery {
        feed {
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
    `,
  });

  return {
    props: {
      data,
    },
  };
}

export default Blog;
