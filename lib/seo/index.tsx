import Head from "next/head";

type SeoProps = {
  title: string;
  description: string;
  url: string;
  imageUrl: string;
};

const Seo = (props: SeoProps) => {
  const { title, description, url, imageUrl } = props;
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={title} />
      <meta property="og:image" content={imageUrl} />
    </Head>
  );
};
export default Seo;
