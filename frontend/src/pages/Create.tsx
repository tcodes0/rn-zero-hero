import * as React from "react";
import { Text, TextInput, AsyncStorage } from "react-native";
import styled from "styled-components/native";
import { State } from "react-powerplug";
import { ApolloConsumer } from "react-apollo";
import { log, getNavParams } from "../utils";
import { addBook } from "../mutations";
import Layout from "../layouts/DefaultLayout";
import { Button, Wrapper } from "../components";

const Title = styled.Text`
    background-color: #F5FCFF;
    font-size: 22;
    margin-bottom: 50;
`;

const Field = styled.View`
  margin-bottom: 20px;
`;

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
          <Wrapper>
            <Title>Create a book</Title>
            <Field>
              <Text>Enter book title</Text>
              <TextInput
                value={state.title}
                placeholder="title..."
                onChangeText={input => setState({ title: input })}
              />
            </Field>
            <Field>
              <Text>Enter author name</Text>
              <TextInput
                value={state.name}
                placeholder="name..."
                onChangeText={input => setState({ name: input })}
              />
            </Field>
            <Field>
              <Text>How old is the author?</Text>
              <TextInput
                value={state.age || ""}
                placeholder="age..."
                onChangeText={(input: string) => {
                  if (Number.isNaN(Number(input))) return;
                  return setState({ age: input });
                }}
              />
            </Field>
            <Button onPress={() => setState(initialState)}>
              <Text>Reset</Text>
            </Button>
            <ApolloConsumer>
              {({ mutate }) => (
                <Button
                  onPress={() => {
                    const { age, name, title } = state;
                    AsyncStorage.getItem("token").then(token => {
                      if (!age || !name || !title) return;
                      return mutate({
                        mutation: addBook,
                        variables: { name, title, token, age: Number(age) }
                      })
                        .then(log, log)
                        .then(() => navigate("List", { user }));
                    });
                  }}
                >
                  <Text>OK</Text>
                </Button>
              )}
            </ApolloConsumer>
            <Button onPress={() => navigate("List", { user })}>
              <Text>See books</Text>
            </Button>
          </Wrapper>
        )}
      </State>
    </Layout>
  );
};

export default Create;
