import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  AsyncStorage
} from "react-native";
import { formatMessage, log } from "../utils";
import Layout from "../layouts/DefaultLayout";
import { ApolloConsumer } from "react-apollo";
import { State } from "react-powerplug";
import { login } from "../queries";

const styles = StyleSheet.create({
  title: {
    marginBottom: 70,
    fontSize: 18
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
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
  token?: string;
  error?: Error;
} = {
  name: "",
  password: ""
};

const Login = props => {
  const { navigate } = props.navigation;

  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome back</Text>
        <State initial={initialState}>
          {({ state, setState }) => (
            <ApolloConsumer>
              {({ query }) => (
                <View style={styles.loginContainer}>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      placeholder="Your name..."
                      value={state.name}
                      onChangeText={name => setState({ name })}
                    />
                    <TextInput
                      style={styles.input}
                      secureTextEntry
                      placeholder="Password..."
                      value={state.password}
                      onChangeText={password => setState({ password })}
                    />
                    <Button
                      title="Login"
                      onPress={() => {
                        const { name, password } = state;
                        if (!name || !password)
                          return setState({
                            error: Error(
                              "Null input: Please don't leave it blank"
                            )
                          });

                        setState({ token: undefined });
                        query<{ login: { token: string } }>({
                          query: login,
                          variables: { name, password }
                        })
                          .then(({ data: { login: { token } } }) => {
                            setState({ token, error: undefined });
                            AsyncStorage.setItem("token", token)
                              .catch(e => e && log(e));
                            navigate("Create", { user: state.name });
                          })
                          .catch(error => {
                            setState({ error });
                          });
                      }}
                    />
                    <Button
                      title="Create account"
                      onPress={() => navigate("Register")}
                    />
                  </View>
                  <View style={styles.messageContainer}>
                    {!state.token &&
                      state.error && (
                        <Text>{formatMessage(state.error.message)}</Text>
                      )}
                  </View>
                </View>
              )}
            </ApolloConsumer>
          )}
        </State>
      </View>
    </Layout>
  );
};

export default Login;
