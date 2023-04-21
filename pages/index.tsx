import Layout from "../components/layout";
import gql from "graphql-tag";
import client from "../lib/apollo-client";
import Post, { PostProps } from "../components/post";

const Blog: React.FC<{ data: { feed: PostProps[] } }> = (props) => {
  return (
    <Layout>
      <div className="page">
        <h1>My Blog</h1>
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
          border-radius: 10px;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .items-container {
          display: flex;
          flex-wrap: wrap;
          flex-grow: 1;
          flex-basis: 0;
        }

        .items-container > * {
          width: calc(100% / 3 - 30px);
          margin-right: 30px;
          margin-bottom: 30px;
        }

        .items-container > *:last-child {
          margin-right: 0;
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
