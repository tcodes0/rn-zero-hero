import * as React from "react";
import { AsyncStorage, View, ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import gql from "graphql-tag";
import { Mutation, MutationFn } from "react-apollo";
import { log, getNavParams, formatMessage } from "../utils";
import Layout from "../layouts/DefaultLayout";
import { Button, Wrapper, Book, Text, TextInput, Strong, ErrorText } from "../components";

const Title = styled(Text)`
  background-color: #f5fcff;
  font-size: 23;
  font-weight: 700;
  margin-bottom: 50;
`;

const Field = styled.View`
  margin-bottom: 20px;
`;

const Feedback = styled.View`
  height: 30px;
`;

type addBookData = { data: Book };

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

class Create extends React.Component<{}, CreateState> {
  initialState: Readonly<CreateState> = {
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

  handleAddBook = (doAddBook: MutationFn<addBookData>) => {
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
              onChangeText={(input: string) => this.setState({ title: input })}
            />
          </Field>
          <Field>
            <Text>Enter author name</Text>
            <TextInput
              value={this.state.name}
              placeholder="name..."
              onChangeText={(input: string) => this.setState({ name: input })}
            />
          </Field>
          <Field>
            <Text>How old is the author?</Text>
            <TextInput
              value={this.state.age || ""}
              placeholder="age..."
              onChangeText={(text: string) => this.validate(text)}
            />
          </Field>
          <Button onPress={() => this.resetState()}>
            <Strong>Reset</Strong>
          </Button>
          <Mutation mutation={mutationAddBook}>
            {(addBook, { data, loading }) => (
              <View>
                <Button onPress={() => this.handleAddBook(addBook)}>
                  <Strong>OK</Strong>
                </Button>
                <Button onPress={() => navigate("List", { user })}>
                  <Strong>See books</Strong>
                </Button>
                <Feedback>
                  {!data &&
                    this.state.error && (
                      <ErrorText>{formatMessage(this.state.error.message)}</ErrorText>
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
