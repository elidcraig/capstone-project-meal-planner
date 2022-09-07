import React, { useState } from "react";

function MealCard({ meal }) {
  const { description, prep_time: prepTime, name } = meal;
  return (
    <div className="meal-card">
      <h6>{name}</h6>
      <p>{prepTime}</p>
      <p>{description}</p>
    </div>
  );
}

export default MealCard;
