import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import currentUserAtom from "../state/currentUserAtom";

function NewMealForm() {
  const navigate = useNavigate();

  const [currentUser] = useAtom(currentUserAtom);
  const [formInput, setFormInput] = useState({});

  function handleFormChange(e) {
    let newInputState = { ...formInput, [e.target.name]: e.target.value };
    setFormInput(newInputState);
  }

  async function handleAddMeal(e) {
    e.preventDefault();

    const config = { ...formInput, user_id: currentUser.id };

    const response = await fetch("/meals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(config),
    });
    const data = await response.json();

    if (response.ok) {
      setFormInput({});
      navigate("/account");
    } else {
      console.log(data.errors);
    }
  }

  return (
    <form className="new-meal-form" onSubmit={handleAddMeal}>
      <label htmlFor="name">Meal Name</label>
      <br />
      <input
        type="text"
        name="name"
        required
        value={formInput.name}
        onChange={handleFormChange}
      />
      <br />
      <label htmlFor="description">Description</label>
      <br />
      <input
        value={formInput.description}
        type="text"
        name="description"
        onChange={handleFormChange}
      />
      <br />
      <label htmlFor="prep_time">Prep Time (mins)</label>
      <br />
      <input
        type="number"
        name="prep_time"
        value={formInput.prep_time}
        onChange={handleFormChange}
      />
      <br />
      <label htmlFor="image_url">Image URL</label>
      <br />
      <input
        type="text"
        name="image_url"
        value={formInput.image_url}
        onChange={handleFormChange}
      />
      <br />
      <input type="submit" className="button" value="Confirm" />
    </form>
  );
}

export default NewMealForm;
