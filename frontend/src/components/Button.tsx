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
  background-color: ${props => props.theme.secondary[0]};
  border-radius: ${props => props.theme.border.radius};
  padding: 5px;
  align-items: center;
  font-size: 8px;
  min-width: 80px;
  min-height: 45px;
  margin: 8px;
  justify-content: center;
`;

export default Button;
