import * as React from "react";
import { AsyncStorage, ActivityIndicator } from "react-native";
import gql from "graphql-tag";
import styled from "styled-components/native";
import { ApolloConsumer, OperationVariables } from "react-apollo";
import { ApolloQueryResult, ApolloClient, QueryOptions } from "apollo-client";
import {
  getNumericId,
  getNavParams,
  lowerCase,
  NavigatableProps
} from "../utils";
import { Layout } from "../layouts";
import { BookFlatList, Book, Filter } from "../components";

const Wrapper = styled.View`
  margin-top: 20px;
  flex: 1;
  padding: 20px;
  width: 100%;
`;

const View = styled.View`
  flex: 1;
`;

const FilterView = styled.View`
  margin: 10px 15px 0px 15px;
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

class List extends React.Component<NavigatableProps, ListState> {
  state: Readonly<ListState> = { filtered: [], books: [] };

  queryObject: QueryOptions<OperationVariables> = {};

  showAll = () => this.setState(({ books }) => ({ filtered: books }));

  filterByTitle = (sections: any[], query: string) =>
    sections.filter(section => {
      const title = lowerCase(section.title);
      return title.includes(query);
    });

  handleChangeText = (text: string) => {
    if (!text) {
      return this.showAll();
    }
    return this.setState(({ books }) => ({
      filtered: this.filterByTitle(books, lowerCase(text))
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

  getBooks = (query: ApolloClient<any>["query"], skip?: number) =>
    AsyncStorage.getItem("token")
      .then(token => {
        this.queryObject = {
          query: booksWithAuthors,
          variables: { token, skip }
        };
        console.log("query object", this.queryObject);

        return query<ListData>(this.queryObject).then(packedData => {
          const data = this.unpack(packedData);
          console.log("data", data);

          if (skip) {
            console.log("skip exists");
            // this is pagination
            return this.setState(
              state => ({
                books: [...state.books, ...data]
              }),
              () => console.log(this.state)
            );
          }

          return this.setState({
            // initial fetch
            books: data,
            filtered: data
          });
        });
      })
      .catch(e => {
        e && console.log("e");
      });

  handleEndReached = (
    { distanceFromEnd }: { distanceFromEnd: number },
    // query: ApolloClient<any>["query"],
    client
  ) => {
    if (distanceFromEnd < 0) {
      return;
    }
    console.log("query in cache", client.readQuery(this.queryObject));
    return this.getBooks(client.query, this.state.books.length);
  };

  render() {
    const user = getNavParams(this.props, "user");
    const { navigate } = this.props.navigation;
    const { books, filtered } = this.state;

    return (
      <Layout user={user}>
        <Wrapper>
          <ApolloConsumer>
            {client => {
              if (!books.length) {
                this.getBooks(client.query);
                return <ActivityIndicator size="large" />;
              }
              return (
                <View>
                  <FilterView>
                    <Filter onChangeText={this.handleChangeText} />
                  </FilterView>
                  <BookFlatList<Book>
                    data={filtered}
                    navigate={navigate}
                    user={user}
                    onEndReached={e => this.handleEndReached(e, client)}
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
