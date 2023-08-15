import { ApolloProvider } from '@apollo/client'
import client from '../lib/apollo-client'
import type { AppProps, NextWebVitalsMetric } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core'
import Seo from '../lib/seo'
import { AnimatePresence } from 'framer-motion'
import { useAtom } from 'jotai'
import { colorSchemeAtom } from '../components/layout/stylesAtoms'
function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [colorScheme, setColorScheme] = useAtom(colorSchemeAtom)
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))
  const userName = 'yud0uhu'
  const title = 'yud0uhu.work'

  return (
    <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
      <div className="app">
        <Seo
          description={'0yu @ yud0uhu'}
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
    </AnimatePresence>
  )
}

// export function reportWebVitals(metric: NextWebVitalsMetric) {
//   console.log(metric);
// }

export default MyApp
