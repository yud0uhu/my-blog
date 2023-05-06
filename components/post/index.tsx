import React from "react";
import Router from "next/router";

export type PostProps = {
  id: number;
  title: string;
  // author: {
  //   name: string;
  // };
  content: string;
  published: boolean;
  createdAt: string;
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  // const authorName = post.author ? post.author.name : "Unknown author";
  return (
    <div onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}>
      <h2>{post.title}</h2>
      <small>{post.createdAt.toString()}</small>
      {/* <small>By {authorName}</small> */}
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
      `}</style>
    </div>
  );
};

export default Post;
