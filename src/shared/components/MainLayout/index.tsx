import { PropsWithChildren } from "react";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  min-width: 360px;
`;

export const MainLayout = ({ children }: PropsWithChildren) => {
  return <Container>{children}</Container>;
};
