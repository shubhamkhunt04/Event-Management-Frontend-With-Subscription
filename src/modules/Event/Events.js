import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Row, Col, message } from 'antd';
import { PlusSquareTwoTone } from '@ant-design/icons';

import { GET_ALL_EVENTS } from './graphql/Queries';
import { commonRoutes } from 'common/constants';
import { CREATE_EVENT_SUBSCRIPTION } from './graphql/Subscriptions';
import CustomeLayout from 'app/components/CustomeLayout/CustomeLayout';
import EventCard from 'components/EventCard/EventCard';
import './Event.css';

const Events = () => {
  const { subscribeToMore, loading, error, data = {} } = useQuery(
    GET_ALL_EVENTS
  );

  const subscribeCreateEvent = () => {
    subscribeToMore({
      document: CREATE_EVENT_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data.newEvent) return prev;
        if (subscriptionData.data.newEvent) {
          message.success(
            `${subscriptionData.data.newEvent.eventName} Event Created`
          );
        }
        const newEvent = subscriptionData.data.newEvent;
        return Object.assign({}, prev, {
          getAllEvents: [...prev.getAllEvents, newEvent],
        });
      },
    });
  };

  useEffect(() => {
    /* eslint-disable react-hooks/exhaustive-deps */
    subscribeCreateEvent();
  }, []);

  return (
    <CustomeLayout current='event'>
      <div>
        {error && <h1>Error : Please Turn On Internet </h1>}

        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <div id='eventRootDiv'>
              <Row gutter={[0, 24]} justify='center'>
                {data?.getAllEvents?.map((event) => {
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
