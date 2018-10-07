import * as React from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";

const Touchable = (props: any) => {
  const { children, ...other } = props;

  return (
    <TouchableOpacity
      activeOpacity={0.4}
      {...other}
    >
      {children}
    </TouchableOpacity>
  );
};

const Button = styled(Touchable)`
  border-color: ${props => props.theme.colors.text};
  border-style: solid;
  border-width: 2px;
  border-radius: 22;
  padding: 5px;
  align-items: center;
  font-size: 8px;
  min-width: 80px;
  min-height: 45px;
  margin: 8px;
  justify-content: center;
`;

export default Button;
