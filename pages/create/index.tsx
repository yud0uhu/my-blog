import React, { use, useEffect, useState } from "react";
import Layout from "../../components/layout";
import Router from "next/router";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import init, { text_to_token } from "../../markdown-parser/pkg/markdown_parser";
import Create from "../../features/create/components/Create";
import { useSession } from "next-auth/react";

// const CreateDraftMutation = gql`
//   mutation CreateDraftMutation($title: String!, $content: String) {
//     createDraft(title: $title, content: $content) {
//       title
//       content
//       published
//     }
//   }
// `;

function CreatePage() {
  const { data: session } = useSession();
  // init関数は、コンポーネントのマウント時ではなく、外部のebAssemblyモジュールを非同期でロードするため、useEffectフックを使用する
  useEffect(() => {
    if (!session) {
      Router.push("/404");
    }
    const loadWasm = async () => {
      await init();
    };
    loadWasm();
  }, [session]);

  return (
    <Layout>
      <Create />
    </Layout>
  );
}

export default CreatePage;
