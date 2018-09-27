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
  const param = props.navigation.getParam("text", "it's null");

  return (
    <View style={styles.container} {...props}>
      <Text>Type user and password please</Text>
      <Text>BTW param is {param}</Text>
      <Button
        style={styles.button}
        title="Back"
        onPress={() => props.navigation.goBack()}
      >
        go back!
      </Button>
      <Button
        style={styles.button}
        title="Push"
        onPress={() => props.navigation.push("Auth")}
      >
        push Auth
      </Button>
    </View>
  );
};

export default Auth;
