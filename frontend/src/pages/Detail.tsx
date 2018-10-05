import * as React from "react";
import styled from "styled-components/native";
import Layout from "../layouts/DefaultLayout";
import { getNavParams } from "../utils";
import { Button, Text, Strong } from "../components";

const Title = styled(Strong)`
  font-family: "Crimson Text";
  font-style: italic;
  font-size: 35px;
  margin-top: 25px;
  margin-bottom: 25px;
  text-align: center;
  text-transform: capitalize;
`;

const Cover = styled.Image`
  width: 220px;
  height: 220px;
  margin: 25px;
  border-color: ${props => props.theme.colors.text};
  border-style: solid;
  border-width: 2px;
`;

const Wrapper = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  padding: 25px;
`;

const Description = styled(Text)`
  font-size: 17px;
  margin-top: 25px;
  margin-bottom: 25px;
  text-align: left;
`;

const Detail = (props: any) => {
  const { navigate } = props.navigation;
  const params = getNavParams(props);
  if (!params) {
    return null;
  }
  const { user, book } = params;

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
          <Strong>Back</Strong>
        </Button>
      </Wrapper>
    </Layout>
  );
};

export default Detail;
