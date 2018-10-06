import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

const addressMap = {
  production: "https://nicelooking.client.domain.com",
  development: "http://localhost:4000/graphql"
};

const connectToDevTools = true

const uri = addressMap.development;

const link = new HttpLink({ uri });

const cache = new InMemoryCache();

const client = new ApolloClient({ cache, link, connectToDevTools });

export default client;
