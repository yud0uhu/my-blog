import Router from "next/router";
import Post from "../../post/components/Post";
import { PostProps } from "../../types";
import {
  BackLink,
  ItemsContainer,
  Page,
  PostContainer,
} from "../styles/DraftsStyles";

const Drafts: React.FC<{ data: { drafts: PostProps[] } }> = (data) => {
  return (
    <>
      <Page className="page">
        <main>
          <BackLink className="back" onClick={() => Router.push("/")}>
            ←
          </BackLink>
          <h1>記事の管理</h1>
          <ItemsContainer className="items-container">
            {data.data.drafts.map((post: PostProps) => (
              <PostContainer key={post.id} className="post">
                <Post post={post} />
                <div>{post.published ? "公開中" : "非公開"}</div>
              </PostContainer>
            ))}
          </ItemsContainer>
        </main>
      </Page>
    </>
  );
};

export default Drafts;
