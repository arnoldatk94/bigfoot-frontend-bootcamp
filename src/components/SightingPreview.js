import React from "react";
import Card from "react-bootstrap/Card";

const SightingPreview = (props) => {
  return (
    <Card bg="dark">
      <Card.Body>
        <Card.Title>
          {`${props.data.YEAR} ${props.data.SEASON} ${props.data.MONTH}`}
        </Card.Title>
      </Card.Body>
    </Card>
  );
};

export default SightingPreview;
