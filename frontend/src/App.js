/**
 * @format
 * @flow
 */

// import { StyleSheet } from "react-native";
import React from "react";
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

// const styles = StyleSheet.create({});

const NavigationWrapper = createStackNavigator(
  {
    Create: { screen: Create },
    Detail: { screen: Detail },
    List: { screen: List },
    Auth: { screen: Auth }
  },
  { initialRouteName: "Auth" }
);

const App = () => (
  <Provider store={store}>
    <NavigationWrapper />
  </Provider>
);

export default App;
