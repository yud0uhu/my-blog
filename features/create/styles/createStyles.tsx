import styled from "@emotion/styled";

export const Page = styled.div`
  padding: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Input = styled.input`
  width: 100%;
  padding: 1.5rem;
  margin: 0.5rem 0;
  background: #0000;
  transition: 0.25s ease-in-out;
  border: none;
  font-size: 1.4rem;
  font-weight: bold;

  &:focus {
    outline: #0000;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 1.5rem;
  margin: 0.5rem 0;
  border: 0.125rem solid #0000;
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 20px rgba(240, 235, 235, 0.3);

  &:focus {
    outline: #0000;
    height: 400px;
    resize: none;
  }
`;

export const Button = styled.button`
  height: 35px;
  width: 96px;
  position: fixed;
  top: 0;
  right: 0;
  margin: 10px 10px;
  z-index: 999;
  border: 0;
  border-radius: 10px;
  background-color: black;
  box-shadow: 0 10px 20px rgba(240, 235, 235, 0.3);
  border: 0.125rem solid #0000;
  font-weight: bold;
  color: white;
`;

export const BackLink = styled.a`
  position: fixed;
  top: 20px;
  left: 30px;
  z-index: 999;
  border: 0;
  margin-left: 1rem;
  color: black;
`;
