import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";

const EventCard = ({ eventid, name, description }) => {
  return (
    <Link to={`/hotels/${eventid}`}>
      <Card
        hoverable
        title={name}
        style={{
          cursor: "pointer",
          width: "240px",
          backgroundColor: "#C3FFA9",
          height: "300px",
        }}
      >
        <h4>EventID</h4>
        <p>{eventid}</p>
        <h4>EventName</h4>
        <p>{name}</p>
        <h4>Description</h4>
        <p>{description}</p>
      </Card>
    </Link>
  );
};

export default EventCard;
