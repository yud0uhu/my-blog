import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.DATABASE_URL,
  headers: {
    "x-hasura-admin-secret": `${process.env.X_HASURA_ADMIN_SECRET}`,
  },
  cache: new InMemoryCache(),
});

export default client;
