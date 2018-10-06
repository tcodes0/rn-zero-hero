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
  query($skip: Int, $limit: Int) {
    books(skip: $skip, limit: $limit) {
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

  queryObject: QueryOptions<OperationVariables> = {
    query: booksWithAuthors
  };

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
    return booksWithId;
  };

  getBooks = (client: ApolloClient<any>) =>
    client
      .query<ListData>(this.queryObject)
      .then(packedData => {
        const data = this.unpack(packedData);
        console.log("data", data);

        return this.setState({
          books: data,
          filtered: data
        });
      })
      .catch(e => {
        e && console.log(e);
      });

  fetchMore = (client: ApolloClient<any>, skip: number) => {
    this.queryObject = {
      ...this.queryObject,
      variables: { skip },
      fetchPolicy: "network-only"
    };

    return client
      .query<ListData>(this.queryObject)
      .then(packedData => {
        const newBooks = this.unpack(packedData);
        console.log("newBooks", newBooks);

        return this.setState(state => ({
          filtered: [...state.filtered, ...newBooks]
        }));
      })
      .catch(e => {
        e && console.log(e);
      });
  };

  handleEndReached = (
    { distanceFromEnd }: { distanceFromEnd: number },
    client: ApolloClient<any>
  ) => {
    if (distanceFromEnd < 0) {
      return;
    }
    console.log("query in cache", client.readQuery(this.queryObject));
    return this.fetchMore(client, this.state.filtered.length);
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
                this.getBooks(client);
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
