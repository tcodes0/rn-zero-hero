import * as React from "react";
import styled from "styled-components/native";
import { capitalize } from "../utils";
import { Strong } from "../components";

const OuterBackground = styled.ImageBackground`
  padding: 15px 15px 15px 15px;
  height: 100%;
  width: 100%;
`;

const InnerBackground = styled.ImageBackground`
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
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
    <OuterBackground
      source={require("../../ios/Resources/wood-bg.png")}
      {...otherProps}
    >
      {user && <Header>Welcome {capitalize(user)}!</Header>}
      <InnerBackground source={require("../../ios/Resources/paper-bg.png")}>{children}</InnerBackground>
    </OuterBackground>
  );
};

export default Layout;
