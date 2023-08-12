import Layout from "../components/layout";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import { FormEvent, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Group } from "@mantine/core";

import { PostProps } from "../features/types";
import Post from "../features/post/components/Post";
import { getServerSession } from "next-auth/next";
import { GetServerSidePropsContext } from "next/types";
import { authOptions } from "./api/auth/[...nextauth]";
import LogoSVG from "../components/elements/logo/LogoSVG";
import { StyledTextInput } from "../components/layout/styles";

const Blog: React.FC<{
  data: { filterPosts: PostProps[] };
}> = () => {
  const [text, setText] = useState("");
  const [searchString, setSearchString] = useState<string | null>("");

  const [expanded, setExpanded] = useState(false);
  const [colorScheme, setColorScheme] = useState("light");
  const { loading, error, data } = useQuery(filterPosts, {
    variables: { searchString },
    // pollInterval: 500,
    fetchPolicy: "cache-and-network",
  });

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log(searchString);
    setSearchString(text);
  };

  const borderColor = colorScheme === "dark" ? "#ACA4CE" : "#2d283b";

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  if (loading) return null;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <Layout>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          margin: "16px 32px 0px 32px",
        }}
      >
        <FaSearch
          style={{
            margin: "16px",
            color: borderColor,
            fontSize: "30px",
            cursor: "pointer",
          }}
          onClick={toggleExpand}
        />
        <LogoSVG color={borderColor} />
      </div>
      {expanded && (
        <Group
          position="center"
          mt="xl"
          style={{ justifyContent: "flex-start" }}
        >
          <form onSubmit={handleFormSubmit} className="search-box">
            <StyledTextInput
              variant="filled"
              radius="xl"
              size="md"
              withAsterisk
              mt="sm"
              mr="xl"
              rightSection={<FaSearch type="submit" />}
              placeholder="キーワードで検索"
              min={0}
              max={99}
              style={{
                width: "340px",
                color: borderColor,
              }}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </form>
        </Group>
      )}

      <div className="items-container">
        {data &&
          data.filterPosts.map((post: PostProps) => (
            <div key={post.id} className="post">
              <Post post={post} />
            </div>
          ))}
      </div>
    </Layout>
  );
};

const filterPosts = gql`
  query filterPosts($searchString: String!) {
    filterPosts(searchString: $searchString, published: true) {
      id
      title
      content
      published
      createdAt
    }
  }
`;
export default Blog;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      session: await getServerSession(context.req, context.res, authOptions),
    },
  };
}
