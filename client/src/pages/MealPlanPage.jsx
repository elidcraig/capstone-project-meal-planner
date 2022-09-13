import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAtom } from "jotai";
import activePlanAtom from "../state/activePlanAtom";
import FullMealPlan from "../components/FullMealPlan";
import currentUserAtom from "../state/currentUserAtom";
import SharingForm from "../components/SharingForm";

function MealPlanPage() {
  let { planId } = useParams();
  const [currentUser] = useAtom(currentUserAtom);
  const [mealPlan, setMealPlan] = useAtom(activePlanAtom);
  const { name, plan_meals: planMeals, user: planUser } = mealPlan;

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

  if (!planUser) return <h2>Loading...</h2>;

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
      <FullMealPlan planMeals={planMeals} />
      <br />
      <br />
      {currentUser.id === planUser.id ? <SharingForm /> : null}
    </div>
  );
}

export default MealPlanPage;
