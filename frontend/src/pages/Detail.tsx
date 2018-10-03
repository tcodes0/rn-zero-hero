import * as React from "react";
import { Text, Image } from "react-native";
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

const Wrapper = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  background-color: #f5fcff;
  padding: 25px;
`;

const Body = styled.Text`
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
        <Image
          style={{ width: 220, height: 220, margin: 25 }}
          source={{
            uri: "https://placekitten.com/220/220"
          }}
        />
        <Body>
          By {book.author.name}, {book.author.age} years old.
        </Body>
        <Button onPress={() => navigate("List", { user })}>
          <Text>Back</Text>
        </Button>
      </Wrapper>
    </Layout>
  );
};

export default Detail;
