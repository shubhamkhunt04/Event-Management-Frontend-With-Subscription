import { gql } from "@apollo/client";

export const CREATE_EVENT_SUBSCRIPTION = gql`
  subscription($id: ID) {
    event(id: $id) {
      data {
        id
        userId
        eventName
        description
        guests {
          id
          invitedUserEmail
        }
      }
      mutation
    }
  }
`;
