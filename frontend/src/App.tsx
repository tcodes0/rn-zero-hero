import * as React from "react";
import { createStackNavigator } from "react-navigation";
import { ThemeProvider } from "styled-components";
import { ApolloProvider } from "react-apollo";
import { Create, Detail, Login, Register, List } from "./pages";
import client from "./services/graphql";
import theme from "./theme";

const NavigationWrapper = createStackNavigator(
  {
    Create: { screen: Create },
    Detail: { screen: Detail },
    List: { screen: List },
    Login: { screen: Login },
    Register: { screen: Register }
  },
  { initialRouteName: "Login" }
);

const App = () => (
  <ThemeProvider theme={theme}>
    <ApolloProvider client={client}>
      <NavigationWrapper />
    </ApolloProvider>
  </ThemeProvider>
);

export default App;
