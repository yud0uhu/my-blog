import { ActionIcon } from "@mantine/core";
import { getSession, signIn, signOut, useSession } from "next-auth/react";
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
import { setHeaderStyles } from "./styles/HeaderStyles";

const Header: React.FC = () => {
  const { data: session } = useSession({ required: false });

  const [colorScheme, setColorScheme] = useState("light");
  useEffect(() => {
    const localStorageTheme = localStorage.getItem("theme");
    setColorScheme(localStorageTheme || "light");

    setHeaderStyles(colorScheme);
  }, [colorScheme]);

  const handleColorSchemeChange = () => {
    const newColorScheme = colorScheme === "light" ? "dark" : "light";
    setColorScheme(newColorScheme);
    localStorage.setItem("theme", newColorScheme);
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
                src={`https://github.com/${session.user}.png`}
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
