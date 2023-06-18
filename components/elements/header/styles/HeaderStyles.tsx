import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
.header {
  background-color: white;
  box-shadow: 0 10px 20px rgb(240, 235, 235);
  width: 100%;
  height: 60px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
}
`;
