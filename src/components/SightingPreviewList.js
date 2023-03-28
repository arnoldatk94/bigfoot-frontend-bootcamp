import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useParams, useSearchParams } from "react-router-dom";
import { BACKEND_URL } from "../constants";

export default function SightingPreviewList() {
  const [sightings, setSightings] = useState();
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get(`${BACKEND_URL}/sightings`).then((response) => {
      setSightings(response.data);
    });
  }, []);

  useEffect(() => {
    console.log(sightings);
    // let temp = sightings.filter((item) => item.YEAR.includes(search));
    // console.log(temp);
    if (sightings) {
      for (let i of sightings) {
        console.log(i.YEAR);
      }
    }
  }, [sightings]);

  return (
    <div>
      <Button href="/filter/">Search</Button>
      <Form.Control
        placeholder="Search by year"
        type="text"
        onChange={(e) => setSearch(e.target.value)}
      />
      {sightings && sightings.length > 0
        ? sightings
            .filter((item) => item.YEAR?.includes(search))
            .map((test, index) => (
              <Card key={index} bg={"dark"}>
                <Card.Title>
                  {test.YEAR} {test.SEASON}
                </Card.Title>
                <Card.Body>
                  <Button href={`/sightings/${index}`}>More info</Button>
                </Card.Body>
              </Card>
            ))
        : null}
    </div>
  );
}
