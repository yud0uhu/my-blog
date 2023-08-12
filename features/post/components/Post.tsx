import React from "react";
import Router, { useRouter } from "next/router";
import { PostContainer } from "../styles/PostStyles";
import { PostProps } from "../../types";
import { useSession } from "next-auth/react";
import { useMutation } from "@apollo/client";
import { DeleteMutation } from "../query";
import { StyledButton } from "../../../components/layout";

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
  return (
    <PostContainer>
      <div onClick={() => Router.push("/post/[id]", `/post/${id}`)}>
        <h2>{post.title}</h2>
        <small>{post.createdAt}</small>
        {/* <h2>Session:{JSON.stringify(session)}</h2> */}
      </div>
      {session && <StyledButton onClick={handleDelete}>削除する</StyledButton>}
    </PostContainer>
  );
};

export default Post;
