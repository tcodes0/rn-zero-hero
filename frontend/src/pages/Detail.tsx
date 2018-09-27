import * as React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
});

const Detail = props => {
  const param = props.navigation.getParam("text", "null");

  return (
    <View style={styles.container} {...props}>
      <Text>Details of the product kids</Text>
      <Button
        style={styles.button}
        title="Auth"
        onPress={() => props.navigation.navigate("Auth")}
      >
        Auth
      </Button>
      <Button
        style={styles.button}
        title="Create"
        onPress={() => props.navigation.navigate("Create")}
      >
        Create
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

export default Detail;
