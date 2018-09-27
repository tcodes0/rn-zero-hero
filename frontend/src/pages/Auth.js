import React from "react";
import { StyleSheet, Text, View } from "react-native";

const style = StyleSheet.create({
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#F5FCFF"
});

const Auth = props => (
  <View style={style} {...props}>
    <Text>Type user and password please</Text>
  </View>
);

export default Auth;
