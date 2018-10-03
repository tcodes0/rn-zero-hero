import * as React from "react";
import {
  FlatList,
  Text,
  StyleSheet,
  View,
  AsyncStorage,
  TextInput,
  FlatListProps,
  TouchableOpacity
} from "react-native";
import { State } from "react-powerplug";
import { ApolloConsumer } from "react-apollo";
import { log, getNumericId, getNavParams, filterFactory } from "../utils";
import { booksWithAuthors } from "../queries";
import Layout from "../layouts/DefaultLayout";

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    padding: 20
  },
  row: {
    padding: 15,
    marginBottom: 5,
    backgroundColor: "skyblue"
  },
  header: {
    padding: 15,
    marginBottom: 5,
    backgroundColor: "steelblue",
    color: "white",
    fontWeight: "bold"
  },
  input: {
    fontSize: 17,
    marginBottom: 10,
    textAlign: "left"
  }
});

const Filter = props => <TextInput style={styles.input} {...props} />;

class BookList<ItemT> extends React.Component<FlatListProps<ItemT>> {
  extractKey = ({ id }: { id: number }) => String(id);

  renderItem = ({ item }) => {
    const { navigate, user } = this.props;

    return (
      <TouchableOpacity
        onPress={() => navigate("Detail", { item, user })}
        style={styles.row}
        activeOpacity={0.4}
      >
        <Text>{`"${item.title}"`}</Text>
        <Text>{`by ${item.author && item.author.name}`}</Text>
      </TouchableOpacity>
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

const List = props => {
  const user = getNavParams(props, "user");
  const { navigate } = props.navigation;

  const byTitle = (section, string) => section.title.includes(string);
  const filterSectionsByTitle = filterFactory(byTitle);

  const unpack = gqlData => {
    const { books } = gqlData.data;
    const booksWithId = books.map(book => ({ ...book, id: getNumericId() }));
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
                  <BookList
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
