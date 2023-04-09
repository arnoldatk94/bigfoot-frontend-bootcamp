import axios from "axios";
import { useState, useEffect } from "react";
import { Button, FormControl, Table } from "react-bootstrap";
import { BACKEND_URL } from "../constants";
import ReactSelect from "./ReactSelect";

export default function NewSighting(props) {
  const [newSighting, setNewSighting] = useState({});
  const [choices, setChoices] = useState([]);

  // const handleChange = (e) => {
  //   const value = e.target.value;
  //   setNewSighting({ ...newSighting, [e.target.name]: value });
  // };

  const handleChange = (e, selected) => {
    const value = e?.target?.value || selected;
    setNewSighting({
      ...newSighting,
      [e?.target?.name || "categories"]: value,
    });
  };

  const addSighting = async (e) => {
    e.preventDefault();
    let data = await axios.post(`${BACKEND_URL}/sightings`, newSighting);
    console.log(data.data);
    props.setSightings(data.data);
  };

  useEffect(() => {
    console.log(newSighting);
  }, [newSighting]);

  // useEffect(() => {
  //   console.log("choices", choices);
  // }, [choices]);

  return (
    <>
      <ReactSelect
        choices={choices}
        setChoices={setChoices}
        newSighting={newSighting}
        setNewSighting={setNewSighting}
        handleChange={handleChange}
      />
      <Table
        responsive
        striped
        bordered
        variant="success"
        style={{ verticalAlign: "top" }}
      >
        <thead>
          <tr>
            <th colSpan={4}>New Sighting</th>
          </tr>
          <tr>
            <th>
              <FormControl
                type="text"
                required="required"
                name="location"
                placeholder="Location"
                onChange={handleChange}
              ></FormControl>
            </th>
            <th>
              <FormControl
                as="textarea"
                required="required"
                name="notes"
                placeholder="Notes"
                onChange={handleChange}
              ></FormControl>
            </th>
            <th>
              <FormControl
                type="datetime-local"
                required="required"
                name="date"
                placeholder="date"
                onChange={handleChange}
              ></FormControl>
            </th>
            <th>
              <Button onClick={addSighting}>Add</Button>
            </th>
          </tr>
        </thead>
      </Table>
    </>
  );
}
