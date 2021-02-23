import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  createHttpLink,
  split,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";

const httpLink = createHttpLink({
  uri: "http://localhost:3001/graphql",
});
const authLink = new ApolloLink((operation, forward) => {
  // Retrieve the authorization token from local storage.
  const token = localStorage.getItem("auth_token");
  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      authorization: token ? token : "",
    },
  });

  // Call the next link in the middleware chain.
  return forward(operation);
});

const wsLink = new WebSocketLink({
  uri: "ws://localhost:3001/graphql",
  options: {
    reconnect: true,
    connectionParams: {
      Authorization: localStorage.getItem("auth_token"),
    },
  },
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
  authLink.concat(httpLink)
);

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});
