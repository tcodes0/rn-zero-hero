import * as React from "react";
import styled from "styled-components/native";

const TextInput = styled.TextInput`
  font-family: Spectral;
  font-style: italic;
`;

export default (props: any) => <TextInput autoCapitalize="none" {...props} />;
