import Layout from "../../components/layout";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import { PostProps } from "../../features/types";
import Drafts from "../../features/drafts/components/Drafts";
import { DraftsQuery } from "../../features/drafts/query";
import { useEffect } from "react";
import Router from "next/router";
import { useSession } from "next-auth/react";

const DraftsPage: React.FC<{ data: { drafts: PostProps[] } }> = () => {
  const { data, loading, error } = useQuery(DraftsQuery);
  const { data: session } = useSession();
  useEffect(() => {
    if (!session) {
      Router.push("/404");
    }
  }, [session]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;
  return (
    <Layout>
      <Drafts data={data} />
    </Layout>
  );
};

export default DraftsPage;
