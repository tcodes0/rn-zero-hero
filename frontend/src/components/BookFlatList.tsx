import * as React from "react";
import { FlatList, StyleSheet, FlatListProps } from "react-native";
import styled from "styled-components/native";
import { Touchable, Strong } from ".";
import Sans from "./Sans";

// development hack
const random = () => Math.floor(Math.random() * 3)
const color = ["complement", "primary", "secondary"]
const randomColor = (props: any) => {
  const name = color[random()];
  const value = props.theme[name][random()]
  return value
}

const Book = styled(Touchable)`
  border-color: ${props => props.theme.colors.textFaded};
  border-radius: 10px;
  border-style: solid;
  align-items: flex-start;
  margin-bottom: 10px;
  box-shadow: 10px 3px 4px ${props => props.theme.gray[2]};
  background-color: ${props => randomColor(props)};
`;

const Author = styled(Sans)`
  color: ${props => props.theme.colors.black};
  font-style: italic;
`;

const BookTitle = styled(Strong)`
  color: ${props => props.theme.colors.black};
  font-weight: 700;
  font-size: 25px;
  text-transform: capitalize;
  margin-bottom: 13px;
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
export type Navigate = (...args: any[]) => void;
export type BookFlatListProps<T> = {
  user: string;
  navigate: Navigate;
} & Partial<FlatListProps<T>>;

class BookFlatList<B extends Book> extends React.Component<
  BookFlatListProps<B>
> {
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
        <BookTitle>{`${book.title}`}</BookTitle>
        <Author>{`${book.author && book.author.name}`}</Author>
      </Book>
    );
  };

  render() {
    return (
      // @ts-ignore
      <FlatList
        style={this.bookStyle.book}
        renderItem={this.renderItem}
        keyExtractor={this.extractKey}
        onEndReachedThreshold={0.1}
        onEndReached={this.props.onEndReached}
        {...this.props}
      />
    );
  }
}

export default BookFlatList;
