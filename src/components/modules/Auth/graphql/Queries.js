import { gql } from "@apollo/client";

export const GET_ALL_EVENTS = gql`
  query {
    getAllEvents {
      id
      userId
      eventName
      description
      guests {
        invitedUserEmail
        id
      }
    }
  }
`;
