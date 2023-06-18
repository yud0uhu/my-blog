import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
.header {
  background-color: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 60px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
}
`;
