import * as React from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import { Value } from "react-powerplug";
import { ApolloConsumer } from "react-apollo";
import { log } from "../utils";
import { ADDBOOK } from "../mutations";

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
  age?: number;
}
interface Book extends Author {
  title: string;
}

const initialState: Book = { name: "", title: "", age: undefined };

const Create = props => {
  const { navigate } = props.navigation;

  return (
    <Value initial={initialState}>
      {({ value, set }) => (
        <View style={styles.container} {...props}>
          <Text style={styles.title}>Create a book</Text>
          <View style={styles.wrapper}>
            <Text>Enter book title</Text>
            <TextInput
              value={value.title}
              placeholder="title..."
              onChangeText={input => set(state => ({ ...state, title: input }))}
            />
          </View>
          <View style={styles.wrapper}>
            <Text>Enter author name</Text>
            <TextInput
              value={value.name}
              placeholder="name..."
              onChangeText={input => set(state => ({ ...state, name: input }))}
            />
          </View>
          <View style={styles.wrapper}>
            <Text>How old is the author?</Text>
            <TextInput
              value={value.age && String(value.age)}
              placeholder="age..."
              onChangeText={input => set(state => ({ ...state, age: Number(input) }))}
            />
          </View>
          <Button title="Reset" onPress={() => set(initialState)} />
          <ApolloConsumer>
            {client => (
              <Button
                title="OK"
                onPress={() => {
                  client
                    .mutate({
                      mutation: ADDBOOK,
                      variables: value
                    })
                    .then(log, log)
                    .then(() => navigate("List"));
                }}
              />
            )}
          </ApolloConsumer>
        </View>
      )}
    </Value>
  );
};

export default Create;
