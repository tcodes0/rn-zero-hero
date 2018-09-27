import React from "react";
import { StyleSheet, Text, View } from "react-native";

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
});

const List = props => (
  <View style={style.container} {...props}>
    <Text>Type user and password please</Text>
  </View>
);

export default List;
