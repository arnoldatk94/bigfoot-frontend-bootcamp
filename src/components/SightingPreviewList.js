import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useParams, useSearchParams } from "react-router-dom";
import { BACKEND_URL } from "../constants";

export default function SightingPreviewList() {
  const [sightings, setSightings] = useState();
  const [search, setSearch] = useSearchParams();

  let { sightingsIndex } = useParams;

  useEffect(() => {
    axios.get(`${BACKEND_URL}/sightings`).then((response) => {
      setSightings(response.data);
    });
  }, []);

  return (
    <div>
      <Form.Control
        placeholder="Search"
        type="text"
        onChange={(e) => setSearch(e.target.value)}
      />
      {sightings && sightings.length > 0
        ? sightings.map((test, index) => (
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