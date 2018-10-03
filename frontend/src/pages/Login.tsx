import * as React from "react";
import { Text, View, AsyncStorage } from "react-native";
import styled from "styled-components/native";
import { formatMessage } from "../utils";
import Layout from "../layouts/DefaultLayout";
import { ApolloConsumer } from "react-apollo";
import { State } from "react-powerplug";
import { login } from "../queries";
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

export const Title = styled.Text`
  margin-bottom: 70px;
  font-size: 18;
`;

export const Input = styled.TextInput`
  font-size: 17px;
  margin-bottom: 25px;
  text-align: left;
`;

const initialState: {
  name: string;
  password: string;
  token?: string;
  error?: Error;
} = {
  name: "",
  password: ""
};

const Login = (props: any) => {
  const { navigate } = props.navigation;

  return (
    <Layout>
      <Wrapper>
        <Title>Welcome back</Title>
        <State initial={initialState}>
          {({ state, setState }) => (
            <ApolloConsumer>
              {({ query }) => (
                <LoginContainer>
                  <InputContainer>
                    <Input
                      placeholder="Your name..."
                      value={state.name}
                      onChangeText={(name: string) => setState({ name })}
                    />
                    <Input
                      secureTextEntry
                      placeholder="Password..."
                      value={state.password}
                      onChangeText={(password: string) => setState({ password })}
                    />
                    <Button
                      onPress={() => {
                        const { name, password } = state;
                        if (!name || !password) {
                          console.log("no user or password");
                          return setState({
                            error: Error(
                              "Null input: Please don't leave it blank"
                            )
                          });
                        }

                        return setState({ token: undefined }, () => {
                          query<{ login: { token: string } }>({
                            query: login,
                            variables: { name, password }
                          })
                            .then(({ data: { login: { token } } }) =>
                              AsyncStorage.setItem("token", token).then(() =>
                                navigate("Create", { user: state.name })
                              )
                            )
                            .catch(error => {
                              console.log("err");
                              setState({ error });
                            });
                        });
                      }}
                    >
                      <Text>Login</Text>
                    </Button>
                    <Button onPress={() => navigate("Register")}>
                      <Text>Create account</Text>
                    </Button>
                  </InputContainer>
                  <View style={{ height: 30 }}>
                    {!state.token &&
                      state.error && (
                        <Text>{formatMessage(state.error.message)}</Text>
                      )}
                  </View>
                </LoginContainer>
              )}
            </ApolloConsumer>
          )}
        </State>
      </Wrapper>
    </Layout>
  );
};

export default Login;
