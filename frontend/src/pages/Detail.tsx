import * as React from "react";
import { Text } from "react-native";
import styled from "styled-components/native";
import Layout from "../layouts/DefaultLayout";
import { Button } from "../components";

const Title = styled.Text`
  font-size: 21px;
  color: darkblue;
  margin-top: 25px;
  margin-bottom: 25px;
  text-align: center;
`;

const Cover = styled.Image`
  width: 220px;
  height: 220px;
  margin: 25px;
`;

const Wrapper = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  background-color: #f5fcff;
  padding: 25px;
`;

const Description = styled.Text`
  font-size: 17px;
  margin-top: 25px;
  margin-bottom: 25px;
  text-align: left;
`;

const Detail = (props: any) => {
  const { navigate } = props.navigation;
  const { user, book } = props.navigation.state.params;

  return (
    <Layout user={user}>
      <Wrapper>
        <Title>{book.title}</Title>
        <Cover
          source={{
            uri: "https://placekitten.com/220/220"
          }}
        />
        <Description>
          By {book.author.name}, {book.author.age} years old.
        </Description>
        <Button onPress={() => navigate("List", { user })}>
          <Text>Back</Text>
        </Button>
      </Wrapper>
    </Layout>
  );
};

export default Detail;
