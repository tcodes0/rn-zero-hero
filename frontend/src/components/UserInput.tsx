import * as React from "react";
import { TextInput, Button, View } from "react-native";
import { Value } from "react-powerplug";

const UserInput = props => {
  const {
    initial,
    onPress,
    title,
    onChangeText: onChangeTextProps,
    ...otherProps
  } = props;

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
          <Button title={title || "Submit"} onPress={() => onPress(value)} />
        </View>
      )}
    </Value>
  );
};

export default UserInput;
