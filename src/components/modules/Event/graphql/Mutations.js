import { gql } from "@apollo/client";

// Hotels
export const CREATE_EVENT_MUTATION = gql`
  mutation($eventName: String!, $description: String!, $time: String!) {
    addEvent(
      input: { eventName: $eventName, description: $description, time: $time }
    ) {
      id
      eventName
      description
    }
  }
`;
