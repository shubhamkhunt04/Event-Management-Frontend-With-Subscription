import { gql } from '@apollo/client';

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

export const DELETE_EVENT_MUTATION = gql`
  mutation($eventId: ID!) {
    deleteEvent(eventId: $eventId)
  }
`;
