import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useAtom } from "jotai";
import currentUserAtom from "../state/currentUserAtom";
import activePlanAtom from "../state/activePlanAtom";

function MealForm({ day }) {
  let { planId } = useParams();

  const [currentUser] = useAtom(currentUserAtom);
  const [activePlan, setActivePlan] = useAtom(activePlanAtom);

  const [isOpen, setIsOpen] = useState(false);
  const [formInput, setFormInput] = useState({});

  function handleFormChange(e) {
    let newInputState = { ...formInput, [e.target.name]: e.target.value };
    setFormInput(newInputState);
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
    console.log(data);
    if (response.ok) {
      const newPlanMeals = [...activePlan.plan_meals, data];
      const newPlanState = { ...activePlan, plan_meals: newPlanMeals };
      setActivePlan(newPlanState);
    } else {
      console.log(data.errors);
    }
  }

  return (
    <div>
      {isOpen ? (
        <form onChange={handleFormChange} onSubmit={handleAddNewMeal}>
          <input value={formInput.name} type="text" name="name" />
          <input value={formInput.description} type="text" name="description" />
          <input value={formInput.prep_time} type="number" name="prep_time" />
          <input type="submit" value="Confirm" />
          <button onClick={(e) => setIsOpen(false)}>Cancel</button>
        </form>
      ) : (
        <button onClick={(e) => setIsOpen(true)}>Add Meal</button>
      )}
    </div>
  );
}

export default MealForm;
