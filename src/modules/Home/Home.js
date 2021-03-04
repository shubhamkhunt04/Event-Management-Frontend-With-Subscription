import React from 'react';
import { Row, Col } from 'antd';
import { useQuery } from '@apollo/client';

import { GET_ALL_EVENTS } from './graphql/Queries';
import EventCard from 'components/EventCard/EventCard';
import CustomeLayout from 'app/components/CustomeLayout/CustomeLayout';
import './Home.css';

const Home = () => {
  const { loading, error, data = {} } = useQuery(GET_ALL_EVENTS, {
    fetchPolicy: 'cache-and-network',
  });
  return (
    <CustomeLayout current='home'>
      <div id='bgHeight'>
        {error && <h1>Error : Please Turn On Internet </h1>}
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <div id='homeRootDiv'>
              <Row gutter={[0, 24]} justify='center'>
                {data?.getAllEvents?.slice(1, 5).map((event) => {
                  return (
                    <Col id='eventCardCol' key={event.id}>
                      <EventCard
                        eventid={event.id}
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
    </CustomeLayout>
  );
};

export default Home;
