import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Form, ListGroup } from "react-bootstrap";
import { useParams, useSearchParams } from "react-router-dom";
import { BACKEND_URL } from "../constants";
import NewSighting from "./NewSighting";

export default function SightingPreviewList() {
  const [sightings, setSightings] = useState();
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get(`${BACKEND_URL}/sightings`).then((response) => {
      setSightings(response.data);
    });
  }, []);

  const checkId = (id) => {
    console.log(id);
  };

  const deleteSighting = async (sightingId) => {
    if (window.confirm("Are you sure?") === true) {
      let data = await axios.delete(`${BACKEND_URL}/sightings/${sightingId}`);
      console.log(data);
      setSightings(data.data);
    }
  };

  useEffect(() => console.log(sightings));

  // useEffect(() => {
  //   console.log(sightings);
  //   let temp = sightings.filter((item) => item.YEAR.includes(search));
  //   console.log(temp);
  //   if (sightings) {
  //     for (let i of sightings) {
  //       console.log(i.YEAR);
  //     }
  //   }
  // }, [sightings]);

  return (
    <div>
      {/* <Button href="/filter/">Search</Button>
      <Form.Control
        placeholder="Search by year"
        type="text"
        onChange={(e) => setSearch(e.target.value)}
      /> */}
      <NewSighting setSightings={setSightings} />
      {sightings && sightings.length > 0
        ? sightings.map((test, index) => (
            <Card key={test.id} bg={"dark"}>
              <Card.Title>{test.date.split("T")[0]}</Card.Title>
              <Card.Body>
                <ListGroup>
                  <ListGroup.Item>{test.location}</ListGroup.Item>
                </ListGroup>
                <div className="col-sm-12 text-center">
                  <Button href={`/sightings/${test.id}`}>More info</Button>
                  <Button
                    variant="danger"
                    onClick={() => {
                      deleteSighting(test.id);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))
        : null}
      {/* {sightings && sightings.length > 0
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
        : null} */}
    </div>
  );
}
