import { gql } from '@apollo/client'

// タグなし
// export const CreateDraftMutation = gql`
//   mutation CreateDraftMutation($title: String!, $content: String!) {
//     createDraft(title: $title, content: $content) {
//       title
//       content
//       published
//     }
//   }
// `

export const CreateDraftsMutation = gql`
  mutation CreateDraftMutation(
    $title: String!
    $content: String!
    $tags: [String!]!
  ) {
    createDraft(title: $title, content: $content, tags: $tags) {
      id
      title
      content
      published
      createdAt
      tags {
        id
        label
      }
    }
  }
`

export const FilterPostsByTag = gql`
  query FilterPostsByTag($tagLabel: String!, $published: Boolean!) {
    filterPostsByTag(tagLabel: $tagLabel, published: $published) {
      id
      title
      content
      published
      createdAt
      tags {
        id
        label
      }
      author {
        id
        name
      }
    }
  }
`

export const filterPosts = gql`
  query filterPosts($searchString: String!) {
    filterPosts(searchString: $searchString, published: true) {
      id
      title
      content
      published
      createdAt
      tags {
        id
        label
      }
      author {
        id
        name
      }
    }
  }
`
