import * as React from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { log } from "../utils";
import Layout from "../layouts/DefaultLayout";
import { ApolloConsumer } from "react-apollo";
import { State } from "react-powerplug";
import { isUser } from "../queries";

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
    marginBottom: 10,
    textAlign: "left"
  },
  messageContainer: {
    height: 30
  }
});

const initialState: {
  name: string;
  isUser?: boolean;
  lastQuery?: string;
} = {
  name: "",
  isUser: undefined,
  lastQuery: undefined
};

const Detail = () => (
  <Layout>
    <View style={styles.container}>
      <Text style={styles.title}>Please type your name to login</Text>
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
                  <Button
                    title="Login"
                    onPress={() =>
                      query<{ isUser: boolean }>({
                        query: isUser,
                        variables: { name: state.name }
                      })
                        .then(({ data: { isUser } }) =>
                          setState({ isUser, lastQuery: state.name })
                        )
                        .catch(log)
                    }
                  />
                </View>
                <View style={styles.messageContainer}>
                  {state.isUser && (
                    <Text>{`Nice, ${state.lastQuery} is a valid user!`}</Text>
                  )}
                  {!state.isUser &&
                    state.lastQuery && (
                      <Text>
                        {`${state.lastQuery} not found, please register!`}
                      </Text>
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

export default Detail;
