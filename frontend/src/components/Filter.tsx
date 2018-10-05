import * as React from "react";
import { Value } from "react-powerplug";
import styled from "styled-components/native";
import TextInput from "./TextInput";

const Input = styled(TextInput)`
  font-size: 17px;
  margin-bottom: 10px;
  text-align: left;
`;

const Filter = (props: any) => {
  const { onChangeText, ...others } = props;

  return (
    <Value initial="">
      {({ value: text, set }) => (
        <Input
          value={text}
          placeholder="filter by typing..."
          onChangeText={(input: string) => {
            set(input);
            return onChangeText(input);
          }}
          {...others}
        />
      )}
    </Value>
  );
};

export default Filter;
