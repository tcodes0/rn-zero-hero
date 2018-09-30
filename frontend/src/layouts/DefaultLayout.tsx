import * as React from "react";
import { Text, View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: 10,
    height: "100%",
    width: "100%",
  },
  header: {
    fontSize: 12,
    marginBottom: 10,
    textAlign: "left",
    width: "100%",
    paddingTop: 5
  }
});

const Layout = props => {
  const { children, user, ...otherProps } = props;

  return (
    <View style={styles.container} {...otherProps}>
      {user && <Text style={styles.header}>Welcome {user}!</Text>}
      {children}
    </View>
  );
};

export default Layout;
