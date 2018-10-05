import * as React from "react";
import styled from "styled-components/native";

const TextInput = styled.TextInput`
  font-family: Spectral;
  font-weight: 500;
  font-style: italic;
  min-width: 120px;
  border-color: ${props => props.theme.colors.faded2};
  border-style: solid;
  border-width: 1px;
  width: 180px;
`;

export default (props: any) => (
  <TextInput
    autoCapitalize="none"
    placeholderTextColor="rgba(83, 32, 0, 0.7)"
    {...props}
  />
);
