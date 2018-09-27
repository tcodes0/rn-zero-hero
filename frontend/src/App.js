/* eslint-disable no-unused-vars */
/**
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Button } from "react-native";
import { createStore, applyMiddleware } from "redux";
import { createStackNavigator } from "react-navigation";
import { Provider } from "react-redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import Auth from "./pages/Auth";
import Create from "./pages/Create";
import Detail from "./pages/Detail";
import List from "./pages/List";

const customLogger = createLogger({ collapsed: true });
const rootReducer = () => {};
const middleware = [thunkMiddleware];
middleware.push(customLogger);

export const createHydratedStore = preloadedState =>
  createStore(rootReducer, preloadedState, applyMiddleware(...middleware));

export const store = createHydratedStore();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  button: {
    padding: 20
  }
});

const Home = props => (
  <Provider store={store}>
    <View style={styles.container}>
      <Text style={styles.welcome}>Hello React Native!</Text>
      <Button
        style={styles.button}
        title="Auth"
        onPress={() => props.navigation.navigate("Auth")}
      >
        Auth
      </Button>
      <Button
        style={styles.button}
        title="Back"
        onPress={() => props.navigation.goBack()}
      >
        go back!
      </Button>
    </View>
  </Provider>
);

const NavigationWrapper = createStackNavigator(
  {
    Home: { screen: Home },
    Auth: { screen: Auth }
  },
  { initialRouteName: "Home" }
);

const App = () => (
  <Provider store={store}>
    <NavigationWrapper />
  </Provider>
);

export default App;
