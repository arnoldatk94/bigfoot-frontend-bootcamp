import axios from "axios";
import React, { useEffect, useState } from "react";
import { ListGroup, Card, Button, Form } from "react-bootstrap";

import { BACKEND_URL } from "../constants.js";

export default function SightingFiltered() {
  const [year, setYear] = useState("1990");
  const [sighting, setSighting] = useState();
  const [search, setSearch] = useState("");

  useEffect(() => {
    console.log("sightings filtered");
    console.log("year", year);
    if (year) {
      axios.get(`${BACKEND_URL}/sightings/filter/${year}`).then((response) => {
        setSighting(response.data);
      });
    }
  }, [year]);

  return (
    <div>
      <Button variant="success" href="/">
        Home
      </Button>
      <Button
        onClick={() => {
          setYear(search);
        }}
      >
        Search by year
      </Button>

      <Form.Control
        placeholder="Search by year"
        type="text"
        onChange={(e) => setSearch(e.target.value)}
      />

      {sighting && sighting.length > 0
        ? sighting.map((test, index) => (
            <Card
              key={index}
              bg={"dark"}
              style={{
                width: "25rem",
              }}
            >
              <Card.Title>
                {test.YEAR} {test.SEASON}
              </Card.Title>
              <ListGroup>
                <ListGroup.Item variant="success">
                  {sighting && "Environment: " + test.ENVIRONMENT}
                </ListGroup.Item>
                <ListGroup.Item variant="primary">
                  {sighting && "Location details: " + test.LOCATION_DETAILS}
                </ListGroup.Item>
              </ListGroup>
            </Card>
          ))
        : null}
    </div>
  );
}
