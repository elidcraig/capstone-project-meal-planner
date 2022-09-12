import React, { useState } from "react";
import { useAtom } from "jotai";
import activePlanAtom from "../state/activePlanAtom";

function MealCard({ planMeal }) {
  const { meal, id } = planMeal;
  const { description, prep_time: prepTime, name } = meal;

  const [activePlan, setActivePlan] = useAtom(activePlanAtom);
  const { plan_meals: planMeals } = activePlan;

  async function handleRemoveMeal() {
    const response = await fetch(`/plan_meals/${id}`, { method: "DELETE" });
    if (response.ok) {
      const newPlanMeals = planMeals.filter((planMeal) => planMeal.id !== id);
      const newPlanState = { ...activePlan, plan_meals: newPlanMeals };
      setActivePlan(newPlanState);
    } else {
      const data = await response.json();
      console.log(data.errors);
    }
  }
  return (
    <div className="meal-card">
      <h5>{name}</h5>
      <h6>Prep Time: {prepTime} mins</h6>
      <p>{description}</p>
      <button onClick={handleRemoveMeal}>Remove</button>
    </div>
  );
}

export default MealCard;
