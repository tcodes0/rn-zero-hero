import * as React from "react";
import { createStackNavigator } from "react-navigation";
import { ThemeProvider } from "styled-components";
import { ApolloProvider } from "react-apollo";
import { Create, Detail, Login, Register, List } from "./pages";
import client from "./services/graphql";

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

const theme = {
  colors: {
    main: "rgba(215, 122, 108, 1)",
    faded: "rgba(181, 76, 60, 0.4)",
    faded2: "rgba(181, 76, 60, 0.2)",
    text: "rgba(33, 0, 0, 1)",
    textFaded: "rgba(33, 0, 0, 0.3)"
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
