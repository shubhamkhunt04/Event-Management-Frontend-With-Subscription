import React, { useContext } from 'react';
import './EventCard.css';
import { Card } from 'antd';
import { DeleteFilled } from '@ant-design/icons';
import { useMutation } from '@apollo/client';
import { DELETE_EVENT_MUTATION } from '../../../modules/Event/graphql/Mutations';
import { AuthContext } from '../../../context/auth';

const EventCard = ({ eventId, userId, name, description }) => {
  const [deleteEvent] = useMutation(DELETE_EVENT_MUTATION);

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
