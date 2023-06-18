import { gql } from "@apollo/client";
import styled from "styled-components";

export const PostQuery = gql`
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

export const PublishMutation = gql`
  mutation PublishMutation($id: ID!) {
    publish(id: $id) {
      id
      title
      content
      published
    }
  }
`;

export const DeleteMutation = gql`
  mutation DeleteMutation($id: ID!) {
    deletePost(id: $id) {
      id
      title
      content
      published
    }
  }
`;

export const StyledPost = styled.div`
  padding: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;

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

  .back {
    position: fixed;
    top: 20px;
    left: 30px;
    z-index: 999;
    border: 0;
    margin-left: 1rem;
    color: black;
  }
`;

export const StyledTitle = styled.h2<{ unpublished?: boolean }>`
  ${({ unpublished }) =>
    unpublished &&
    `
    &::before {
      content: "編集中...";
    }
  `}
`;
