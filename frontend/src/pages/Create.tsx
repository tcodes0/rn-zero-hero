import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  AsyncStorage
} from "react-native";
import { Value } from "react-powerplug";
import { ApolloConsumer } from "react-apollo";
import { log, getNavParams } from "../utils";
import { addBook } from "../mutations";
import Layout from "../layouts/DefaultLayout";

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

const initialState: { name: string; age?: number; title: string } = {
  name: "",
  title: ""
};

const Create = props => {
  const { navigate } = props.navigation;
  const user = getNavParams(props, "user");

  return (
    <Layout user={user}>
      <Value initial={initialState}>
        {({ value, set }) => (
          <View style={styles.container} {...props}>
            <Text style={styles.title}>Create a book</Text>
            <View style={styles.wrapper}>
              <Text>Enter book title</Text>
              <TextInput
                value={value.title}
                placeholder="title..."
                onChangeText={input =>
                  set(state => ({ ...state, title: input }))
                }
              />
            </View>
            <View style={styles.wrapper}>
              <Text>Enter author name</Text>
              <TextInput
                value={value.name}
                placeholder="name..."
                onChangeText={input =>
                  set(state => ({ ...state, name: input }))
                }
              />
            </View>
            <View style={styles.wrapper}>
              <Text>How old is the author?</Text>
              <TextInput
                value={value.age && String(value.age)}
                placeholder="age..."
                onChangeText={input =>
                  set(state => ({ ...state, age: Number(input) }))
                }
              />
            </View>
            <Button title="Reset" onPress={() => set(initialState)} />
            <ApolloConsumer>
              {({ mutate }) => (
                <Button
                  title="OK"
                  onPress={() => {
                    AsyncStorage.getItem("token").then(token => {
                      return mutate({
                        mutation: addBook,
                        variables: {...value, token }
                      })
                        .then(log, log)
                        .then(() => navigate("List", { user }));
                    })
                  }}
                />
              )}
            </ApolloConsumer>
          </View>
        )}
      </Value>
    </Layout>
  );
};

export default Create;
