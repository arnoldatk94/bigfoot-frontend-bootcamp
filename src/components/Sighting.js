import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  ListGroup,
  Card,
  Button,
  FormControl,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";

import { BACKEND_URL } from "../constants.js";
import ReactSelect from "./ReactSelect.js";

export default function Sighting() {
  const [sightingIndex, setSightingIndex] = useState();
  const [sighting, setSighting] = useState();
  const [updateSighting, setUpdateSighting] = useState({}); // Update Sighting
  const [newChoices, setNewChoices] = useState([]); // Update Sighting
  const [comments, setComments] = useState();
  const [newComment, setNewComment] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editCommentId, setEditCommentId] = useState();
  const [edittedComment, setEdittedComment] = useState({});

  const turnOnEdit = (id) => {
    setEditMode(true);
    setEditCommentId(id);
  };

  const turnOffEdit = () => {
    setEditMode(false);
    setEditCommentId();
  };

  const params = useParams();
  if (sightingIndex !== params.sightingIndex) {
    setSightingIndex(params.sightingIndex);
  }

  useEffect(() => {
    if (sightingIndex) {
      axios
        .get(`${BACKEND_URL}/sightings/comments/${sightingIndex}`)
        .then((response) => {
          setComments(response.data);
        });
    }
  }, []);

  const deleteComment = async (commentId) => {
    let data = await axios.delete(
      `${BACKEND_URL}/sightings/comment/${commentId}/${sightingIndex}`
    );

    setComments(data.data);
  };

  const addComment = async (e) => {
    e.preventDefault();
    let data = await axios.post(
      `${BACKEND_URL}/sightings/comments/${sightingIndex}`,
      newComment
    );
    // console.log(data.data);
    setComments(data.data);
  };

  const updateComment = async (commentId) => {
    let data = await axios.put(
      `${BACKEND_URL}/sightings/comments/${commentId}/${sightingIndex}`,
      edittedComment
    );
    console.log(data.data);
    setComments(data.data);
    turnOffEdit();
  };

  // useEffect(() => {
  //   if (sightingIndex) {
  //     axios
  //       .get(`${BACKEND_URL}/sightings/${sightingIndex}`)
  //       .then((response) => {
  //         setSighting(response.data);
  //         setUpdateSighting(response.data);
  //       });
  //   }
  // }, []);

  // useEffect(() => {
  //   if (sightingIndex) {
  //     axios
  //       .get(`${BACKEND_URL}/sightings/${sightingIndex}`)
  //       .then((response) => {
  //         const { date, location, notes, categories } = response.data;
  //         const formattedCategories = categories.map((category) => category.id);
  //         setSighting({
  //           date,
  //           location,
  //           notes,
  //           categories: formattedCategories,
  //         });
  //         setUpdateSighting({
  //           date,
  //           location,
  //           notes,
  //           categories: formattedCategories,
  //         });
  //       });
  //   }
  // }, []);

  useEffect(() => {
    const fetchSighting = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/sightings/${sightingIndex}`
        );
        const { date, location, notes, categories } = response.data;
        const categoryIds = categories.map((category) => category.id);
        setSighting(response.data);
        setUpdateSighting({
          date,
          location,
          notes,
          categories: categoryIds,
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchSighting();
  }, [sightingIndex]);

  const editSighting = async (e) => {
    e.preventDefault();
    let data = await axios.put(
      `${BACKEND_URL}/sightings/${sightingIndex}`,
      updateSighting
    );
    console.log(data.data);
    setSighting(data.data);
  };

  // const handleChange = (e) => {
  //   const value = e.target.value;
  //   setUpdateSighting({ ...updateSighting, [e.target.name]: value });
  // };

  const handleChange = (e, selected) => {
    const value = e?.target?.value || selected;
    setUpdateSighting({
      ...updateSighting,
      [e?.target?.name || "categories"]: value,
    });
  };

  const handleComment = (e) => {
    const value = e.target.value;
    setNewComment({ ...newComment, [e.target.name]: value });
  };

  const handleEditComment = (e) => {
    const value = e.target.value;
    setEdittedComment({ ...edittedComment, [e.target.name]: value });
  };

  useEffect(() => {
    console.log(updateSighting);
  }, [updateSighting]);

  return (
    <div>
      <Button href="/">Home</Button>
      <ReactSelect
        choices={newChoices}
        setChoices={setNewChoices}
        newSighting={updateSighting}
        setNewSighting={setUpdateSighting}
        handleChange={handleChange}
      />
      <Table responsive striped bordered variant="success">
        <thead>
          <tr>
            <th colSpan={4}>Edit Sighting</th>
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
              <Button onClick={editSighting}>Edit</Button>
            </th>
          </tr>
        </thead>
      </Table>
      <Container>
        <Row>
          <Col>
            <Table striped bordered hover variant="dark">
              <tbody>
                <tr>
                  <td>Sighting Date:</td>
                  <td>{sighting && sighting.date.split("T")[0]}</td>
                </tr>
                <tr>
                  <td>Location info:</td>
                  <td>{sighting && sighting.location}</td>
                </tr>
                <tr>
                  <td>Notes:</td>
                  <td>{sighting && sighting.notes}</td>
                </tr>
                <tr>
                  <td>Categories:</td>
                  <td>
                    {sighting &&
                    sighting.categories &&
                    sighting.categories.length > 0
                      ? sighting.categories
                          .map((category) => category.name)
                          .join(", ")
                      : "No category info"}
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
          <Col>
            <Table responsive striped bordered variant="success">
              <thead>
                <tr>
                  <th colSpan={2}>Add Comment</th>
                </tr>
                <tr>
                  <th>
                    <FormControl
                      as="textarea"
                      required="required"
                      name="content"
                      placeholder="New Comments"
                      onChange={handleComment}
                    ></FormControl>
                  </th>
                  <th>
                    <Button onClick={addComment}>Add</Button>
                  </th>
                </tr>
              </thead>
            </Table>
            <Table responsive striped bordered variant="primary">
              <thead>
                <tr>
                  <th>Comment</th>
                  <th>Edit/Delete</th>
                </tr>
              </thead>
              <tbody>
                {comments &&
                  comments.map((element) => (
                    <tr key={element.id}>
                      <th>
                        {editCommentId === element.id ? (
                          <FormControl
                            as="textarea"
                            required="required"
                            name="content"
                            placeholder={element.content}
                            onChange={handleEditComment}
                          ></FormControl>
                        ) : (
                          element.content
                        )}
                      </th>
                      <th>
                        {editCommentId === element.id ? (
                          <>
                            <Button
                              variant="success"
                              onClick={() => {
                                updateComment(element.id);
                              }}
                            >
                              Save
                            </Button>
                            <Button variant="danger" onClick={turnOffEdit}>
                              Cancel
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              variant="success"
                              onClick={() => {
                                turnOnEdit(element.id);
                              }}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="danger"
                              onClick={() => {
                                deleteComment(element.id);
                              }}
                            >
                              Delete
                            </Button>
                          </>
                        )}
                      </th>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
