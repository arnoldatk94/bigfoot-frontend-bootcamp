import axios from "axios";
import React, { useEffect, useState } from "react";
import { ListGroup, Card, Button, Form, FormControl } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";

import { BACKEND_URL } from "../constants.js";

export default function SightingFiltered() {
  // const [year, setYear] = useState("");
  const [sighting, setSighting] = useState();

  // let [searchParams, setSearchParams] = useSearchParams();
  const [bigFootQuery, setBigFootQuery] = useState({});

  const callApi = () => {
    axios
      .get(`${BACKEND_URL}/sightings/filter/`, {
        params: {
          SEASON: bigFootQuery.SEASON,
          YEAR: bigFootQuery.YEAR,
        },
      })
      .then((response) => {
        setSighting(response.data);
      });
  };

  // useEffect(() => {
  //   if (year) {
  //     axios
  //       .get(`${BACKEND_URL}/sightings/filter/`, {
  //         params: {
  //           SEASON: bigFootQuery.SEASON,
  //           YEAR: bigFootQuery.YEAR,
  //         },
  //       })
  //       .then((response) => {
  //         setSighting(response.data);
  //       });
  //   }
  // }, [bigFootQuery]);

  const handleChange = (e) => {
    const value = e.target.value;
    setBigFootQuery({ ...bigFootQuery, [e.target.name]: value });
  };

  return (
    <div>
      <Button href="/">Home</Button>
      <Button variant="success" onClick={callApi}>
        Call API
      </Button>
      <Form.Control
        placeholder="Season"
        name="SEASON"
        type="text"
        onChange={handleChange}
      />
      <Form.Control
        placeholder="Year"
        name="YEAR"
        type="text"
        onChange={handleChange}
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
