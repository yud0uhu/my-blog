import styled, {
  createGlobalStyle,
  DefaultTheme,
  ThemeProps,
} from 'styled-components'
import { TextInput } from '@mantine/core'
import { Sawarabi_Gothic } from 'next/font/google'

export const SawarabiGothic = Sawarabi_Gothic({
  variable: '--font-sawarabi_gothic',
  subsets: ['latin'],
  weight: '400',
})

export const GlobalStyle = createGlobalStyle`
  .header {
    background-color: var(--header-background-color);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    width: 100%;
    height: 60px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
  }

  .icon {
    top: 15px;
    left: 15px;
    position: fixed;
  }

  html {
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    color: var(--post-text-color);
    margin: 0;
    padding: 0;
    font-size: 16px;
    /* font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"; */
    background-color: var(--background-color); /* CSS変数を参照して背景色を適用 */
    background-blend-mode: lighten;
  }

  input, textarea {
    font-size: 16px;
  }

  .tag-remove-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
}

`

export const StyledButton = styled.button`
  right: 0px;
  padding: 5px 20px;
  margin: 2.5 2.5px;
  position: relative;
  font-size: 16px;
  background-color: var(--button-color);
  color: #fff;
  border: none;
  border-radius: 4px;
  z-index: 999;
  border-radius: 10px;
  border: 0.125rem solid var(--button-color);
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: var(--button-hover-color);
    border: 0.125rem solid var(--button-hover-color);
  }

  &:disabled {
    background-color: gray;
    border: 0.125rem solid gray;
  }
`

export const ButtonContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  margin: 10px 10px;
  display: flex;
  gap: 10px;
  z-index: 999;
`

export const MenuIcon = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
`

export const MenuItem = styled.p`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin: 0px;
  padding: 10px;
  color: var(--post-text-color);
`

export const MenuContainer = styled.div<{ isOpen?: boolean }>`
  width: 100px;
  position: absolute;
  top: 40px;
  right: 0;
  background-color: var(--menu-item-color);
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: ${(props) => (props.isOpen ? 'flex' : 'none')};
  flex-direction: column;
  align-items: flex-start;

  .menu-item {
    width: 100%;
    cursor: pointer;
    display: inline-block;
  }

  .menu-item:hover {
    background-color: var(--menu-hover-color);
  }
`

export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  text-align: center;
`

export const LayoutWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 2rem;
  margin-top: 70px;
`

export const ItemWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .actions {
    margin-top: 2rem;
  }

  .post {
    /* background: white; */
    border-radius: 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease-in-out;

    &:hover {
      box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
    }
  }

  .items-container {
    display: flex;
    flex-wrap: wrap;
    z-index: 99;
    margin-top: 30px;
    justify-content: center;
    align-items: center;
  }

  .items-container > * {
    background-color: var(--items-background-color);
    word-break: break-word;
    width: 300px;
    height: 300px;
    margin-right: 30px;
    margin-bottom: 30px;
  }

  .logo-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 8px auto;
  }

  .search-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 32px auto;
  }

  .search-box {
    margin: 0 auto;
    font-weight: bold;
    border: none;
  }
`
export const StyledContainer = styled.div`
  max-width: 660px;
  width: 100%;
  margin: 0 auto;
`

export const StyledTextInput = styled(TextInput)`
  & .mantine-TextInput-input {
    margin: 0px 0px 10px 0px;
    border-width: 0rem;
    background-color: var(--textarea-background-color);
    width: 100%;
  }
  & .mantine-TextInput-input:focus {
    outline: 0.125rem solid #aca4ce;
  }
`

export const TagBadgesContainer = styled.div`
  display: flex;
  gap: 8px;
`
