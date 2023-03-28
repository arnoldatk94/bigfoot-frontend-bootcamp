import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ListGroup, Card, Nav, Button } from "react-bootstrap";

import { BACKEND_URL } from "../constants.js";

export default function Sighting() {
  const [sightingIndex, setSightingIndex] = useState();
  const [sighting, setSighting] = useState();
  const [environment, setEnvironment] = useState("No info");
  const [location_details, setLocation_details] = useState("No info");
  const [month, setMonth] = useState("");

  useEffect(() => {
    console.log("sightings rendered");
    if (sightingIndex) {
      axios
        .get(`${BACKEND_URL}/sightings/${sightingIndex}`)
        .then((response) => {
          setSighting(response.data);
        });
    }
  }, [sightingIndex]);

  const params = useParams();
  if (sightingIndex !== params.sightingIndex) {
    setSightingIndex(params.sightingIndex);
  }

  useEffect(() => {
    if (sighting) {
      if (sighting.ENVIRONMENT) setEnvironment(sighting.ENVIRONMENT);
      if (sighting.LOCATION_DETAILS)
        setLocation_details(sighting.LOCATION_DETAILS);
      if (sighting.MONTH) setMonth(sighting.MONTH);
    }
  });

  return (
    <div>
      <Button href="/">Home</Button>
      <Card bg="dark">
        <Card.Body>
          <Card.Title>
            {sighting && `${sighting.YEAR} ${sighting.SEASON} ${month}`}
            <br />
            <br />
            <ListGroup>
              <ListGroup.Item variant="success">
                {sighting && "Environment: " + environment}
              </ListGroup.Item>
              <ListGroup.Item variant="primary">
                {sighting && "Location details: " + location_details}
              </ListGroup.Item>
            </ListGroup>
          </Card.Title>
        </Card.Body>
      </Card>
    </div>
  );
}
