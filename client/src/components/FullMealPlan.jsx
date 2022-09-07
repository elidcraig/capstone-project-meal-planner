import React from "react";

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

  console.log(meals);

  let mealsReference = {};

  if (meals) {
    meals.forEach((mealObj) => {
      mealsReference[mealObj.day] = mealObj;
    });
  }

  console.log(mealsReference);

  return (
    <div className="full-meal-plan">
      {daysOfWeek.map((day) => (
        <div key={day} name={day} className="meal-plan-card">
          <h4>{day}</h4>
          <div>
            {mealsReference[day] ? mealsReference[day].meal.name : null}
          </div>
        </div>
      ))}
    </div>
  );
}

export default FullMealPlan;
