import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    {
      "https://my-blog-server.hasura.app/v1/graphql": {
        headers: {
          "x-hasura-admin-secret": `${process.env.X_HASURA_ADMIN_SECRET}`,
        },
      },
    },
  ],
  documents: "./**/*.tsx",
  generates: {
    "./gql/": {
      preset: "client",
      plugins: [],
    },
  },
};

export default config;
