import { ActionIcon } from "@mantine/core";
import { signIn, signOut, useSession } from "next-auth/react";
import Router from "next/router";
import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import {
  ButtonContainer,
  StyledButton,
  MenuIcon,
  MenuItem,
  MenuContainer,
} from "../../layout";
import { GlobalStyle } from "./styles/HeaderStyles";

const Header: React.FC = () => {
  const { data: session } = useSession();
  const [colorScheme, setColorScheme] = useState("light");
  useEffect(() => {
    const localStorageTheme = localStorage.getItem("theme");
    setColorScheme(localStorageTheme || "light");

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
      "--textarea-background-color:",
      colorScheme === "light" ? "white" : "#0E1117"
    );
  }, [colorScheme]);
  const handleColorSchemeChange = () => {
    const newColorScheme = colorScheme === "light" ? "dark" : "light";
    setColorScheme(newColorScheme);
    localStorage.setItem("theme", newColorScheme);
    document.documentElement.style.setProperty(
      "--background-color",
      newColorScheme === "light" ? "#f6f8fa" : "#02040A"
    );
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const handleSignIn = async () => {
    await signIn();
  };
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <GlobalStyle />
      <div className="header">
        <ButtonContainer>
          <ActionIcon
            className="icon"
            variant="outline"
            color={colorScheme === "dark" ? "yellow" : "blue"}
            onClick={() => handleColorSchemeChange()}
            title="Toggle color scheme"
          >
            {colorScheme === "dark" ? (
              <FaSun size="1.1rem" />
            ) : (
              <FaMoon size="1.1rem" />
            )}
          </ActionIcon>

          {session ? (
            <>
              <MenuIcon
                src="https://github.com/yud0uhu.png"
                alt="Menu"
                onClick={handleMenuToggle}
              />
              <MenuContainer isOpen={isOpen}>
                <MenuItem onClick={handleSignOut} className="menu-item">
                  ログアウト
                </MenuItem>
                <MenuItem
                  onClick={() => Router.push("/create")}
                  className="menu-item"
                >
                  投稿する
                </MenuItem>
              </MenuContainer>
            </>
          ) : (
            <StyledButton onClick={handleSignIn}>ログイン</StyledButton>
          )}
        </ButtonContainer>
      </div>
    </>
  );
};
export default Header;
