import styled from "styled-components";

export const Page = styled.div`
  padding: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PostContainer = styled.div`
  background: white;
  transition: box-shadow 0.1s ease-in;
  border-radius: 20px;

  &:hover {
    box-shadow: 0px -300px 300px 0px rgba(240, 235, 235, 0.8) inset;
  }
`;

export const ItemsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  z-index: 99;
  margin-top: 30px;

  > * {
    word-break: break-word;
    width: 300px;
    height: 300px;
    margin-right: 30px;
    margin-bottom: 30px;
  }
`;

export const BackLink = styled.div`
  position: fixed;
  top: 20px;
  left: 30px;
  z-index: 999;
  border: 0;
  margin-left: 1rem;
  color: black;
`;
