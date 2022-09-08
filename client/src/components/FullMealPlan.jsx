import React, { useState, useEffect } from "react";
import MealCard from "./MealCard";
import MealForm from "./MealForm";

function FullMealPlan({ planMeals }) {

  const [pastMeals, setPastMeals] = useState([]);

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

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  let mealsReference = {};

  if (planMeals) {
    planMeals.forEach((planMealObj) => {
      mealsReference[planMealObj.day] = planMealObj;
    });
  }

  return (
    <div className="full-meal-plan">
      {daysOfWeek.map((day) => (
        <div key={day} name={day} className="meal-plan-day">
          <h4>{day}</h4>
          {mealsReference[day] ? (
            <MealCard planMeal={mealsReference[day]} />
          ) : (
            <MealForm day={day} pastMeals={pastMeals} />
          )}
        </div>
      ))}
    </div>
  );
}

export default FullMealPlan;
