import React, { useState } from "react";
import MealCard from "./MealCard";
import MealForm from "./MealForm";

function FullMealPlan({ meals }) {
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

  if (meals) {
    meals.forEach((mealObj) => {
      mealsReference[mealObj.day] = mealObj;
    });
  }

  return (
    <div className="full-meal-plan">
      {daysOfWeek.map((day) => (
        <div key={day} name={day} className="meal-plan-card">
          <h4>{day}</h4>
          {mealsReference[day] ? (
            <MealCard meal={mealsReference[day].meal} />
          ) : (
            <MealForm day={day} />
          )}
        </div>
      ))}
    </div>
  );
}

export default FullMealPlan;
