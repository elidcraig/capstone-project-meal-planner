import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAtom } from "jotai";
import currentUserAtom from "../state/currentUserAtom";
import activePlanAtom from "../state/activePlanAtom";

function MealForm({ day }) {
  let { planId } = useParams();

  const [currentUser] = useAtom(currentUserAtom);
  const [activePlan, setActivePlan] = useAtom(activePlanAtom);

  const [pastMeals, setPastMeals] = useState([]);
  // const [selectedMeal, setSelectedMeal] = useState({});

  const [isOpen, setIsOpen] = useState(false);
  const [formInput, setFormInput] = useState({});

  useEffect(() => {
    getAndSetPastMeals();
  }, []);

  async function getAndSetPastMeals() {
    const response = await fetch("/past_meals");
    const data = await response.json();
    if (response.ok) {
      setPastMeals([{ name: "New Meal" }, ...data]);
    } else {
      console.log(data.errors);
    }
  }

  function handleFormChange(e) {
    let newInputState = { ...formInput, [e.target.name]: e.target.value };
    setFormInput(newInputState);
  }

  function handleSelectChange(e) {
    const activeMeal = pastMeals.find(
      (meal) => meal.id === parseInt(e.target.value)
    );
    if (activeMeal) setFormInput(activeMeal);
    else setFormInput({ name: "", description: "", prep_time: "" });
  }

  async function handleAddNewMeal(e) {
    e.preventDefault();

    const config = {
      ...formInput,
      plan_id: planId,
      day: day,
      user_id: currentUser.id,
    };

    const response = await fetch("/meals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(config),
    });
    const data = await response.json();

    if (response.ok) {
      const newPlanMeals = [...activePlan.plan_meals, data];
      const newPlanState = { ...activePlan, plan_meals: newPlanMeals };
      setActivePlan(newPlanState);
    } else {
      console.log(data.errors);
    }
  }

  // console.log(pastMeals);

  return (
    <div>
      {isOpen ? (
        <>
          <select name="pastMeals" onChange={handleSelectChange}>
            {pastMeals.map((meal) => (
              <option value={meal.id}>{meal.name}</option>
            ))}
          </select>
          <form onChange={handleFormChange} onSubmit={handleAddNewMeal}>
            <label htmlFor="name">Meal Name</label>
            <br />
            <input value={formInput.name} type="text" name="name" required />
            <br />
            <label htmlFor="description">Description</label>
            <br />
            <textarea name="description">{formInput.description}</textarea>
            <br />
            <label htmlFor="prep_time">Prep Time (mins)</label>
            <br />
            <input value={formInput.prep_time} type="number" name="prep_time" />
            <br />
            <input type="submit" value="Confirm" />
            <button
              onClick={() => {
                setIsOpen(false);
                setFormInput({});
              }}
            >
              Cancel
            </button>
          </form>
        </>
      ) : (
        <button onClick={() => setIsOpen(true)}>Add Meal</button>
      )}
    </div>
  );
}

export default MealForm;
