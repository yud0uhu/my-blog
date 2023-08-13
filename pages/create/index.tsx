import React, { useEffect } from 'react'
import Layout from '../../components/layout'
import init from '../../markdown-parser/pkg/markdown_parser'
import { getSession, useSession } from 'next-auth/react'
import Create from '../../features/create/components/Create'

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
