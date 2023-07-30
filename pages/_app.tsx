import { ApolloProvider } from "@apollo/client";
import client from "../lib/apollo-client";
import type { AppProps, NextWebVitalsMetric } from "next/app";
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
  const userName = "yud0uhu";
  const title = "yud0uhu.work";

  return (
    <div className="app">
      <Seo
        description={"0yu @ yud0uhu"}
        imageUrl={`https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/og?title=${title}&userName=${userName}`}
        title={title}
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
              withCSSVariables
              withNormalizeCSS
            >
              <Component {...pageProps} />
            </MantineProvider>
          </ColorSchemeProvider>
        </ApolloProvider>
      </SessionProvider>
    </div>
  );
}

// export function reportWebVitals(metric: NextWebVitalsMetric) {
//   console.log(metric);
// }

export default MyApp;
