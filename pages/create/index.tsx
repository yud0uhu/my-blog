import React, { use, useEffect, useState } from "react";
import Layout from "../../components/layout";
import Router from "next/router";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import init, { text_to_token } from "../../markdown-parser/pkg/markdown_parser";
import Create from "../../features/create/components/Create";

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
  // init関数は、コンポーネントのマウント時ではなく、外部のebAssemblyモジュールを非同期でロードするため、useEffectフックを使用する
  useEffect(() => {
    const loadWasm = async () => {
      await init();
    };
    loadWasm();
  }, []);

  return (
    <Layout>
      <Create />
    </Layout>
  );
}

export default CreatePage;
