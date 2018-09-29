import * as React from "react";
import { createStackNavigator } from "react-navigation";
import { Provider as ReduxProvider } from "react-redux";
import { ApolloProvider } from "react-apollo";
import client from "./client";
import store from "./store";
import Auth from "./pages/Auth";
import Create from "./pages/Create";
import Detail from "./pages/Detail";
import List from "./pages/List";

export const env = "development";

const NavigationWrapper = createStackNavigator(
  {
    Create: { screen: Create },
    Detail: { screen: Detail },
    List: { screen: List },
    Auth: { screen: Auth }
  },
  { initialRouteName: "Create" }
);

const App = () => (
  <ApolloProvider client={client}>
    <ReduxProvider store={store}>
      <NavigationWrapper />
    </ReduxProvider>
  </ApolloProvider>
);

export default App;
