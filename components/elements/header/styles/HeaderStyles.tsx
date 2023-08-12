import styled, { createGlobalStyle } from "styled-components";

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
`;

export const setHeaderStyles = (colorScheme: string) => {
  document.documentElement.style.setProperty(
    "--header-background-color",
    colorScheme === "light" ? "white" : "#2D283B"
  );
  document.documentElement.style.setProperty(
    "--post-text-color",
    colorScheme === "light" ? "#45432B" : "#ACA4CE"
  );
  document.documentElement.style.setProperty(
    "--items-background-color",
    colorScheme === "light" ? "white" : "#2D283B"
  );
  document.documentElement.style.setProperty(
    "--input-color",
    colorScheme === "light" ? "#45432B" : "#ACA4CE"
  );
  document.documentElement.style.setProperty(
    "--textarea-background-color",
    colorScheme === "light" ? "white" : "#2D283B"
  );
  document.documentElement.style.setProperty(
    "--background-color",
    colorScheme === "light" ? "#eae3e8" : "#02040A"
  );
  document.documentElement.style.setProperty(
    "--menu-item-color",
    colorScheme === "light" ? "#ACA4CE" : "#2D283B"
  );
  document.documentElement.style.setProperty(
    "--button-color",
    colorScheme === "light" ? "#955764" : "#8e99c0"
  );
  document.documentElement.style.setProperty(
    "--button-hover-color",
    colorScheme === "light" ? "#a1a14e" : "#737ba7"
  );
  document.documentElement.style.setProperty(
    "--button-text-color",
    colorScheme === "light" ? "#eae3e8" : "#2d283b"
  );
};
