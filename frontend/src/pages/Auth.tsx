import * as React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import ButtonInput from "../components/ButtonInput";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
});

const Auth = props => {
  const { navigate } = props.navigation;

  return (
    <View style={styles.container} {...props}>
      <Text>Type user and password please</Text>
      <ButtonInput onPress={input => console.log(input)} />
      <Button
        style={styles.button}
        title="Create"
        onPress={() => navigate("Create")}
      >
        Create
      </Button>
      <Button
        style={styles.button}
        title="Detail"
        onPress={() => navigate("Detail")}
      >
        Detail
      </Button>
      <Button
        style={styles.button}
        title="List"
        onPress={() => navigate("List")}
      >
        List
      </Button>
    </View>
  );
};

export default Auth;
