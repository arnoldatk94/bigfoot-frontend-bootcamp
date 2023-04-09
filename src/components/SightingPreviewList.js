import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Form, ListGroup, Table } from "react-bootstrap";
import { responsivePropType } from "react-bootstrap/esm/createUtilityClasses";
import { BACKEND_URL } from "../constants";
import NewSighting from "./NewSighting";
import ReactSelect from "./ReactSelect";

export default function SightingPreviewList() {
  const [sightings, setSightings] = useState();

  useEffect(() => {
    const getAllSightings = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/sightings`);
        setSightings(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getAllSightings();
  }, []);

  const deleteSighting = async (sightingId) => {
    if (window.confirm("Are you sure?") === true) {
      let data = await axios.delete(`${BACKEND_URL}/sightings/${sightingId}`);
      console.log(data);
      setSightings(data.data);
    }
  };

  return (
    <div>
      <NewSighting setSightings={setSightings} />
      {sightings && sightings.length > 0 ? (
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Sighting date</th>
              <th>Location</th>
              <th>Categories</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sightings.map((test, index) => (
              <tr key={test.id}>
                <td>{test.date.split("T")[0]}</td>
                <td>{test.location}</td>
                <td>
                  {test.categories && test.categories.length > 0
                    ? test.categories
                        .map((category) => category.name)
                        .join(", ")
                    : "No category info"}
                </td>
                <td>
                  <Button href={`/sightings/${test.id}`}>More info</Button>
                  <Button
                    variant="danger"
                    onClick={() => {
                      deleteSighting(test.id);
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : null}
    </div>
  );
}
