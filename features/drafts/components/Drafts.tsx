import Router from "next/router";
import { FaArrowLeft } from "react-icons/fa";
import Layout from "../../../components/layout";
import Post from "../../post/components/Post";
import { PostProps } from "../../types";
import { BackLink } from "../styles/DraftsStyles";

const Drafts: React.FC<{ data: { drafts: PostProps[] } }> = (data) => {
  return (
    <>
      <Layout>
        <main>
          <BackLink className="back" onClick={() => Router.push("/")}>
            <FaArrowLeft />
          </BackLink>
          <div className="items-container">
            {data.data.drafts.map((post: PostProps) => (
              <div key={post.id} className="post">
                <Post post={post} />
                <div>{post.published ? "公開中" : "非公開"}</div>
              </div>
            ))}
          </div>
        </main>
      </Layout>
    </>
  );
};

export default Drafts;
