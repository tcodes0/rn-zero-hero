import * as React from "react";
import { ActivityIndicator } from "react-native";
import gql from "graphql-tag";
import styled from "styled-components/native";
import { ApolloConsumer } from "react-apollo";
import { ApolloQueryResult, ApolloClient } from "apollo-client";
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

const query = gql`
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
  fetchedAll: boolean;
};

class List extends React.Component<NavigatableProps, ListState> {
  state: Readonly<ListState> = {
    filtered: [],
    books: [],
    fetchedAll: false
  };

  showAll = () => this.setState(({ books }) => ({ filtered: books }));

  filterByTitle = (sections: any[], query: string) =>
    sections.filter(section => {
      const title = lowerCase(section.title);
      return title.includes(query);
    });

  filterBooks = (text: string) => {
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

  fetch = (client: ApolloClient<any>) =>
    client
      .query<ListData>({ query })
      .then(packedData => {
        const data = this.unpack(packedData);
        return this.setState({
          books: data,
          filtered: data
        });
      })
      .catch(e => {
        e && console.log(e);
      });

  pagination = (
    { distanceFromEnd }: { distanceFromEnd: number },
    client: ApolloClient<any>
  ) => {
    const { filtered, books, fetchedAll } = this.state;
    const skip = books.length;
    if (
      distanceFromEnd < 0 || // pagination event is positive
      fetchedAll ||
      String(filtered) !== String(books) // filtering blocks pagination
    ) {
      return;
    }
    return client
      .query<ListData>({
        query,
        variables: { skip },
        fetchPolicy: "network-only"
      })
      .then(packedData => {
        const newBooks = this.unpack(packedData);
        console.log("newBooks", newBooks);
        if (!newBooks.length) {
          return this.setState({ fetchedAll: true });
        }
        return this.setState(state => ({
          books: [...state.books, ...newBooks],
          filtered: [...state.books, ...newBooks]
        }));
      })
      .catch(e => {
        e && console.log(e);
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
            {client => {
              if (!books.length) {
                this.fetch(client);
                return <ActivityIndicator size="large" />;
              }
              return (
                <View>
                  <FilterView>
                    <Filter onChangeText={this.filterBooks} />
                  </FilterView>
                  <BookFlatList<Book>
                    data={filtered}
                    navigate={navigate}
                    user={user}
                    onEndReached={e => this.pagination(e, client)}
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
