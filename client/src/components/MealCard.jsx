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
    }
  }
  return (
    <div className="meal-card">
      <h6>{name}</h6>
      <p>{prepTime}</p>
      <p>{description}</p>
      <button onClick={handleRemoveMeal}>Remove</button>
    </div>
  );
}

export default MealCard;
