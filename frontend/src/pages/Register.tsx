import * as React from "react";
import { AsyncStorage, ActivityIndicator } from "react-native";
import gql from "graphql-tag";
import styled from "styled-components/native";
import { Mutation, MutationFn } from "react-apollo";
import Layout from "../layouts/DefaultLayout";
import { formatMessage, getNavParams, NavigatableProps } from "../utils";
import { Wrapper, Button, Sans, ErrorText } from "../components";
import { LoginContainer, Title, Input, Buttons } from "./Login";

const Feedback = styled.View`
  height: 30;
  align-items: center;
`;

const Inputs = styled.View`
  align-items: center;
`;

const InputContainer = styled.View`
  flex: 1;
  justify-content: space-evenly;
  max-height: 70%;
`;

type addUserData = { data: { addUser: { token: string } } };

const mutationAddUser = gql`
  mutation($name: String!, $password: String!, $noAuth: Boolean) {
    addUser(name: $name, password: $password, noAuth: $noAuth) {
      token
    }
  }
`;

type RegisterState = {
  name: string;
  password: string;
  error?: Error;
};

class Register extends React.Component<NavigatableProps, RegisterState> {
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
        password: this.state.password,
        noAuth: true
      }
    })
      // @ts-ignore
      .then(({ data, errors }) => {
        console.log("data and errors ->,", data, errors);
        if (errors) {
          const [error] = errors;
          return this.setState({ error });
        }
        navigate("Create", { user: this.state.name });
        return AsyncStorage.setItem("token", data.addUser.token);
      })
      .catch(error => this.setState({ error }));
  };

  render() {
    const user = getNavParams(this.props, "user");

    return (
      <Layout user={user}>
        <Wrapper>
          <Title>Welcome to the club</Title>
          <Mutation mutation={mutationAddUser}>
            {(addUser, { data, loading }) => (
              <LoginContainer>
                <InputContainer>
                  <Inputs>
                    <Input
                      placeholder="Your name..."
                      value={this.state.name}
                      onChangeText={(name: string) => this.setState({ name })}
                    />
                    <Input
                      placeholder="Password..."
                      secureTextEntry
                      value={this.state.password}
                      onChangeText={(password: string) =>
                        this.setState({ password })
                      }
                    />
                  </Inputs>
                  <Feedback>
                    {!data &&
                      this.state.error && (
                        <ErrorText>
                          {formatMessage(this.state.error.message)}
                        </ErrorText>
                      )}
                    {loading && <ActivityIndicator size="large" />}
                  </Feedback>
                  <Buttons>
                    <Button onPress={() => this.handleRegister(addUser)}>
                      <Sans>Ok</Sans>
                    </Button>
                  </Buttons>
                </InputContainer>
              </LoginContainer>
            )}
          </Mutation>
        </Wrapper>
      </Layout>
    );
  }
}

export default Register;
