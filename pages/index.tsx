import Layout, { StyledTextInput } from "../components/layout";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import { FormEvent, useEffect, useState } from "react";
import { FaSearch, FaSun, FaMoon } from "react-icons/fa";
import { Box, useMantineColorScheme, Group } from "@mantine/core";

import { PostProps } from "../features/types";
import Post from "../features/post/components/Post";
import { Session } from "next-auth";

const Blog: React.FC<{
  session: Session;
  data: { filterPosts: PostProps[] };
}> = (props) => {
  const { colorScheme } = useMantineColorScheme();

  const [text, setText] = useState("");
  const [searchString, setSearchString] = useState<string | null>("");

  const { loading, error, data } = useQuery(filterPosts, {
    variables: { searchString },
    pollInterval: 500,
  });

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log(searchString);
    setSearchString(text);
  };

  if (loading) return null;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <>
      <Layout>
        <div className="page">
          <main>
            <Group position="center" mt="xl">
              <form onSubmit={handleFormSubmit} className="search-box">
                <StyledTextInput
                  mt="sm"
                  rightSection={<FaSearch type="submit" />}
                  placeholder="キーワードで検索"
                  min={0}
                  max={99}
                  style={{ width: "340px" }}
                  onChange={(e) => setText(e.target.value)}
                />
              </form>
            </Group>
            <div className="items-container">
              {data &&
                data.filterPosts.map((post: PostProps) => (
                  <div key={post.id} className="post">
                    <Post post={post} />
                  </div>
                ))}
            </div>
          </main>
        </div>
      </Layout>
    </>
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
