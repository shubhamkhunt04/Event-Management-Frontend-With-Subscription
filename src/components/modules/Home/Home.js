import React from "react";
import CustomeLayout from "../../CustomeLayout/CustomeLayout";
import { useQuery } from "@apollo/client";
import { Row, Col } from "antd";
import Loader from "../../Loader/Loader";
import { GET_ALL_EVENTS } from "./graphql/Queries";
import EventCard from "../../EventCard/EventCard";

const Home = () => {
  const { loading, error, data } = useQuery(GET_ALL_EVENTS, {
    fetchPolicy: "cache-and-network",
  });
  return (
    <CustomeLayout current="home">
      <div>
        {error && <h1>Error :</h1>}
        {loading ? (
          <Loader />
        ) : (
          <>
            <div style={{ marginTop: "30px" }}>
              <Row gutter={[0, 24]} justify="center">
                {data.getAllEvents.slice(1, 5).map((event) => {
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
    </CustomeLayout>
  );
};

export default Home;
