import * as React from "react";
import { AsyncStorage, ActivityIndicator } from "react-native";
import gql from "graphql-tag";
import styled from "styled-components/native";
import { ApolloConsumer } from "react-apollo";
import { ApolloQueryResult, ApolloClient } from "apollo-client";
import { log, getNumericId, getNavParams } from "../utils";
import { Layout } from "../layouts";
import { BookFlatList, Book, Filter } from "../components";

const Wrapper = styled.View`
  margin-top: 20px;
  flex: 1;
  padding: 20px;
`;

const View = styled.View`
  flex: 1;
`;

const booksWithAuthors = gql`
  query($token: String!) {
    books(token: $token) {
      title
      author {
        name
        age
      }
    }
  }
`;

type ListData = { books: Book[] };
type ListState = {
  books: any[];
  filtered: any[];
};

class List extends React.Component<{}, ListState> {
  state: Readonly<ListState> = { filtered: [], books: [] };

  showAll = () => this.setState(({ books }) => ({ filtered: books }));

  filterByTitle = (sections: any[], query: string) =>
    sections.filter(section => section.title.includes(query));

  handleChangeText = (text: string) => {
    if (!text) {
      return this.showAll();
    }
    return this.setState(({ books }) => ({
      filtered: this.filterByTitle(books, text)
    }));
  };

  unpack = (ApolloRes: ApolloQueryResult<ListData>) => {
    const { books } = ApolloRes.data;
    const booksWithId = books.map(book => ({
      ...book,
      id: getNumericId()
    }));
    return booksWithId.reverse();
  };

  getBooks = (query: ApolloClient<any>["query"]) => {
    AsyncStorage.getItem("token")
      .then(token =>
        query<ListData>({
          query: booksWithAuthors,
          variables: { token }
        }).then(packedData => {
          const data = this.unpack(packedData);
          console.log("got data:", data);
          this.setState({
            books: data,
            filtered: data
          });
        })
      )
      .catch(e => {
        e && log(e);
      });
  };

  render() {
    const user = getNavParams(this.props, "user");
    const { navigate } = this.props.navigation;
    const { books, filtered } = this.state;

    return (
      <Layout user={user}>
        <Wrapper>
          <ApolloConsumer>
            {({ query }) => {
              if (!books.length) {
                this.getBooks(query);
                return <ActivityIndicator size="large" />;
              }
              return (
                <View>
                  <Filter onChangeText={this.handleChangeText} />
                  <BookFlatList<Book>
                    data={filtered}
                    navigate={navigate}
                    user={user}
                  />
                </View>
              );
            }}
          </ApolloConsumer>
        </Wrapper>
      </Layout>
    );
  }
}

export default List;
