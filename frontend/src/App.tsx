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
  { initialRouteName: "Login" }
);

const theme = {
  colors: {
    main: "rgba(215, 122, 108, 1)",
    faded: "rgba(181, 76, 60, 0.4)",
    faded2: "rgba(181, 76, 60, 0.2)",
    text: "rgba(33, 0, 0, 1)",
    textFaded: "rgba(33, 0, 0, 0.3)",
    white: "white",
    black: "black"
  },
  border: {
    radius: 22
  },
  gray: [
    "rgba(245,245,245,1)", "rgba(230,230,230,1)"
  ],
  primary: [
    "rgba( 41, 82,109,1)",
    "rgba( 74,145,191,1)",
    "rgba( 54,108,143,1)",
    "rgba( 27, 56, 75,1)",
    "rgba( 14, 31, 41,1)"
  ],
  secondary: [
    "rgba(228, 80,144,1)",
    "rgba(144, 48, 90,1)",
    "rgba(190, 64,119,1)",
    "rgba( 99, 32, 61,1)",
    "rgba( 55, 17, 33,1)"
  ],
  tertiary: [
    "rgba(170,162, 57,1)",
    "rgba(255,244, 89,1)",
    "rgba(224,214, 76,1)",
    "rgba(117,112, 38,1)",
    "rgba( 64, 61, 20,1)"
  ],
  complement: [
    "rgba(255,182, 89,1)",
    "rgba(224,159, 76,1)",
    "rgba(170,120, 57,1)",
    "rgba(117, 82, 38,1)",
    "rgba( 64, 45, 20,1)"
  ]
};

const App = () => (
  <ThemeProvider theme={theme}>
    <ApolloProvider client={client}>
      <NavigationWrapper />
    </ApolloProvider>
  </ThemeProvider>
);

export default App;
