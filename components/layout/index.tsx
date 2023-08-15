import React from 'react'
import Header from '../elements/header/Header'
import Footer from '../elements/footer/Footer'
import {
  Container,
  GlobalStyle,
  ItemWrapper,
  LayoutWrapper,
  SawarabiGothic,
} from './styles'
type LayoutProps = {
  children: React.ReactNode
  backgroundColor?: string
}

const Layout: React.FC<LayoutProps> = (props) => {
  return (
    <Container>
      <header>
        <Header />
      </header>
      <main style={SawarabiGothic.style}>
        <LayoutWrapper>
          <ItemWrapper>{props.children}</ItemWrapper>
        </LayoutWrapper>
      </main>
      <footer style={SawarabiGothic.style}>
        <Footer />
      </footer>
    </Container>
  )
}

export default Layout
