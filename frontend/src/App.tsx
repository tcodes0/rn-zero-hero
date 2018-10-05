import * as React from "react";
import { createStackNavigator } from "react-navigation";
import { ThemeProvider } from "styled-components";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { Create, Detail, Login, Register, List } from "./pages";

export const env = "development";

// @ts-ignore
export const client = env == "production"
    ? new ApolloClient({ uri: "https://nicelooking.client.domain.com" })
    : new ApolloClient({ uri: "http://localhost:4000/graphql" });

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

const theme = { colors: { main: "pink", secondary: "#ba9eff" } };

const App = () => (
  <ThemeProvider theme={theme}>
    <ApolloProvider client={client}>
      <NavigationWrapper />
    </ApolloProvider>
  </ThemeProvider>
);

export default App;
