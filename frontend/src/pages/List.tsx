import * as React from "react";
import { SectionList, Text, StyleSheet, View } from "react-native";
import { State } from "react-powerplug";
import { Query } from "react-apollo";
import ButtonInput from "../components/ButtonInput";
import { log } from "../utils";
import { GET_BOOKS_WITH_AUTHORS } from "../queries";

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

const extractKey = ({ id }: number): string => id;

const renderItem = ({ item }) => <Text style={styles.row}>{item.text}</Text>;

const renderSectionHeader = ({ section }) => (
  <Text style={styles.header}>{section.title}</Text>
);

const byTitle = (section, string) => section.title.includes(string);
const filterFactory = selector => (sections, query) =>
  sections.filter(section => selector(section, query));

const filterSectionsByTitle = filterFactory(byTitle);

const List = props => {
  const sections = props.navigation.state.params || [];
  console.log(sections);

  return (
    <State initial={{ sections, filter: "" }}>
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
          <Query query={GET_BOOKS_WITH_AUTHORS}>
            {({ loading, error, data }) => {
              if (loading) return <Text>Loading...</Text>;
              if (error) return <Text>{`Error! ${error.message}`}</Text>;
              console.log(data);
              // setState({sections: data})

              return (
                <SectionList
                  style={styles.container}
                  sections={state.sections || []}
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
  );
};

export default List;
