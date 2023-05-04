/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation CreateDraftMutation($title: String, $content: String) {\n    insert_post_one(\n      object: { content: $content, title: $title, published: false }\n    ) {\n      title\n      content\n    }\n  }\n": types.CreateDraftMutationDocument,
    "\n      query DraftsQuery {\n        post(where: { published: { _eq: false } }) {\n          content\n          id\n          title\n        }\n      }\n    ": types.DraftsQueryDocument,
    "\n      query FeedQuery {\n        post(where: { published: { _eq: true } }) {\n          id\n          title\n          content\n        }\n      }\n    ": types.FeedQueryDocument,
    "\n  mutation PublishMutation($id: Int!) {\n    update_post_by_pk(pk_columns: { id: $id }, _set: { published: true }) {\n      id\n      title\n      content\n      published\n    }\n  }\n": types.PublishMutationDocument,
    "\n      query PostQuery($id: Int!) {\n        post_by_pk(id: $id) {\n          id\n          title\n          content\n          published\n        }\n      }\n    ": types.PostQueryDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateDraftMutation($title: String, $content: String) {\n    insert_post_one(\n      object: { content: $content, title: $title, published: false }\n    ) {\n      title\n      content\n    }\n  }\n"): (typeof documents)["\n  mutation CreateDraftMutation($title: String, $content: String) {\n    insert_post_one(\n      object: { content: $content, title: $title, published: false }\n    ) {\n      title\n      content\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      query DraftsQuery {\n        post(where: { published: { _eq: false } }) {\n          content\n          id\n          title\n        }\n      }\n    "): (typeof documents)["\n      query DraftsQuery {\n        post(where: { published: { _eq: false } }) {\n          content\n          id\n          title\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      query FeedQuery {\n        post(where: { published: { _eq: true } }) {\n          id\n          title\n          content\n        }\n      }\n    "): (typeof documents)["\n      query FeedQuery {\n        post(where: { published: { _eq: true } }) {\n          id\n          title\n          content\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation PublishMutation($id: Int!) {\n    update_post_by_pk(pk_columns: { id: $id }, _set: { published: true }) {\n      id\n      title\n      content\n      published\n    }\n  }\n"): (typeof documents)["\n  mutation PublishMutation($id: Int!) {\n    update_post_by_pk(pk_columns: { id: $id }, _set: { published: true }) {\n      id\n      title\n      content\n      published\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      query PostQuery($id: Int!) {\n        post_by_pk(id: $id) {\n          id\n          title\n          content\n          published\n        }\n      }\n    "): (typeof documents)["\n      query PostQuery($id: Int!) {\n        post_by_pk(id: $id) {\n          id\n          title\n          content\n          published\n        }\n      }\n    "];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;