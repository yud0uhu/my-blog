import React from "react";
import Router from "next/router";
import { PostContainer } from "../styles";

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
    <PostContainer>
      <div onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}>
        <h2>{post.title}</h2>
        <small>{post.createdAt}</small>
        {/* <small>By {authorName}</small> */}
      </div>
    </PostContainer>
  );
};

export default Post;
