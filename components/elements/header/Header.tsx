import { ActionIcon } from '@mantine/core'
import { getServerSession } from 'next-auth'
import { getSession, signIn, signOut, useSession } from 'next-auth/react'
import Router from 'next/router'
import { GetServerSidePropsContext } from 'next/types'
import { useEffect, useState } from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'
import { authOptions } from '../../../pages/api/auth/[...nextauth]'
import {
  ButtonContainer,
  StyledButton,
  MenuIcon,
  MenuItem,
  MenuContainer,
  SawarabiGothic,
  GlobalStyle,
} from '../../layout/styles'
import { setHeaderStyles } from './styles/HeaderStyles'

export default function ServerSidePage() {
  const { data: session } = useSession()
  const [colorScheme, setColorScheme] = useState('light')
  useEffect(() => {
    const localStorageTheme = localStorage.getItem('theme')
    setColorScheme(localStorageTheme || 'light')

    setHeaderStyles(colorScheme)
  }, [colorScheme])

  const handleColorSchemeChange = () => {
    const newColorScheme = colorScheme === 'light' ? 'dark' : 'light'
    setColorScheme(newColorScheme)
    localStorage.setItem('theme', newColorScheme)
  }

  const [isOpen, setIsOpen] = useState(false)

  const handleMenuToggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <GlobalStyle
        headerBackgroundColor={colorScheme === 'dark' ? '#2D283B' : 'white'}
        backgroundColor={colorScheme === 'dark' ? 'black' : '#eae3e8'}
      />
      <div className="header" style={SawarabiGothic.style}>
        <ButtonContainer>
          <ActionIcon
            className="icon"
            variant="outline"
            color={colorScheme === 'dark' ? 'yellow' : 'blue'}
            onClick={() => handleColorSchemeChange()}
            title="Toggle color scheme"
          >
            {colorScheme === 'dark' ? (
              <FaSun size="1.1rem" />
            ) : (
              <FaMoon size="1.1rem" />
            )}
          </ActionIcon>
          {!session?.user && (
            <StyledButton
              onClick={(e) => {
                e.preventDefault()
                signIn()
              }}
            >
              ログイン
            </StyledButton>
          )}
          {session && (
            <>
              <MenuIcon
                src={`https://github.com/${session.user?.name}.png`}
                alt="Menu"
                onClick={handleMenuToggle}
              />
              <span>
                <small>Signed in as</small>
                <br />
                <strong>{session?.user?.name}</strong>
              </span>
              <MenuContainer isOpen={isOpen}>
                <MenuItem
                  className="menu-item"
                  onClick={(e) => {
                    e.preventDefault()
                    signOut()
                  }}
                >
                  ログアウト
                </MenuItem>
                <MenuItem
                  onClick={() => Router.push('/create')}
                  className="menu-item"
                >
                  投稿する
                </MenuItem>
              </MenuContainer>
            </>
          )}
        </ButtonContainer>
      </div>
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context)
  if (!session) {
    return { props: {} }
  }
  return {
    props: {
      session: await getServerSession(context.req, context.res, authOptions),
    },
  }
}
