import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useAtom } from "jotai";
import currentUserAtom from "../state/currentUserAtom";
import activePlanAtom from "../state/activePlanAtom";
import toast from "react-hot-toast";

function MealForm({ day, pastMeals = [] }) {
  let { planId } = useParams();

  const [currentUser] = useAtom(currentUserAtom);
  const [activePlan, setActivePlan] = useAtom(activePlanAtom);

  const [isOpen, setIsOpen] = useState(false);
  const [selection, setSelection] = useState("New Meal");
  const [formInput, setFormInput] = useState({});

  function handleFormChange(e) {
    let newInputState = { ...formInput, [e.target.name]: e.target.value };
    setFormInput(newInputState);
  }

  function handleSelectChange(e) {
    const activeMeal = pastMeals.find(
      (meal) => meal.id === parseInt(e.target.value)
    );
    if (activeMeal) {
      setFormInput(activeMeal);
      setSelection(activeMeal.name);
    } else {
      setFormInput({ name: "", description: "", prep_time: "" });
      setSelection("New Meal");
    }
  }

  function handleAddMeal(e) {
    e.preventDefault();

    if (selection === "New Meal") handleAddNewMeal();
    else handleAddPastMeal();
  }

  async function handleAddNewMeal() {
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
      data.errors.forEach((error) => toast(error));
    }
  }

  async function handleAddPastMeal() {
    const config = { meal_id: formInput.id, plan_id: planId, day: day };

    const response = await fetch("/plan_meals", {
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
      data.errors.forEach((error) => toast(error));
    }
  }

  return (
    <div>
      {isOpen ? (
        <>
          <select name="pastMeals" onChange={handleSelectChange}>
            {pastMeals.map((meal) => (
              <option value={meal.id}>{meal.name}</option>
            ))}
          </select>
          <form onChange={handleFormChange} onSubmit={handleAddMeal}>
            <label htmlFor="name">Meal Name</label>
            <br />
            <input value={formInput.name} type="text" name="name" required />
            <br />
            <label htmlFor="description">Description</label>
            <br />
            <input
              value={formInput.description}
              type="text"
              name="description"
            />
            <br />
            <label htmlFor="prep_time">Prep Time (mins)</label>
            <br />
            <input value={formInput.prep_time} type="number" min="0" name="prep_time" />
            <br />
            <label htmlFor="image_url">Image Url</label>
            <br />
            <input value={formInput.image_url} type="text" name="image_url" />
            <br />
            <input type="submit" className="button" value="Confirm" />
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
