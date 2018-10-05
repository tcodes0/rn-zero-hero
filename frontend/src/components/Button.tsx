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
  padding: 13px;
  align-items: center;
  font-size: 18px;
  min-width: 100px;
  margin: 8px;
  background-color: ${props => props.theme.colors.faded};
`;


export default Button;
