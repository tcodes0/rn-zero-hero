import * as React from "react";
import styled from "styled-components/native";

const TextInput = styled.TextInput`
  font-family: "Nunito";
  font-weight: 400;
  font-size: 17;
  min-width: 120px;
  min-height: 30px;
  border-style: solid;
  padding: 7px;
  width: 180px;
  border-width: 2px;
  border-color: ${props => props.theme.gray[0]};
  border-radius: ${props => props.theme.border.radius};
  color: ${props => props.theme.colors.black};
`;

export default (props: any) => (
  <TextInput
    autoCapitalize="none"
    placeholderTextColor="rgba(0, 0, 0, 0.6)"
    {...props}
  />
);
