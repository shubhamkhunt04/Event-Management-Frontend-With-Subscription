import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Row, Col } from "antd";
import { PlusSquareTwoTone } from "@ant-design/icons";
import { GET_ALL_EVENTS } from "./graphql/Queries";
import CustomeLayout from "../../CustomeLayout/CustomeLayout";
import EventCard from "../../EventCard/EventCard";
import { commonRoutes } from "../../common/constants";
import { CREATE_EVENT_SUBSCRIPTION } from "./graphql/Subscriptions";

const Events = () => {
  const { subscribeToMore, loading, error, data } = useQuery(GET_ALL_EVENTS, {
    fetchPolicy: "cache-and-network",
  });

  subscribeToMore({
    document: CREATE_EVENT_SUBSCRIPTION,
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev;
      const newEvent = subscriptionData.data.newEvent;
      return Object.assign({}, prev, {
        getAllEvents: [...prev.getAllEvents, newEvent],
      });
    },
  });

  return (
    <CustomeLayout current="event">
      <div>
        {error && <h1>Error :</h1>}
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <div style={{ marginTop: "30px" }}>
              <Row gutter={[0, 24]} justify="center">
                {data.getAllEvents.map((event) => {
                  return (
                    <Col style={{ padding: "16px" }} key={event.id}>
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
      <Link to={commonRoutes.CreateEvent}>
        <PlusSquareTwoTone
          style={{
            fontSize: "40px",
            cursor: "pointer",
            position: "fixed",
            zIndex: "1",
            bottom: "30px",
            right: "40px",
          }}
        />
      </Link>
    </CustomeLayout>
  );
};

export default Events;
