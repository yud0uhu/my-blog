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

export const setHeaderStyles = (colorScheme: string) => {
  document.documentElement.style.setProperty(
    "--header-background-color",
    colorScheme === "light" ? "white" : "dark"
  );
  document.documentElement.style.setProperty(
    "--post-text-color",
    colorScheme === "light" ? "black" : "white"
  );
  document.documentElement.style.setProperty(
    "--items-background-color",
    colorScheme === "light" ? "white" : "#0E1117"
  );
  document.documentElement.style.setProperty(
    "--input-color",
    colorScheme === "light" ? "black" : "white"
  );
  document.documentElement.style.setProperty(
    "--textarea-background-color",
    colorScheme === "light" ? "white" : "#0E1117"
  );
  document.documentElement.style.setProperty(
    "--background-color",
    colorScheme === "light" ? "#f6f8fa" : "#02040A"
  );
  document.documentElement.style.setProperty(
    "--menu-item-color",
    colorScheme === "light" ? "white" : "#0E1117"
  );
};
