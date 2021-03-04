import { gql } from '@apollo/client';

export const CREATE_EVENT_SUBSCRIPTION = gql`
  subscription newEvent {
    newEvent {
      eventName
      description
      time
    }
  }
`;
