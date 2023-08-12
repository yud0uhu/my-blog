import { gql } from "@apollo/client";

export const DraftsQuery = gql`
  query DraftsQuery {
    drafts {
      id
      title
      content
      published
    }
  }
`;
