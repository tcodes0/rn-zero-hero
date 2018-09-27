/* eslint-disable no-unused-vars */
/**
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";

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
  }
});

const App = () => (
  <Provider store={store}>
    <View style={styles.container}>
      <Text style={styles.welcome}>Hello React Native!</Text>
    </View>
  </Provider>
);

export default App;
