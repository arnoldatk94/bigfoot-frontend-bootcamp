import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ListGroup, Card, Nav, Button } from "react-bootstrap";

import { BACKEND_URL } from "../constants.js";

export default function Sighting() {
  const [sightingIndex, setSightingIndex] = useState();
  const [sighting, setSighting] = useState();
  let [environment, setEnvironment] = useState("No info");
  let [location_details, setLocation_details] = useState("No info");
  let [month, setMonth] = useState("");

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

  const sightingDetails = [];
  if (sighting) {
    console.log(sighting);
    for (const key in sighting) {
      sightingDetails.push(
        <Card.Text key={key}>{`${key}: ${sighting[key]}`}</Card.Text>
      );
    }
  }

  useEffect(() => {
    if (sighting) {
      if (sighting.ENVIRONMENT) setEnvironment(sighting.ENVIRONMENT);
      if (sighting.LOCATION_DETAILS)
        setLocation_details(sighting.LOCATION_DETAILS);
      if (sighting.MONTH) setMonth(sighting.MONTH);
    }
  });

  // let environment = sighting.ENVIRONMENT ? sighting.ENVIRONMENT : "No info";
  // let location_details = sighting.LOCATION_DETAILS
  //   ? sighting.LOCATION_DETAILS
  //   : "No info";

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
                {/* {sighting && `Environment: ${sighting.ENVIRONMENT}`} */}
                {sighting && "Environment: " + environment}
              </ListGroup.Item>
              <ListGroup.Item variant="primary">
                {/* {sighting && `Location Details: ${sighting.LOCATION_DETAILS}`} */}
                {sighting && "Location details: " + location_details}
              </ListGroup.Item>
            </ListGroup>
          </Card.Title>
        </Card.Body>
      </Card>
    </div>
  );
}
