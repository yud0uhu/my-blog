import Layout from "../components/layout";
import gql from "graphql-tag";
import Post, { PostProps } from "../components/post";
import Router from "next/router";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import client from "../lib/apollo-client";

const Blog: React.FC<{ data: { feed: PostProps[] } }> = (props) => {
  const [searchString, setSearchString] = useState("");

  const { data } = useQuery(filterPosts, {
    variables: { searchString },
  });

  return (
    <Layout>
      <div className="page">
        <main>
          <input
            type="text"
            className="search"
            placeholder=""
            onChange={(e) => setSearchString(e.target.value)}
          />
          <button onClick={() => Router.push("/create")}>投稿する</button>
          <div className="items-container">
            {data &&
              data.filterPosts.map((post: PostProps) => (
                <div key={post.id} className="post">
                  <Post post={post} />
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

        .search {
          height: 32px;
          width: 457px;
          position: fixed;
          top: 10px;
          margin: auto 0;
          font-weight: bold;
          background-color: rgba(240, 235, 235, 0.8);
          z-index: 999;
          border: none;
          padding: 12px;
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
          background-color: rgb(255, 85, 85);
          box-shadow: 0 10px 20px rgb(240, 235, 235, 0.3);
          border: 0.125rem solid #0000;
          color: white;
          font-weight: bold;
        }
      `}</style>
    </Layout>
  );
};

const FeedQuery = gql`
  query FeedQuery {
    feed {
      id
      title
      content
      published
      createdAt
    }
  }
`;

const filterPosts = gql`
  query filterPosts($searchString: String!) {
    filterPosts(searchString: $searchString, published: true) {
      id
      title
      content
      published
      createdAt
    }
  }
`;

export default Blog;
