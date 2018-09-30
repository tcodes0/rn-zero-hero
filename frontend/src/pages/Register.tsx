import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import ButtonInput from "../components/ButtonInput";
import { log } from "../utils";
import Layout from "../layouts/DefaultLayout";
import { ApolloConsumer } from "react-apollo";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  title: {
    marginBottom: 30,
    fontSize: 18
  }
});

const Detail = props => {
  const param = props.navigation.getParam("text", "null");

  return (
    <Layout>
      <View style={styles.container} {...props}>
        <Text style={styles.title}>Please type your name to register</Text>
        <ApolloConsumer>
          {client => (
            <ButtonInput
              title="register"
              placeholder="Your name..."
              onPress={(text: string) => log(`send request with ${text}`)}
            />
          )}
        </ApolloConsumer>
      </View>
    </Layout>
  );
};

export default Detail;
