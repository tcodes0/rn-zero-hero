import * as React from "react";
import {
  Text,
  TextInput,
  AsyncStorage,
  View,
  ActivityIndicator
} from "react-native";
import styled from "styled-components/native";
import gql from "graphql-tag";
import { Mutation, MutationFn } from "react-apollo";
import { log, getNavParams, formatMessage } from "../utils";
import Layout from "../layouts/DefaultLayout";
import { Button, Wrapper } from "../components";

const Title = styled.Text`
  background-color: #f5fcff;
  font-size: 22;
  margin-bottom: 50;
`;

const Field = styled.View`
  margin-bottom: 20px;
`;

const Feedback = styled.View`
  height: 30px;
`;

const mutationAddBook = gql`
  mutation($title: String!, $name: String!, $age: Int!, $token: String!) {
    addBook(title: $title, author: { name: $name, age: $age }, token: $token) {
      title
      author {
        name
        age
      }
    }
  }
`;

type CreateState = Readonly<{
  name: string;
  age?: string;
  title: string;
  error?: Error;
}>;
type addBookdata = any;

class Create extends React.Component<{}, CreateState> {
  initialState: CreateState = {
    name: "",
    title: "",
    age: undefined
  };

  state = this.initialState;

  resetState = () => this.setState({ ...this.initialState });

  validate = (input: string) => {
    const invalidNumber = Number.isNaN(Number(input));
    if (invalidNumber) return;
    return this.setState({ age: input });
  };

  handleAddBook = (doAddBook: MutationFn<addBookdata>) => {
    const user = getNavParams(this.props, "user");
    const { age, name, title } = this.state;
    const { navigate } = this.props.navigation;

    if (!age || !name || !title) {
      console.log("not all book fields filled");
      return this.setState({
        error: Error("Null input: Please fill in all fields")
      });
    }

    AsyncStorage.getItem("token").then(token =>
      doAddBook({
        variables: { name, title, token, age: Number(age) }
      })
        .then(() => navigate("List", { user }))
        .catch(e => log(e))
    );
  };

  render() {
    const { navigate } = this.props.navigation;
    const user = getNavParams(this.props, "user");

    return (
      <Layout user={user}>
        <Wrapper>
          <Title>Create a book</Title>
          <Field>
            <Text>Enter book title</Text>
            <TextInput
              value={this.state.title}
              placeholder="title..."
              onChangeText={input => this.setState({ title: input })}
            />
          </Field>
          <Field>
            <Text>Enter author name</Text>
            <TextInput
              value={this.state.name}
              placeholder="name..."
              onChangeText={input => this.setState({ name: input })}
            />
          </Field>
          <Field>
            <Text>How old is the author?</Text>
            <TextInput
              value={this.state.age || ""}
              placeholder="age..."
              onChangeText={text => this.validate(text)}
            />
          </Field>
          <Button onPress={() => this.resetState()}>
            <Text>Reset</Text>
          </Button>
          <Mutation mutation={mutationAddBook}>
            {(addBook, { data, loading }) => (
              <View>
                <Button onPress={() => this.handleAddBook(addBook)}>
                  <Text>OK</Text>
                </Button>
                <Button onPress={() => navigate("List", { user })}>
                  <Text>See books</Text>
                </Button>
                <Feedback>
                  {!data &&
                    this.state.error && (
                      <Text>{formatMessage(this.state.error.message)}</Text>
                    )}
                  {loading && <ActivityIndicator size="large" />}
                </Feedback>
              </View>
            )}
          </Mutation>
        </Wrapper>
      </Layout>
    );
  }
}

export default Create;
