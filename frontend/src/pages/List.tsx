import * as React from "react";
import { FlatList, Text, StyleSheet, View, AsyncStorage } from "react-native";
import { State } from "react-powerplug";
import { ApolloConsumer } from "react-apollo";
import ButtonInput from "../components/ButtonInput";
import { log, getNumericId, getNavParams } from "../utils";
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
  }
});

const filterFactory = selector => (sections, query) => {
  // console.log("selector args", sections, query);
  return sections.filter(section => selector(section, query));
};

const byTitle = (section, string) => section.title.includes(string);

const filterSectionsByTitle = filterFactory(byTitle);

const unpack = gqlData => {
  const { books } = gqlData.data;
  const booksWithId = books.map(book => ({ ...book, id: getNumericId() }));
  // console.log("result", booksWithId);
  return booksWithId;
};

const List = props => {
  const { navigate } = props.navigation;
  const user = getNavParams(props, "user");
  const extractKey = ({ id }: { id: number }) => String(id);
  const renderItem = ({ item }) => (
    // console.log("item", item);
    <Text onPress={() => navigate("Detail", { item, user })} style={styles.row}>
      {`"${item.title}"\nby ${item.author && item.author.name}`}
    </Text>
  );

  return (
    <Layout user={user}>
      <State
        initial={{ sections: [], filter: "", unfilteredSections: undefined }}
      >
        {({ state, setState }) => (
          <View style={styles.container}>
            <ButtonInput
              placeholder="filter by typing..."
              title="Go"
              onPress={log}
              onChangeText={(text: string) => {
                if (!text)
                  return setState(({ unfilteredSections }) => ({
                    sections: unfilteredSections
                  }));
                setState(({ unfilteredSections }) => {
                  // console.log(filterSectionsByTitle(data, text));
                  return {
                    sections: filterSectionsByTitle(unfilteredSections, text)
                  };
                });
              }}
            />
            <ApolloConsumer>
              {({ query }) => {
                if (!state.unfilteredSections) {
                  AsyncStorage.getItem("token").then(token => {
                    query({ query: booksWithAuthors, variables: { token } })
                      .then(data => {
                        const unpackedData = unpack(data);
                        // console.log("unpacked", unpackedData);
                        setState({
                          unfilteredSections: unpackedData,
                          sections: unpackedData
                        });
                      })
                      .catch(e => {
                        e && log(e);
                      });
                  });
                }
                if (!state.sections) return <Text> Loading </Text>;
                return (
                  <FlatList
                    style={styles.container}
                    data={state.sections}
                    renderItem={renderItem}
                    keyExtractor={extractKey}
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
