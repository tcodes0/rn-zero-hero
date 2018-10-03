import * as React from "react";
import { createStackNavigator } from "react-navigation";
import { ApolloProvider } from "react-apollo";
import client from "./client";
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
  { initialRouteName: "List" }
);

const App = () => (
  <ApolloProvider client={client}>
    <NavigationWrapper />
  </ApolloProvider>
);

export default App;
