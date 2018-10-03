import * as React from "react";
import { Text, AsyncStorage } from "react-native";
import { ApolloConsumer } from "react-apollo";
import styled from "styled-components/native";
import { State } from "react-powerplug";
import Layout from "../layouts/DefaultLayout";
import { addUser } from "../mutations";
import { formatMessage, getNavParams, log } from "../utils";
import { Wrapper } from "../components";
import { LoginContainer, InputContainer, Title, Input, Button } from "./Login";

const MessageContainer = styled.View`
  height: 30;
`;

const initialState: {
  name: string;
  password: string;
  error?: Error;
} = {
  name: "",
  password: ""
};

const Detail = (props: any) => {
  const { navigate } = props.navigation;
  const user = getNavParams(props, "user");

  return (
    <Layout user={user}>
      <Wrapper>
        <Title>Please create your account :D</Title>
        <State initial={initialState}>
          {({ state, setState }) => (
            <ApolloConsumer>
              {({ mutate }) => (
                <LoginContainer>
                  <InputContainer>
                    <Input
                      placeholder="Your name..."
                      value={state.name}
                      onChangeText={name => setState({ name })}
                    />
                    <Input
                      placeholder="Password..."
                      secureTextEntry
                      value={state.password}
                      onChangeText={password => setState({ password })}
                    />
                    <Button
                      onPress={() =>
                        mutate<{ token: string }>({
                          mutation: addUser,
                          variables: {
                            name: state.name,
                            password: state.password
                          }
                        })
                          .then(({ data: { addUser: { token } } }) => {
                            AsyncStorage.setItem("token", token).catch(
                              e => e && log(e)
                            );
                            navigate("Create", { user: state.name });
                          })
                          .catch(error => setState({ error }))
                      }
                    >
                      <Text>Register</Text>
                    </Button>
                  </InputContainer>
                  <MessageContainer>
                    {state.error && (
                      <Text>{formatMessage(state.error.message)}</Text>
                    )}
                  </MessageContainer>
                </LoginContainer>
              )}
            </ApolloConsumer>
          )}
        </State>
      </Wrapper>
    </Layout>
  );
};

export default Detail;
