// import { StyleSheet } from "react-native";
import * as React from "react";
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

/**
 * Wrapper around createStore to mock store for testing.
 * Call with no params to get an empty store.
 * @param preloadedState Object to use as store.
 */
export const createHydratedStore = (preloadedState?: any) =>
  createStore(rootReducer, preloadedState, applyMiddleware(thunkMiddleware, customLogger));

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
