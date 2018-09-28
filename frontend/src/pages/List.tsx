import * as React from "react";
import { SectionList, Text, StyleSheet, View } from "react-native";
import { State } from "react-powerplug";
import UserInput from "../components/UserInput";

const sections = [
  {
    id: 0,
    title: "Basic Components",
    data: [
      { id: 0, text: "View" },
      { id: 1, text: "Text" },
      { id: 2, text: "Image" }
    ]
  },
  {
    id: 1,
    title: "List Components",
    data: [{ id: 3, text: "ScrollView" }, { id: 4, text: "ListView" }]
  },
  {
    id: 2,
    title: "Basic Food",
    data: [{ id: 5, text: "Maccaroni" }, { id: 6, text: "Apparitas" }]
  }
];

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

const extractKey = ({ id }: any): number => id;

const renderItem = ({ item }) => <Text style={styles.row}>{item.text}</Text>;

const renderSectionHeader = ({ section }) => (
  <Text style={styles.header}>{section.title}</Text>
);

const log = x => console.log(x);
const byTitle = (section, string) => section.title.includes(string);
const filterFactory = selector => (sections, query) =>
  sections.filter(section => selector(section, query));

const filterSectionsByTitle = filterFactory(byTitle);

const List = props => {
  const { navigate } = props.navigation;

  return (
    <State initial={{ sections, filter: "" }}>
      {({ state, setState }) => (
        <View style={styles.container}>
          <UserInput
            onPress={log}
            placeholder="filter by typing..."
            title="Go"
            onChangeText={(text: string) => {
              if (!text) return setState({ sections });
              return setState(({ sections }) => ({sections: filterSectionsByTitle(sections, text)}))
            }}
          />
          <SectionList
            style={styles.container}
            sections={state.sections || []}
            renderItem={renderItem}
            renderSectionHeader={renderSectionHeader}
            keyExtractor={extractKey}
          />
        </View>
      )}
    </State>
  );
};

export default List;
