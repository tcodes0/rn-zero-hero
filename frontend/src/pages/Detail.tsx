import * as React from "react";
import styled from "styled-components/native";
import Layout from "../layouts/DefaultLayout";
import { getNavParams } from "../utils";
import { Button, Sans, Heading } from "../components";

const Title = styled(Heading)`
  font-size: 35px;
  margin-bottom: 60px;
  text-align: center;
  text-transform: capitalize;
`;

const Cover = styled.Image`
  width: 220px;
  height: 220px;
  border-radius: 10px;
  margin: 25px;
  margin-bottom: 60px;
  border-color: ${props => props.theme.colors.black};
  border-style: solid;
`;

const Wrapper = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  padding: 25px;
`;

const Description = styled(Sans)`
  color: ${props => props.theme.colors.black};
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
          <Sans>Back</Sans>
        </Button>
      </Wrapper>
    </Layout>
  );
};

export default Detail;
