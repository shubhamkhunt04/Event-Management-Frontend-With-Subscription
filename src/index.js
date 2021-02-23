import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "antd/dist/antd.css";
// import { ApolloProvider } from "@apollo/client";
// import { client } from "./components/common/apolloClient";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  split,
  HttpLink,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";
const httpLink = new HttpLink({
  uri: "http://localhost:3001/graphql",
});
console.log("auth", localStorage.getItem("auth_token"));
const token = localStorage.getItem("auth_token");
const wsLink = new WebSocketLink({
  uri: "ws://localhost:3001/graphql",
  options: {
    reconnect: true,
    connectionParams: {
      authToken: token,
    },
  },
  // reconnect: true,
  // timeout: 30000,
  // lazy: true,
  // async connectionParams() {
  //   const authorizationToken = localStorage.getItem("auth_token");
  //   return {
  //     authorization: authorizationToken || "abc",
  //   };
  // },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

console.log("splitLink", splitLink);
console.log("token", localStorage.getItem("auth_token"));

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
