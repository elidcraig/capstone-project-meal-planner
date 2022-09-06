import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FullMealPlan from "../components/FullMealPlan";

function MealPlanPage() {
  let { planId } = useParams();

  const [mealPlan, setMealPlan] = useState({});
  const { name, plan_meals: planMeals } = mealPlan;

  const [targetTextContent, setTargetTextContent] = useState();

  useEffect(() => {
    getAndSetMealPlan();
    // eslint-disable-next-line
  }, []);

  async function getAndSetMealPlan() {
    const response = await fetch(`/plans/${planId}`);
    const data = await response.json();

    if (response.ok) {
      setMealPlan(data);
    } else {
      console.log(data.errors);
    }
  }

  async function updatePlanNameOnBlur() {
    const response = await fetch(`/plans/${planId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: targetTextContent }),
    });
    const data = await response.json();

    if (response.ok) {
      setMealPlan({ ...mealPlan, name: data.name });
    } else {
      console.log(data.errors);
    }
  }

  return (
    <div className="meal-plan-page">
      <h2
        id={planId}
        contentEditable="true"
        onInput={(e) => setTargetTextContent(e.currentTarget.textContent)}
        onBlur={updatePlanNameOnBlur}
      >
        {name}
      </h2>
      <FullMealPlan meals={planMeals} />
    </div>
  );
}

export default MealPlanPage;
