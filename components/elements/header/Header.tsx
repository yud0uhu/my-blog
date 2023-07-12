import { ActionIcon } from "@mantine/core";
import { signIn, signOut, useSession } from "next-auth/react";
import Router from "next/router";
import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { ButtonContainer, Button } from "../../layout";
import { GlobalStyle } from "./styles/HeaderStyles";

const Header: React.FC = () => {
  const { data: session } = useSession();
  const [colorScheme, setColorScheme] = useState("light");
  useEffect(() => {
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
  }, [colorScheme]);
  const handleColorSchemeChange = () => {
    const newColorScheme = colorScheme === "light" ? "dark" : "light";
    setColorScheme(newColorScheme);
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

  return (
    <>
      <GlobalStyle />
      <div className="header">
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

        <ButtonContainer>
          {session ? (
            <>
              <Button className="button" onClick={handleSignOut}>
                ログアウト
              </Button>
              <Button className="button" onClick={() => Router.push("/create")}>
                投稿する
              </Button>
            </>
          ) : (
            <>
              <Button className="button" onClick={handleSignIn}>
                ログイン
              </Button>
            </>
          )}
        </ButtonContainer>
      </div>
    </>
  );
};
export default Header;
