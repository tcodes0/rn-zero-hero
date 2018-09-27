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

const Auth = props => (
  <View style={styles.container} {...props}>
    <Text>Type user and password please</Text>
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

export default Auth;
