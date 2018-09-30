import * as React from "react";
import { TextInput, Button, View, StyleSheet } from "react-native";
import { Value } from "react-powerplug";

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  input: {
    fontSize: 17,
    marginBottom: 10
  },
  button: {}
});

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
        <View style={styles.container}>
          <TextInput
            style={styles.input}
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
