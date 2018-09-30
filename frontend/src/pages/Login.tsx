import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import ButtonInput from "../components/ButtonInput";
import { log } from "../utils";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  title: {
    marginBottom: 70,
    fontSize: 18
  }
});

const Detail = props => {
  const param = props.navigation.getParam("text", "null");

  return (
    <View style={styles.container} {...props}>
      <Text style={styles.title}>Please type your name to login</Text>
      <ButtonInput title="login" placeholder="Your name..." onPress={(text: string) => log(`send request with ${text}`)}/>
    </View>
  );
};

export default Detail;
