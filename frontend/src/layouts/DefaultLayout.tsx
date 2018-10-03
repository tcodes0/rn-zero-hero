import * as React from "react";
import styled from "styled-components/native";
import { capitalize } from "../utils";

const Wrapper = styled.View`
  padding: 10px;
  height: 100%;
  width: 100%;
`;

const Header = styled.Text`
  font-size: 12px;
  margin-bottom: 10px;
  text-align: left;
  width: 100%;
  padding-top: 5px;
`;

const Layout = (props: any) => {
  const { children, user, ...otherProps } = props;

  return (
    <Wrapper {...otherProps}>
      {user && (
        <Header>Welcome {capitalize(user)}!</Header>
      )}
      {children}
    </Wrapper>
  );
};

export default Layout;
