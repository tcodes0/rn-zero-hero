import * as React from "react";
import {
  FlatList,
  Text,
  StyleSheet,
  View,
  AsyncStorage,
  FlatListProps
} from "react-native";
import { State } from "react-powerplug";
import gql from "graphql-tag";
import styled from "styled-components/native";
import { ApolloConsumer } from "react-apollo";
import { log, getNumericId, getNavParams, filterFactory } from "../utils";
import Layout from "../layouts/DefaultLayout";
import { Touchable } from "../components";

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    padding: 20
  }
});

const Item = styled(Touchable)`
  align-items: flex-start;
  margin-bottom: 5px;
  background-color: ${props => props.theme.colors.secondary};
`;

const BookTitle = styled.Text`
  font-size: 18px;
  margin-bottom: 8px;
`;

const Filter = styled.TextInput`
  font-size: 17px;
  margin-bottom: 10px;
  text-align: left;
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

interface Author {
  name: string;
  age: number;
}
interface Book {
  id: number;
  author: Author;
  title: string;
}

class BookList<B extends Book> extends React.Component<FlatListProps<B>> {
  extractKey = (book: B) => String(book.id);

  renderItem = ({ item: book }: { item: B }) => {
    const { navigate, user } = this.props;

    return (
      <Item
        onPress={() => navigate("Detail", { book, user })}
        activeOpacity={0.4}
      >
        <BookTitle>{`"${book.title}"`}</BookTitle>
        <Text>{`by ${book.author && book.author.name}`}</Text>
      </Item>
    );
  };

  render() {
    return (
      <FlatList
        style={styles.container}
        renderItem={this.renderItem}
        keyExtractor={this.extractKey}
        {...this.props}
      />
    );
  }
}

const List = (props: any) => {
  const user = getNavParams(props, "user");
  const { navigate } = props.navigation;

  const byTitle = (section: any, text: string) => section.title.includes(text);
  const filterSectionsByTitle = filterFactory(byTitle);

  const unpack = (gqlData: any) => {
    const { books } = gqlData.data;
    const booksWithId = books.map((book: Book) => ({
      ...book,
      id: getNumericId()
    }));
    return booksWithId;
  };

  return (
    <Layout user={user}>
      <State
        initial={{
          sections: [],
          filter: "",
          unfilteredSections: undefined,
          text: ""
        }}
      >
        {({ state, setState }) => (
          <View style={styles.container}>
            <Filter
              value={state.text}
              placeholder="filter by typing..."
              onChangeText={(text: string) => {
                setState({ text });
                if (!text) {
                  return setState(({ unfilteredSections }) => ({
                    sections: unfilteredSections
                  }));
                }
                return setState(({ unfilteredSections }) => ({
                  sections: filterSectionsByTitle(unfilteredSections, text)
                }));
              }}
            />
            <ApolloConsumer>
              {({ query }) => {
                if (!state.unfilteredSections) {
                  AsyncStorage.getItem("token").then(token =>
                    query({
                      query: booksWithAuthors,
                      variables: { token }
                    })
                      .then(data => {
                        const unpackedData = [...unpack(data)].reverse();
                        console.log("unpackedData", unpackedData);
                        setState({
                          unfilteredSections: unpackedData,
                          sections: unpackedData
                        });
                      })
                      .catch(e => {
                        e && log(e);
                      })
                  );
                }
                if (!state.sections) return <Text> Loading </Text>;
                return (
                  <BookList<Book>
                    data={state.sections}
                    navigate={navigate}
                    user={user}
                  />
                );
              }}
            </ApolloConsumer>
          </View>
        )}
      </State>
    </Layout>
  );
};

export default List;
