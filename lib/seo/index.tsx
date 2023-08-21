import Head from 'next/head'

type SeoProps = {
  title: string
  description: string
  url: string
  imageUrl: string
}

function Seo({ title, description, imageUrl, url }: SeoProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={title} />
    </Head>
  )
}

export default Seo
