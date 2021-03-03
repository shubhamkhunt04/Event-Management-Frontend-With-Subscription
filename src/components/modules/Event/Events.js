import React from 'react';
import './Event.css';
import { Link } from 'react-router-dom';
import { useQuery, useSubscription } from '@apollo/client';
import { Row, Col, message } from 'antd';
import { PlusSquareTwoTone } from '@ant-design/icons';
import { GET_ALL_EVENTS } from './graphql/Queries';
import CustomeLayout from '../../CustomeLayout/CustomeLayout';
import EventCard from '../../common/components/EventCard/EventCard';
import { commonRoutes } from '../../common/constants';
import { CREATE_EVENT_SUBSCRIPTION } from './graphql/Subscriptions';

const Events = () => {
  const { subscribeToMore, loading, error, data } = useQuery(GET_ALL_EVENTS, {
    fetchPolicy: 'cache-and-network',
  });

  const eventSubscription = useSubscription(CREATE_EVENT_SUBSCRIPTION);

  subscribeToMore({
    document: CREATE_EVENT_SUBSCRIPTION,
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data.newEvent) return prev;
      const newEvent = subscriptionData.data.newEvent;
      return Object.assign({}, prev, {
        getAllEvents: [...prev.getAllEvents, newEvent],
      });
    },
  });

  return (
    <CustomeLayout current='event'>
      <div>
        {error && <h1>Error :</h1>}
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            {eventSubscription.data && message.success('Event created')}
            <div id='eventRootDiv'>
              <Row gutter={[0, 24]} justify='center'>
                {data.getAllEvents.map((event) => {
                  return (
                    <Col id='eventCardRootCol' key={event.id}>
                      <EventCard
                        userId={event.userId}
                        eventId={event.id}
                        name={event.eventName}
                        description={event.description}
                      />
                    </Col>
                  );
                })}
              </Row>
            </div>
          </>
        )}
      </div>
      <Link to={commonRoutes.CreateEvent}>
        <PlusSquareTwoTone className='plusSquareTwoToneIcon' />
      </Link>
    </CustomeLayout>
  );
};

export default Events;
