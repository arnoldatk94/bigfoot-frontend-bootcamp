import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, FormControl } from "react-bootstrap";
import Select from "react-select";
import { BACKEND_URL } from "../constants";

export default function ReactSelect(props) {
  const [categories, setCategories] = useState();
  const [newCategory, setNewCategory] = useState();

  const selectFieldStyles = {
    option: (provided) => ({
      ...provided,
      color: "black",
    }),
  };
  let options =
    categories &&
    categories.map((category) => {
      return { value: category.id, label: category.name };
    });

  // Load all categories
  useEffect(() => {
    const getAllCategories = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/categories`);
        setCategories(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllCategories();
  }, []);

  const addCategory = async (e) => {
    e.preventDefault();
    let data = await axios.post(`${BACKEND_URL}/categories`, newCategory);
    // console.log(data.data);
    setCategories(data.data);
  };

  //Select category
  // const handleSelect = (selected) => {
  //   const selectedValues = selected.map((option) => option.value);
  //   console.log("selected", selected);
  //   console.log("selected values:", selectedValues);
  //   props.setChoices(selectedValues);
  // };

  const handleSelect = (selected) => {
    const selectedValues = selected.map((option) => option.value);
    props.setChoices(selectedValues);
    props.handleChange(null, selectedValues);
  };

  // Add new category
  const handleNewCat = (e) => {
    const value = e.target.value;
    setNewCategory({ ...newCategory, [e.target.name]: value });
  };

  return (
    <>
      <Select
        styles={selectFieldStyles}
        options={options}
        onChange={handleSelect}
        isMulti
        placeholder="Select Categories"
      />
      <div style={{ display: "flex" }}>
        <FormControl
          type="text"
          required="required"
          name="name"
          placeholder="Add new category"
          onChange={handleNewCat}
        />
        <Button onClick={addCategory}>Add</Button>
      </div>
    </>
  );
}
