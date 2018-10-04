import * as React from "react";
import styled from "styled-components/native";

const Touchable = styled.TouchableOpacity`
  border-radius: 17px;
  border-color: pink;
  border-style: solid;
  padding: 15px;
  align-items: center;
  font-weight: bold;
  background-color: skyblue;
  font-size: 18px;
  min-width: 100px;
`;

const Component = (props: any) => {
  const { children, ...other } = props;

  return (
    <Touchable
      activeOpacity={0.4}
      {...other}
    >
      {children}
    </Touchable>
  );
};

export default Component;
