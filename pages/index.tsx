import Layout from "../components/layout";
import gql from "graphql-tag";
import Post, { PostProps } from "../features/post/components";
import Router from "next/router";
import { useQuery } from "@apollo/client";
import { FormEvent, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import styled from "styled-components";
import { useForm } from "@mantine/form";
import { TextInput, Button, Group, Box } from "@mantine/core";

const Blog: React.FC<{ data: { feed: PostProps[] } }> = (props) => {
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

  if (loading) return null;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <Layout>
      <Wrapper>
        <div className="page">
          <main>
            <Box maw={340} mx="auto">
              <form onSubmit={handleFormSubmit} className="search-box">
                <TextInput
                  mt="sm"
                  rightSection={<FaSearch type="submit" />}
                  placeholder="キーワードで検索"
                  min={0}
                  max={99}
                  onChange={(e) => setText(e.target.value)}
                />
              </form>
              <button className="button" onClick={() => Router.push("/create")}>
                投稿する
              </button>
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
      </Wrapper>
    </Layout>
  );
};

const Wrapper = styled.div`
  .page {
    padding: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .post {
    background: white;
    transition: box-shadow 0.1s ease-in;
    border-radius: 20px;
  }

  .post:hover {
    box-shadow: 0px -300px 300px 0px rgba(240, 235, 235, 0.8) inset;
  }

  .items-container {
    display: flex;
    flex-wrap: wrap;
    z-index: 99;
    margin-top: 30px;
  }

  .items-container > * {
    word-break: break-word;
    width: 300px;
    height: 300px;
    margin-right: 30px;
    margin-bottom: 30px;
  }

  .search-box {
    height: 28px;
    width: 10em;
    top: 0px;
    position: fixed;
    inset: 0;
    margin: 0 auto;
    font-weight: bold;
    z-index: 999;
    border: none;
  }

  .button {
    height: 35px;
    position: fixed;
    top: 0;
    right: 0;
    margin: 10px 10px;
    z-index: 999;
    border: 0;
    border-radius: 10px;
    background-color: rgb(255, 85, 85);
    box-shadow: 0 10px 20px rgb(240, 235, 235, 0.3);
    border: 0.125rem solid #0000;
    color: white;
    font-weight: bold;
  }
`;

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
