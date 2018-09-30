import * as React from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";

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

const getItem = (props: any) =>
  props && props.navigation && props.navigation.state
    ? props.navigation.state.params
    : {};

const Detail = props => {
  const item = getItem(props);
  const { navigate } = props.navigation;

  return (
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
      <Button
        title="Back"
        onPress={() => navigate("List")}
      >
        Auth
      </Button>
    </View>
  );
};

export default Detail;
