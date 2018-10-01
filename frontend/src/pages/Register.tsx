import * as React from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { ApolloConsumer } from "react-apollo";
import { State } from "react-powerplug";
import Layout from "../layouts/DefaultLayout";
import { log } from "../utils";
import { addUser } from "../mutations";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  title: {
    marginBottom: 30,
    fontSize: 18
  },
  loginContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  inputContainer: {
    padding: 10,
    maxWidth: "45%"
  },
  input: {
    fontSize: 17,
    marginBottom: 25,
    textAlign: "left"
  },
  messageContainer: {
    height: 30
  }
});

const initialState: {
  name: string;
  password: string;
} = {
  name: "",
  password: ""
};

const Detail = props => {
  const param = props.navigation.getParam("text", "null");

  return (
    <Layout>
      <View style={styles.container} {...props}>
        <Text style={styles.title}>Please fill in the fields to register</Text>
        <State initial={initialState}>
          {({ state, setState }) => (
            <ApolloConsumer>
              {({ mutate }) => (
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Your name..."
                    value={state.name}
                    onChangeText={name => setState({ name })}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Password..."
                    value={state.password}
                    onChangeText={password => setState({ password })}
                  />
                  <Button
                    title="Register"
                    onPress={() =>
                      mutate<{ token: string }>({
                        mutation: addUser,
                        variables: {
                          name: state.name,
                          password: state.password
                        }
                      })
                        .then(({ data: { addUser } }) => console.log(addUser))
                        .catch(log)
                    }
                  />
                </View>
              )}
            </ApolloConsumer>
          )}
        </State>
      </View>
    </Layout>
  );
};

export default Detail;
