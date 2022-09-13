import React from "react";
import { useAtom } from "jotai";
import activePlanAtom from "../state/activePlanAtom";

function MealCard({ planMeal, editing }) {
  const { meal, id } = planMeal;
  const { description, prep_time: prepTime, image_url: imageUrl, name } = meal;

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
      <img src={imageUrl} />
      <h5>{name}</h5>
      <h6>Prep Time: {prepTime} mins</h6>
      <p>{description}</p>
      {editing ? <button onClick={handleRemoveMeal}>Remove</button> : null}
    </div>
  );
}

export default MealCard;
