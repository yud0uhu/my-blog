import { css } from "@emotion/react";
import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin: 10px;
  font-size: 16px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #555;
  }
`;

const StyledButton = styled(Button)`
  ${(props) =>
    css`
      padding: 10px 20px;
      margin: 10px;
      font-size: 16px;
      background-color: #333;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;

      &:hover {
        background-color: #555;
      }
    `}
`;

const loginStyled = { Container, Button, StyledButton };

export default loginStyled;
