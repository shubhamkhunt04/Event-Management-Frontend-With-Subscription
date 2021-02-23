import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  createHttpLink,
} from "@apollo/client";

// Subscription start
// import { getMainDefinition } from "@apollo/client/utilities";
// import { WebSocketLink } from "@apollo/client/link/ws";

// const wsLink = new WebSocketLink({
//   uri: "ws://localhost:5000/graphql",
//   options: {
//     reconnect: true,
//   },
// });
// Subscription end

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

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
