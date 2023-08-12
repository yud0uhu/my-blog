import React, { useEffect } from 'react'
import Layout from '../../components/layout'
import init from '../../markdown-parser/pkg/markdown_parser'
import Create from '../../features/create/components/Create'
import { getSession } from 'next-auth/react'
import { GetServerSidePropsContext, NextPageContext } from 'next'
import { authOptions } from '../api/auth/[...nextauth]'
import { getServerSession } from 'next-auth/next'
import { Session } from 'next-auth/core/types'
interface CreatePageProps {
  session: Session | null
}

function CreatePage({ session }: CreatePageProps) {
  // init関数は、コンポーネントのマウント時ではなく、外部のebAssemblyモジュールを非同期でロードするため、useEffectフックを使用する
  useEffect(() => {
    const loadWasm = async () => {
      await init()
    }
    loadWasm()
  }, [])

  return (
    <Layout>
      <Create session={session} />
    </Layout>
  )
}

export default CreatePage

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
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
      session: await getServerSession(context.req, context.res, authOptions),
    },
  }
}
