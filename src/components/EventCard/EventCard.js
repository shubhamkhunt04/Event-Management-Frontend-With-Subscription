import React, { useContext } from 'react';
import { Card } from 'antd';
import { DeleteFilled } from '@ant-design/icons';
import { useMutation } from '@apollo/client';

import { AuthContext } from 'context/auth';
import { GET_ALL_EVENTS } from 'modules/Event/graphql/Queries';
import { DELETE_EVENT_MUTATION } from 'modules/Event/graphql/Mutations';
import './EventCard.css';

const EventCard = ({ eventId, userId, name = '-', description = '-' }) => {
  const [deleteEvent] = useMutation(DELETE_EVENT_MUTATION, {
    refetchQueries: [
      {
        query: GET_ALL_EVENTS,
      },
    ],
    // update(proxy) {
    //   const myCache = proxy.readQuery({ query: GET_ALL_EVENTS });
    //   console.log(myCache);
    //   if (myCache) {
    //     proxy.writeQuery({
    //       query: GET_ALL_EVENTS,
    //       data: {
    //         getAllEvents: myCache.getAllEvents.filter((s) => s.id !== eventId),
    //       },
    //     });
    //   }
    // },
  });

  const { user } = useContext(AuthContext);

  const deleteBtnHandler = () => {
    deleteEvent({
      variables: {
        eventId,
      },
    });
  };
  return (
    <Card hoverable title={name} className='eventCard'>
      <h4>EventID</h4>
      <p>{eventId}</p>
      <h4>EventName</h4>
      <p>{name}</p>
      <h4>Description</h4>
      <p>{description}</p>
      {user && parseInt(user.id) === parseInt(userId) && (
        <DeleteFilled onClick={deleteBtnHandler} />
      )}
    </Card>
  );
};

export default EventCard;
