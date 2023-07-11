import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
:root {
  --header-background-color: white;
}
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
`;
