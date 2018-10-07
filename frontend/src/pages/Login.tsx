import * as React from "react";
import { AsyncStorage, ActivityIndicator, View } from "react-native";
import styled from "styled-components/native";
import gql from "graphql-tag";
import { Mutation, MutationFn } from "react-apollo";
import { formatMessage, log, NavigatableProps } from "../utils";
import Layout from "../layouts/DefaultLayout";
import {
  Button,
  Wrapper,
  TextInput,
  Sans,
  ErrorText,
  Heading
} from "../components";

export const LoginContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

export const InputContainer = styled.View`
  justify-content: space-between;
  align-items: center;
  height: 65%;
`;

export const Feedback = styled.View`
  height: 30px;
`;

export const Buttons = styled.View`
  margin-top: 30px;
  flex-direction: row;
  justify-content: space-evenly;
  width: 70%;
`;

export const Title = styled(Heading)`
  margin-top: 60px;
  margin-bottom: 20px;
`;

export const Input = styled(TextInput)`
  font-size: 17px;
  margin-bottom: 25px;
  text-align: left;
`;

type loginData = { data: { addUser: { token: string } } };

const loginMutation = gql`
  mutation($name: String!, $password: String!) {
    login(name: $name, password: $password) {
      token
    }
  }
`;

type LoginState = {
  name: string;
  password: string;
  token?: string;
  error?: Error;
};

class Login extends React.Component<NavigatableProps, LoginState> {
  state: Readonly<LoginState> = {
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
        // @ts-ignore
        .then(({ data }) => {
          console.log(data);
          return AsyncStorage.setItem("token", data.login.token).then(() =>
            navigate("Create", { user: this.state.name })
          );
        })
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
                    <View>
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
                    </View>
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
                      <Button onPress={() => this.handleLogin(login)}>
                        <Sans>Login</Sans>
                      </Button>
                      <Button onPress={() => navigate("Register")}>
                        <Sans>Register</Sans>
                      </Button>
                    </Buttons>
                  </InputContainer>
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
