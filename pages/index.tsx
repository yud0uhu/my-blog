import Layout, { Button, ButtonContainer } from "../components/layout";
import gql from "graphql-tag";
import Router from "next/router";
import { useQuery } from "@apollo/client";
import { FormEvent, useEffect, useState } from "react";
import { FaSearch, FaSun, FaMoon } from "react-icons/fa";
import { useForm } from "@mantine/form";
import {
  TextInput,
  Box,
  ActionIcon,
  useMantineColorScheme,
} from "@mantine/core";
import { PostProps } from "../features/types";
import Post from "../features/post/components/Post";
import {
  getSession,
  GetSessionParams,
  signIn,
  signOut,
  useSession,
} from "next-auth/react";
import { Session } from "next-auth";
import Seo from "../lib/seo";

const Blog: React.FC<{
  session: Session;
  data: { filterPosts: PostProps[] };
}> = (props) => {
  const userName = "yud0uhu";
  const { data: session } = useSession();

  const [text, setText] = useState("");
  const [searchString, setSearchString] = useState<string | null>("");

  const form = useForm({
    initialValues: { content: "" },

    // functions will be used to validate values at corresponding key
    validate: {
      content: (value) =>
        value.length < 0 ? "検索したいキーワードを入力してください" : null,
    },
  });

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

  // const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const [colorScheme, setColorScheme] = useState("light");

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--post-background-color",
      colorScheme === "light" ? "white" : "darkcolor"
    ); // ダークモード時の背景色を指定
    document.documentElement.style.setProperty(
      "--post-text-color",
      colorScheme === "light" ? "black" : "white"
    ); // ダークモード時の文字色を指定
  }, [colorScheme]);

  const handleColorSchemeChange = () => {
    const newColorScheme = colorScheme === "light" ? "dark" : "light";
    setColorScheme(newColorScheme);
    document.documentElement.style.setProperty(
      "--background-color",
      newColorScheme === "light" ? "#f6f8fa" : "#1A1B1E"
    );
  };

  if (loading) return null;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <>
      <Seo
        description={"日日是好日"}
        imageUrl={`https://${
          process.env.NEXT_PUBLIC_VERCEL_URL
        }/api/og?title=${"yud0uhu.work"}&userName=${userName}`}
        title={"yud0uhu.work"}
        url={`https://${process.env.NEXT_PUBLIC_VERCEL_URL}/`}
      />
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

// export const getServerSideProps = async (context: GetSessionParams) => {
//   if (!session) {
//     return {
//       redirect: {
//         destination: "/login",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: { session },
//   };
// };

export default Blog;
