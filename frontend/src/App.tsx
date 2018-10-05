import * as React from "react";
import { createStackNavigator } from "react-navigation";
import { ThemeProvider } from "styled-components";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { Create, Detail, Login, Register, List } from "./pages";

export const env = "development";

export const client =
  // @ts-ignore
  env == "production"
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
  { initialRouteName: "Create" }
);

const theme = {
  colors: {
    main: "rgba(215, 122, 108, 1)",
    faded: "rgba(181, 76, 60, 0.4)",
    faded2: "rgba(181, 76, 60, 0.2)",
    text: "rgba(33, 0, 0, 1)"
  }
};

const App = () => (
  <ThemeProvider theme={theme}>
    <ApolloProvider client={client}>
      <NavigationWrapper />
    </ApolloProvider>
  </ThemeProvider>
);

export default App;
