import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import ButtonInput from "../components/ButtonInput";
import { log } from "../utils";
import Layout from "../layouts/DefaultLayout";

const styles = StyleSheet.create({
  title: {
    marginBottom: 70,
    fontSize: 18
  },
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
    <Layout>
      <View style={styles.container}>
        <Text style={styles.title}>Please type your name to login</Text>
        <ButtonInput
          title="login"
          placeholder="Your name..."
          onPress={(text: string) => log(`send request with ${text}`)}
        />
      </View>
    </Layout>
  );
};

export default Detail;
