import * as React from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import ControlledInput from "../components/ControlledInput";
import { Value } from "react-powerplug";
import { log, getNumericId } from "../utils";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  title: {
    backgroundColor: "#F5FCFF",
    fontSize: 22,
    marginBottom: 50
  },
  wrapper: {
    marginBottom: 20
  }
});

interface Author {
  name: string;
  age: string;
}

const initialState = { name: "", age: "" };
const authorToDataArray = (author: Author) => {
  const { name, age } = author;
  return [{ id: getNumericId(), text: `${name}, ${age} years old.` }];
};
const makeSection = (title: string, data) => [{
  id: getNumericId(),
  title,
  data
}];

const Create = props => {
  const { navigate } = props.navigation;

  return (
    <Value initial={initialState}>
      {({ value, set }) => (
        <View style={styles.container} {...props}>
          <Text style={styles.title}>Create Author</Text>
          <View style={styles.wrapper}>
            <Text>Enter name</Text>
            <TextInput
              value={value.name}
              placeholder="name..."
              onChangeText={input => set(state => ({ ...state, name: input }))}
            />
          </View>
          <View style={styles.wrapper}>
            <Text>How old?</Text>
            <TextInput
              value={value.age}
              placeholder="age..."
              onChangeText={input => set(state => ({ ...state, age: input }))}
            />
          </View>
          <Button title="Reset" onPress={() => set(initialState)} />
          <Button
            title="OK"
            onPress={() =>
              navigate("List", makeSection("Authors", authorToDataArray(value)))
            }
          />
        </View>
      )}
    </Value>
  );
};

export default Create;
