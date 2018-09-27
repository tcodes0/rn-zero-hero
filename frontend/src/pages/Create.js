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

const Create = props => {
  const param = props.navigation.getParam("text", "null");

  return (
    <View style={styles.container} {...props}>
      <Text>Create a NEW PRODUCT YOLO</Text>
      <Button
        style={styles.button}
        title="Auth"
        onPress={() => props.navigation.navigate("Auth")}
      >
        Auth
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

export default Create;
