import * as React from "react";
import { createStackNavigator } from "react-navigation";
import { Provider as ReduxProvider } from "react-redux";
import { ApolloProvider } from "react-apollo";
import client from "./client";
import store from "./store";
import { Create, Detail, Login, Register, List } from "./pages";

export const env = "development";

const NavigationWrapper = createStackNavigator(
  {
    Create: { screen: Create },
    Detail: { screen: Detail },
    List: { screen: List },
    Login: { screen: Login },
    Register: { screen: Register }
  },
  { initialRouteName: "Register" }
);

const App = () => (
  <ApolloProvider client={client}>
    <ReduxProvider store={store}>
      <NavigationWrapper />
    </ReduxProvider>
  </ApolloProvider>
);

export default App;
