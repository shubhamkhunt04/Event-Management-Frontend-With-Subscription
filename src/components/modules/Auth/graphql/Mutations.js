import { gql } from "@apollo/client";

export const SIGNUP_MUTATION = gql`
  mutation register($username: String!, $email: String!, $password: String!) {
    register(
      input: { username: $username, email: $email, password: $password }
    ) {
      id
      username
      email
      token
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      id
      username
      email
      token
    }
  }
`;
