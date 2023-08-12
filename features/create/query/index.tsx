import { gql } from "@apollo/client";

export const CreateDraftMutation = gql`
  mutation CreateDraftMutation($title: String!, $content: String!) {
    createDraft(title: $title, content: $content) {
      title
      content
      published
    }
  }
`;
