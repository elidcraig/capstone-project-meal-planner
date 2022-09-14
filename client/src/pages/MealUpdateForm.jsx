import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

function MealUpdateForm() {
  const navigate = useNavigate();
  const { mealId } = useParams();

  const [formInput, setFormInput] = useState({});

  useEffect(() => {
    getMealData();
  }, []);

  function handleFormChange(e) {
    let newInputState = { ...formInput, [e.target.name]: e.target.value };
    setFormInput(newInputState);
  }

  async function getMealData() {
    const response = await fetch(`/meals/${mealId}`);
    const data = await response.json();
    if (response.ok) {
      console.log(data);
      setFormInput(data);
    } else {
      data.errors.forEach((error) => toast(error));
    }
  }

  async function handleUpdateMeal(e) {
    e.preventDefault();

    const response = await fetch(`/meals/${mealId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formInput),
    });
    const data = await response.json();
    if (response.ok) {
      setFormInput({});
      navigate("/account");
    } else data.errors.forEach((error) => toast(error));
  }

  return (
    <form className="new-meal-form" onSubmit={handleUpdateMeal}>
      <label className="form-input" htmlFor="name">
        Meal Name
      </label>
      <br />
      <input
        className="form-input"
        type="text"
        name="name"
        required
        value={formInput.name}
        onChange={handleFormChange}
      />
      <br />
      <label className="form-input" htmlFor="description">
        Description
      </label>
      <br />
      <input
        className="form-input"
        name="description"
        onChange={handleFormChange}
        value={formInput.description}
        type="text"
      />
      <br />
      <label className="form-input" htmlFor="prep_time">
        Prep Time (mins)
      </label>
      <br />
      <input
        className="form-input"
        type="number"
        name="prep_time"
        value={formInput.prep_time}
        onChange={handleFormChange}
        min="0"
      />
      <br />
      <label className="form-input" htmlFor="image_url">
        Image URL
      </label>
      <br />
      <input
        className="form-input"
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

export default MealUpdateForm;
