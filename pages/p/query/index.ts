import { gql } from "@apollo/client";

const PostQuery = gql`
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

export const pQuery = { PostQuery, PublishMutation, DeleteMutation };
