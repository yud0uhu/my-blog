import { ApolloProvider } from "@apollo/client";
import client from "../lib/apollo-client";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { useState } from "react";
import Seo from "../lib/seo";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <>
      <Seo
        description={"日日是好日"}
        imageUrl={`https://${
          process.env.NEXT_PUBLIC_VERCEL_URL
        }/api/og?title=${"yud0uhu.dev"}`}
        title={"yud0uhu.dev"}
        url={`https://${process.env.NEXT_PUBLIC_VERCEL_URL}/`}
      />
      <SessionProvider session={session}>
        <ApolloProvider client={client}>
          <ColorSchemeProvider
            colorScheme={colorScheme}
            toggleColorScheme={toggleColorScheme}
          >
            <MantineProvider
              theme={{ colorScheme }}
              withGlobalStyles
              withNormalizeCSS
            >
              <Component {...pageProps} />
            </MantineProvider>
          </ColorSchemeProvider>
        </ApolloProvider>
      </SessionProvider>
    </>
  );
}

export default MyApp;
