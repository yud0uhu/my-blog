import React, { Suspense, useEffect, useState } from 'react'
import Layout from '../../components/layout'
import init from '../../markdown-parser/pkg/markdown_parser'
import Create from '../../features/create/components/Create'

function CreatePage() {
  const [isClient, setIsClient] = useState(false)
  // init関数は、コンポーネントのマウント時ではなく、外部のebAssemblyモジュールを非同期でロードするため、useEffectフックを使用する
  useEffect(() => {
    const loadWasm = async () => {
      await init()
    }
    setIsClient(true)
    loadWasm()
  }, [])

  return (
    <>
      {isClient ? (
        <Layout>
          <Create />
        </Layout>
      ) : (
        <Suspense fallback={<p>Loading feed...</p>}> </Suspense>
      )}
    </>
  )
}

export default CreatePage
