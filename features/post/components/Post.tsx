import React from "react";
import Router, { useRouter } from "next/router";
import { PostContainer } from "../styles/PostStyles";
import { PostProps } from "../../types";
import { useSession } from "next-auth/react";
import { useMutation } from "@apollo/client";
import { DeleteMutation } from "../query";
import { StyledButton } from "../../../components/layout/styles";

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const id = post.id;
  const { data: session } = useSession();
  const [deletePost] = useMutation(DeleteMutation);
  // const authorName = post.author ? post.author.name : "Unknown author";
  const handleDelete = async () => {
    await deletePost({
      variables: {
        id,
      },
    });
    // 削除後、画面更新する
    Router.push("/");
  };
  const handlePostClick = () => {
    Router.push("/post/[id]", `/post/${id}`, { shallow: true });
  };
  return (
    <PostContainer onClick={handlePostClick}>
      <div>
        <h2>{post.title}</h2>
        <small>{post.createdAt}</small>
      </div>
      {session && <StyledButton onClick={handleDelete}>削除する</StyledButton>}
    </PostContainer>
  );
};

export default Post;
