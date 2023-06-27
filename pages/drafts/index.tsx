import Layout from "../../components/layout";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import { PostProps } from "../../features/types";
import Drafts from "../../features/drafts/components/Drafts";
import { DraftsQuery } from "../../features/drafts/query";

const DraftsPage: React.FC<{ data: { drafts: PostProps[] } }> = () => {
  const { data, loading, error } = useQuery(DraftsQuery);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;
  return (
    <Layout>
      <Drafts data={data} />
    </Layout>
  );
};

export default DraftsPage;
