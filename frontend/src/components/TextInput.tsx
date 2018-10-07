import * as React from "react";
import styled from "styled-components/native";

const TextInput = styled.TextInput`
  font-family: "Nunito";
  font-weight: 300;
  font-style: italic;
  font-size: 17;
  min-width: 120px;
  min-height: 30px;
  border-color: ${props => props.theme.colors.textFaded};
  border-style: solid;
  border-width: 0px;
  width: 180px;
`;

export default (props: any) => (
  <TextInput
    autoCapitalize="none"
    placeholderTextColor="rgba(33, 0, 0, 0.7)"
    {...props}
  />
);
