import * as React from "react";
import { Text, AsyncStorage, ActivityIndicator } from "react-native";
import gql from "graphql-tag";
import styled from "styled-components/native";
import Layout from "../layouts/DefaultLayout";
import { Mutation, MutationFn } from "react-apollo";
import { formatMessage, getNavParams } from "../utils";
import { Wrapper, Button } from "../components";
import { LoginContainer, InputContainer, Title, Input } from "./Login";

const Feedback = styled.View`
  height: 30;
`;

type addUserData = { data: { addUser: { token: string } } };

const mutationAddUser = gql`
  mutation($name: String!, $password: String!) {
    addUser(name: $name, password: $password) {
      token
    }
  }
`;

type RegisterState = {
  name: string;
  password: string;
  error?: Error;
};

class Register extends React.Component<{}, RegisterState> {
  state: Readonly<RegisterState> = {
    name: "",
    password: ""
  };

  handleRegister = (addUser: MutationFn<addUserData>) => {
    const { navigate } = this.props.navigation;
    const { name, password } = this.state;

    if (!name || !password) {
      console.log("no user or password");
      return this.setState({
        error: Error("Null input: Please fill in all fields")
      });
    }

    addUser({
      variables: {
        name: this.state.name,
        password: this.state.password
      }
    })
      .then(({ data: { addUser: { token } } }) => {
        navigate("Create", { user: this.state.name });
        return AsyncStorage.setItem("token", token);
      })
      .catch(error => this.setState({ error }));
  };

  render() {
    const user = getNavParams(this.props, "user");

    return (
      <Layout user={user}>
        <Wrapper>
          <Title>Good you're joining us!</Title>
          <Mutation mutation={mutationAddUser}>
            {(addUser, { data, loading }) => (
              <LoginContainer>
                <InputContainer>
                  <Input
                    placeholder="Your name..."
                    value={this.state.name}
                    onChangeText={name => this.setState({ name })}
                  />
                  <Input
                    placeholder="Password..."
                    secureTextEntry
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })}
                  />
                  <Button onPress={() => this.handleRegister(addUser)}>
                    <Text>Ok</Text>
                  </Button>
                </InputContainer>
                <Feedback>
                  {!data &&
                    this.state.error && (
                      <Text>{formatMessage(this.state.error.message)}</Text>
                    )}
                  {loading && <ActivityIndicator size="large" />}
                </Feedback>
              </LoginContainer>
            )}
          </Mutation>
        </Wrapper>
      </Layout>
    );
  }
}

export default Register;
