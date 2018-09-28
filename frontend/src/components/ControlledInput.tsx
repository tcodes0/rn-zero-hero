import * as React from "react";
import { TextInput, View } from "react-native";
import { Value } from "react-powerplug";

const ControlledInput = props => {
  const { initial, onChangeText: onChangeTextProps, ...otherProps } = props;

  return (
    <Value initial={initial}>
      {({ value, set }) => (
        <View>
          <TextInput
            placeholder="Type something..."
            value={value}
            onChangeText={text => {
              set(text);
              if (onChangeTextProps) onChangeTextProps(text);
            }}
            {...otherProps}
          />
        </View>
      )}
    </Value>
  );
};

export default ControlledInput;
