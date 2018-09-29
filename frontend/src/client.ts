import ApolloClient from "apollo-boost";
import { env } from "./App";

const client = (env: string) =>
  env == "production"
    ? new ApolloClient({ uri: "https://nicelooking.client.domain.com" })
    : new ApolloClient({ uri: "http://localhost:4000" });

export default client(env);
