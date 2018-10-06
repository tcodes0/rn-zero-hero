import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";
import { AsyncStorage } from "react-native";

const addressMap = {
  production: "https://nicelooking.client.domain.com",
  development: "http://localhost:4000/graphql"
};

const connectToDevTools = true;
const uri = addressMap.development;
const cache = new InMemoryCache();

const authLink = setContext(async (_, { headers }) => {
  let token;

  try {
    token = await AsyncStorage.getItem("token");
  } catch (e) {
    console.log("client setup token error:", e);
  }

  return { headers: { ...headers, token } };
});

const defaultOptions = {
  watchQuery: {
    fetchPolicy: "cache-and-network",
    errorPolicy: "ignore"
  },
  query: {
    fetchPolicy: "network-only",
    errorPolicy: "all"
  },
  mutate: {
    errorPolicy: "all"
  }
};

const link = authLink.concat(new HttpLink({ uri }));
//@ts-ignore
const client = new ApolloClient({
  cache,
  link,
  connectToDevTools,
  defaultOptions
});

export default client;
