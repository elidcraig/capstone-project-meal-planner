import React, { useState } from "react";
import MealCard from "./MealCard";
import MealForm from "./MealForm";

function FullMealPlan({ planMeals }) {
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
            <MealForm day={day} />
          )}
        </div>
      ))}
    </div>
  );
}

export default FullMealPlan;
