import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import currentUserAtom from "../state/currentUserAtom";

function NewMealPlanForm() {
  const navigate = useNavigate();

  const [currentUser] = useAtom(currentUserAtom);
  const [input, setInput] = useState("");

  async function handleCreateNewPlan(e) {
    e.preventDefault();

    const config = {
      name: input,
      user_id: currentUser.id,
    };

    const response = await fetch("/plans", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(config),
    });
    const data = await response.json();

    if (response.ok) {
      setInput("");
      navigate(`/plans/${data.id}`);
    } else {
      console.log(data.errors);
    }
  }

  return (
    <form className="new-meal-plan-form" onSubmit={handleCreateNewPlan}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <input type="submit" value="Create Meal Plan" />
    </form>
  );
}

export default NewMealPlanForm;
