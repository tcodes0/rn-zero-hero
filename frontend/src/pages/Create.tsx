import * as React from "react";
import { StyleSheet, Text, View, TextInput, AsyncStorage } from "react-native";
import { State } from "react-powerplug";
import { ApolloConsumer } from "react-apollo";
import { log, getNavParams } from "../utils";
import { addBook } from "../mutations";
import Layout from "../layouts/DefaultLayout";
import Touchable from "../components/Touchable";

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
  },
  touchable: {
    margin: 8
  }
});

const initialState: { name: string; age?: string; title: string } = {
  name: "",
  title: ""
};

const Create = (props: any) => {
  const { navigate } = props.navigation;
  const user = getNavParams(props, "user");

  return (
    <Layout user={user}>
      <State initial={initialState}>
        {({ state, setState }) => (
          <View style={styles.container} {...props}>
            <Text style={styles.title}>Create a book</Text>
            <View style={styles.wrapper}>
              <Text>Enter book title</Text>
              <TextInput
                value={state.title}
                placeholder="title..."
                onChangeText={input => setState({ title: input })}
              />
            </View>
            <View style={styles.wrapper}>
              <Text>Enter author name</Text>
              <TextInput
                value={state.name}
                placeholder="name..."
                onChangeText={input => setState({ name: input })}
              />
            </View>
            <View style={styles.wrapper}>
              <Text>How old is the author?</Text>
              <TextInput
                value={state.age || ""}
                placeholder="age..."
                onChangeText={(input: string) => {
                  if (Number.isNaN(Number(input))) return
                  return setState({ age: input })
                }}
              />
            </View>
            <Touchable
              onPress={() => setState(initialState)}
              style={styles.touchable}
            >
              <Text>Reset</Text>
            </Touchable>
            <ApolloConsumer>
              {({ mutate }) => (
                <Touchable
                  style={styles.touchable}
                  onPress={() => {
                    const { age, name, title } = state;
                    AsyncStorage.getItem("token").then(token => {
                      if (!age || !name || !title) return
                      return mutate({
                        mutation: addBook,
                        variables: { name, title, token, age: Number(age) }
                      })
                        .then(log, log)
                        .then(() => navigate("List", { user }))
                    }
                    );
                  }}
                >
                  <Text>OK</Text>
                </Touchable>
              )}
            </ApolloConsumer>
            <Touchable
              onPress={() => navigate("List", { user })}
              style={styles.touchable}
            >
              <Text>See books</Text>
            </Touchable>
          </View>
        )}
      </State>
    </Layout>
  );
};

export default Create;
