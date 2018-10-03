import * as React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import Layout from "../layouts/DefaultLayout";
import Touchable from "../components/Touchable";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    padding: 25
  },
  heading: {
    fontSize: 21,
    color: "darkblue",
    marginTop: 25,
    marginBottom: 25,
    textAlign: "center"
  },
  body: {
    fontSize: 17,
    marginTop: 25,
    marginBottom: 25,
    textAlign: "left"
  }
});

const Detail = props => {
  const { navigate } = props.navigation;
  const { user, item } = props.navigation.state.params;

  return (
    <Layout user={user}>
      <View style={styles.container} {...props}>
        <Text style={styles.heading}>{item.title}</Text>
        <Image
          style={{ width: 220, height: 220, margin: 25 }}
          source={{
            uri: "https://placekitten.com/220/220"
          }}
        />
        <Text style={styles.body}>
          By {item.author.name}, {item.author.age} years old.
        </Text>
        <Touchable onPress={() => navigate("List", { user })}>
          <Text>Back</Text>
        </Touchable>
      </View>
    </Layout>
  );
};

export default Detail;
