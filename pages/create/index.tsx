import React, { use, useEffect, useState } from 'react'
import Layout from '../../components/layout'
import Router from 'next/router'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/client'
import init, { text_to_token } from '../../markdown-parser/pkg/markdown_parser'
import Create from '../../features/create/components/Create'
import { getSession, useSession } from 'next-auth/react'
import { NextPageContext } from 'next'

function CreatePage() {
  // init関数は、コンポーネントのマウント時ではなく、外部のebAssemblyモジュールを非同期でロードするため、useEffectフックを使用する
  useEffect(() => {
    const loadWasm = async () => {
      await init()
    }
    loadWasm()
  }, [])

  return (
    <Layout>
      <Create />
    </Layout>
  )
}

export default CreatePage

export const getServerSideProps = async (context: NextPageContext) => {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    }
  }

  return {
    props: {
      session,
    },
  }
}
