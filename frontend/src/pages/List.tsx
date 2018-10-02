import * as React from "react";
import {
  SectionList,
  Text,
  StyleSheet,
  View,
  AsyncStorage
} from "react-native";
import { State } from "react-powerplug";
import { Query, ApolloConsumer } from "react-apollo";
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
  // console.log(sections, query);
  return sections.filter(section => selector(section, query));
};

const byTitle = (section, string) => section.title.includes(string);

const filterSectionsByTitle = filterFactory(byTitle);

const unpack = gqlData => {
  const { books } = gqlData.data;
  const booksWithId = books.map(book => ({ ...book, id: getNumericId() }));
  const result = { id: getNumericId(), title: "books", data: booksWithId };
  return [result];
};

const List = props => {
  const { navigate } = props.navigation;
  const user = getNavParams(props, "user");
  const extractKey = ({ id }: number): string => id;
  const renderItem = ({ item }) => (
    <Text onPress={() => navigate("Detail", { item, user })} style={styles.row}>
      {`"${item.title}"\nby ${item.author && item.author.name}`}
    </Text>
  );
  const renderSectionHeader = ({ section }) => (
    <Text style={styles.header}>{section.title}</Text>
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
                  const { data } = unfilteredSections[0];
                  console.log(filterSectionsByTitle(data, text));
                  return {
                    sections: filterSectionsByTitle(data, text)
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
                  <SectionList
                    style={styles.container}
                    sections={state.sections}
                    renderItem={renderItem}
                    renderSectionHeader={renderSectionHeader}
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
