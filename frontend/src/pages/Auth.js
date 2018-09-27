import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
});

const Auth = props => {
  const param = props.navigation.getParam("text", "null");

  return (
    <View style={styles.container} {...props}>
      <Text>Type user and password please</Text>
      <Text>BTW param is {param}</Text>
      <Button
        style={styles.button}
        title="Create"
        onPress={() => props.navigation.navigate("Create")}
      >
        Create
      </Button>
      <Button
        style={styles.button}
        title="Detail"
        onPress={() => props.navigation.navigate("Detail")}
      >
        Detail
      </Button>
      <Button
        style={styles.button}
        title="List"
        onPress={() => props.navigation.navigate("List")}
      >
        List
      </Button>
    </View>
  );
};

export default Auth;
