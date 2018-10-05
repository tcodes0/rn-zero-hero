import * as React from "react";
import styled from "styled-components/native";
import { capitalize } from "../utils";
import { Strong } from "../components";

const Wrapper = styled.ImageBackground`
  padding: 15px 15px 15px 15px;
  height: 100%;
  width: 100%;
  /* background-color: rgba(151, 72, 0, 1); */
`;

const Header = styled(Strong)`
  font-size: 12px;
  margin-bottom: 10px;
  text-align: left;
  width: 100%;
  color: white;
`;

const Layout = (props: any) => {
  const { children, user, ...otherProps } = props;

  return (
    <Wrapper source={require("../../ios/Resources/wood-bg.png")} {...otherProps}>
      {user && <Header>Welcome {capitalize(user)}!</Header>}
      {children}
    </Wrapper>
  );
};

export default Layout;
