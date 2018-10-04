import * as React from "react";
import {
  FlatList,
  Text,
  StyleSheet,
  FlatListProps
} from "react-native";
import styled from "styled-components/native";
import { Button } from ".";

const Book = styled(Button)`
  align-items: flex-start;
  margin-bottom: 5px;
  background-color: ${props => props.theme.colors.secondary};
`;

const BookTitle = styled.Text`
  font-size: 18px;
  margin-bottom: 8px;
`;

export type Author = {
  name: string;
  age: number;
};
export type Book = {
  id: number;
  author: Author;
  title: string;
};
export type Navigate = (...args: any[]) => void
export type BookFlatListProps<T> = { user: string; navigate: Navigate } & Partial<FlatListProps<T>>;

class BookFlatList<B extends Book> extends React.Component<BookFlatListProps<B>> {
  bookStyle = StyleSheet.create({
    book: {
      marginTop: 20,
      flex: 1,
      padding: 20
    }
  });

  extractKey = (book: B) => String(book.id);

  renderItem = ({ item: book }: { item: B }) => {
    const { navigate, user } = this.props;

    return (
      <Book onPress={() => navigate("Detail", { book, user })}>
        <BookTitle>{`"${book.title}"`}</BookTitle>
        <Text>{`by ${book.author && book.author.name}`}</Text>
      </Book>
    );
  };

  render() {
    return (
      <FlatList
        style={this.bookStyle.book}
        renderItem={this.renderItem}
        keyExtractor={this.extractKey}
        {...this.props}
      />
    );
  }
}

export default BookFlatList;
