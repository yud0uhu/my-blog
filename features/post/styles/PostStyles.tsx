import styled from "styled-components";

export const PostContainer = styled.div`
  padding: 2rem;
`;

export const StyledPost = styled.div`
  padding: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;

  .actions {
    margin-top: 2rem;
  }

  button {
    background: white;
    border: 0;
    border-radius: 0.125rem;
    padding: 1rem 2rem;
  }

  button + button {
    margin-left: 1rem;
  }

  .back {
    position: fixed;
    top: 20px;
    left: 30px;
    z-index: 999;
    border: 0;
    margin-left: 1rem;
  }
`;

export const StyledTitle = styled.h2<{ unpublished?: boolean }>`
  ${({ unpublished }) =>
    unpublished &&
    `
    &::before {
      content: "編集中...";
    }
  `}
`;
