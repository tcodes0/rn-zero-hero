import * as React from "react";
import { Text, AsyncStorage, ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import gql from "graphql-tag";
import { formatMessage, log } from "../utils";
import Layout from "../layouts/DefaultLayout";
import { Mutation, MutationFn } from "react-apollo";
import { Button, Wrapper } from "../components";

export const LoginContainer = styled.View`
  justify-content: center;
  align-items: center;
  background-color: #f5fcff;
`;

export const InputContainer = styled.View`
  padding: 10px;
  max-width: 45%;
`;

export const Feedback = styled.View`
  height: 30px;
`;

export const Title = styled.Text`
  margin-bottom: 70px;
  font-size: 18;
`;

export const Input = styled.TextInput`
  font-size: 17px;
  margin-bottom: 25px;
  text-align: left;
`;

const loginMutation = gql`
  mutation($name: String!, $password: String!) {
    login(name: $name, password: $password) {
      token
    }
  }
`;

type loginData = { data: { addUser: { token: string } } };
type LoginState = {
  name: string;
  password: string;
  token?: string;
  error?: Error;
};

class Login extends React.Component<{}, LoginState> {
  state = {
    name: "",
    password: ""
  };

  handleLogin = (doLogin: MutationFn<loginData>) => {
    const { navigate } = this.props.navigation;
    const { name, password } = this.state;

    if (!name || !password) {
      console.log("no user or password");
      return this.setState({
        error: Error("Null input: Please fill in all fields")
      });
    }

    return this.setState({ token: undefined }, () => {
      doLogin({
        variables: { name, password }
      })
        .then(({ data: { login: { token } } }) =>
          AsyncStorage.setItem("token", token).then(() =>
            navigate("Create", { user: this.state.name })
          )
        )
        .catch((error: Error) => {
          console.log(error);
          this.setState({ error });
        });
    });
  };

  render() {
    const { navigate } = this.props.navigation;
    console.log(this.props);

    return (
      <Layout>
        <Wrapper>
          <Title>Welcome back</Title>
          <Mutation mutation={loginMutation}>
            {(login, { data, loading }) => {
              if (data) log("data", data);
              return (
                <LoginContainer>
                  <InputContainer>
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
                    <Button onPress={() => this.handleLogin(login)}>
                      <Text>Login</Text>
                    </Button>
                    <Button onPress={() => navigate("Register")}>
                      <Text>Register</Text>
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
              );
            }}
          </Mutation>
        </Wrapper>
      </Layout>
    );
  }
}

export default Login;
