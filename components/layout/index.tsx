import React from "react";
import Header from "../elements/header/Header";
import Footer from "../elements/footer/Footer";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  :root {
    --background-color: #f6f8fa; 
    --post-text-color: black;
    --items-background-color: white;
  }

  body {
    color: var(--post-text-color);
    margin: 0;
    padding: 0;
    font-size: 16px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    /* background-color: rgb(240, 235, 235); */
    background-color: var(--background-color); /* CSS変数を参照して背景色を適用 */
    background-blend-mode: lighten;
  }

  input, textarea {
    font-size: 16px;
  }
`;

export const ButtonContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  margin: 10px 10px;
  display: flex;
  gap: 10px;
  z-index: 999;
`;

export const Button = styled.button`
  padding: 5px 20px;
  margin: 0 10px;
  font-size: 16px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 4px;
  z-index: 999;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgb(240, 235, 235, 0.3);
  border: 0.125rem solid #0000;
  color: white;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #555;
  }
`;

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const LayoutWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 2rem;
  margin-top: 70px;
`;

const ItemWrapper = styled.div`
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

  .search-box {
    height: 28px;
    width: 10em;
    top: 0px;
    position: fixed;
    inset: 0;
    margin: 0 auto;
    font-weight: bold;
    z-index: 999;
    border: none;
  }
`;

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = (props) => {
  return (
    <Container>
      <GlobalStyle />
      <Header />
      <LayoutWrapper>
        <ItemWrapper>{props.children}</ItemWrapper>
      </LayoutWrapper>
      <Footer />
    </Container>
  );
};

export default Layout;
