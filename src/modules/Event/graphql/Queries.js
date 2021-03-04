import { gql } from '@apollo/client';

export const GET_ALL_EVENTS = gql`
  query {
    getAllEvents(input: { sort: { orderBy: createdAt, sortType: DESC } }) {
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
