import Layout from "../../components/layout";
import gql from "graphql-tag";
import { PostProps } from "../../features/post/components";
import { useQuery } from "@apollo/client";
import Drafts from "../../features/drafts/components";

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

const DraftsQuery = gql`
  query DraftsQuery {
    drafts {
      id
      title
      content
      published
    }
  }
`;

export default DraftsPage;
