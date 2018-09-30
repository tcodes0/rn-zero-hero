import * as React from "react";
import { SectionList, Text, StyleSheet, View } from "react-native";
import { State } from "react-powerplug";
import { Query } from "react-apollo";
import ButtonInput from "../components/ButtonInput";
import { log, getNumericId } from "../utils";
import { booksWithAuthors } from "../queries";
import Layout from "../layouts/DefaultLayout";

// const sections = [
//   {
//     id: 0,
//     title: "Basic Components",
//     data: [
//       { id: 0, text: "View" },
//       { id: 1, text: "Text" },
//       { id: 2, text: "Image" }
//     ]
//   }
// ];

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

const filterFactory = selector => (sections, query) =>
  sections.filter(section => selector(section, query));

const byTitle = (section, string) => section.title.includes(string);

const filterSectionsByTitle = filterFactory(byTitle);

const unpack = gqlData => {
  const [title] = Object.keys(gqlData);
  const data = gqlData[title].map(obj => ({ ...obj, id: getNumericId() }));
  const result = { id: getNumericId(), title, data };
  return [result];
};

const List = props => {
  const { navigate } = props.navigation;
  const extractKey = ({ id }: number): string => id;
  const renderItem = ({ item }) => (
    <Text onPress={() => navigate("Detail", item)} style={styles.row}>
      {`"${item.title}"\nby ${item.author.name}`}
    </Text>
  );
  const renderSectionHeader = ({ section }) => (
    <Text style={styles.header}>{section.title}</Text>
  );

  return (
    <Layout>
      <State initial={{ sections: [], filter: "" }}>
        {({ state, setState }) => (
          <View style={styles.container}>
            <ButtonInput
              onPress={log}
              placeholder="filter by typing..."
              title="Go"
              onChangeText={(text: string) => {
                if (!text) return setState({ sections });
                setState(({ sections }) => ({
                  sections: filterSectionsByTitle(sections, text)
                }));
              }}
            />
            <Query query={booksWithAuthors}>
              {({ loading, error, data }) => {
                if (loading) return <Text>Loading...</Text>;
                if (error) return <Text>{`Error! ${error.message}`}</Text>;

                return (
                  <SectionList
                    style={styles.container}
                    sections={unpack(data) || []}
                    renderItem={renderItem}
                    renderSectionHeader={renderSectionHeader}
                    keyExtractor={extractKey}
                  />
                );
              }}
            </Query>
          </View>
        )}
      </State>
    </Layout>
  );
};

export default List;
