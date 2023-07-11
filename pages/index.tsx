import Layout, { Button, ButtonContainer } from "../components/layout";
import gql from "graphql-tag";
import Router from "next/router";
import { useQuery } from "@apollo/client";
import { FormEvent, useEffect, useState } from "react";
import { FaSearch, FaSun, FaMoon } from "react-icons/fa";
import { TextInput, Box, ActionIcon } from "@mantine/core";
import { PostProps } from "../features/types";
import Post from "../features/post/components/Post";
import { signIn, signOut, useSession } from "next-auth/react";
import { Session } from "next-auth";

const Blog: React.FC<{
  session: Session;
  data: { filterPosts: PostProps[] };
}> = (props) => {
  const { data: session } = useSession();

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

  const handleSignOut = async () => {
    await signOut();
  };

  const handleSignIn = async () => {
    await signIn();
  };

  const [colorScheme, setColorScheme] = useState("light");

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--header-background-color",
      colorScheme === "light" ? "white" : "dark"
    );
    document.documentElement.style.setProperty(
      "--post-text-color",
      colorScheme === "light" ? "black" : "white"
    );
    document.documentElement.style.setProperty(
      "--items-background-color",
      colorScheme === "light" ? "white" : "#0E1117"
    );
  }, [colorScheme]);

  const handleColorSchemeChange = () => {
    const newColorScheme = colorScheme === "light" ? "dark" : "light";
    setColorScheme(newColorScheme);
    document.documentElement.style.setProperty(
      "--background-color",
      newColorScheme === "light" ? "#f6f8fa" : "#02040A"
    );
  };

  if (loading) return null;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <>
      <Layout>
        <div className="page">
          <main>
            <Box mx="auto">
              <form onSubmit={handleFormSubmit} className="search-box">
                <TextInput
                  mt="sm"
                  rightSection={<FaSearch type="submit" />}
                  placeholder="キーワードで検索"
                  min={0}
                  max={99}
                  style={{ width: "340px" }}
                  onChange={(e) => setText(e.target.value)}
                />
              </form>

              <ButtonContainer>
                <ActionIcon
                  variant="outline"
                  color={colorScheme === "dark" ? "yellow" : "blue"}
                  onClick={() => handleColorSchemeChange()}
                  title="Toggle color scheme"
                >
                  {colorScheme === "dark" ? (
                    <FaSun size="1.1rem" />
                  ) : (
                    <FaMoon size="1.1rem" />
                  )}
                </ActionIcon>

                {session ? (
                  <>
                    <Button className="button" onClick={handleSignOut}>
                      ログアウト
                    </Button>
                    <Button
                      className="button"
                      onClick={() => Router.push("/create")}
                    >
                      投稿する
                    </Button>
                  </>
                ) : (
                  <>
                    <Button className="button" onClick={handleSignIn}>
                      ログイン
                    </Button>
                  </>
                )}
              </ButtonContainer>
            </Box>
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
