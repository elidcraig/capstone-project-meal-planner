import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function MiniPlan() {
  const [featuredPlan, setFeaturedPlan] = useState({});

  useEffect(() => {
    getAndSetFeaturedPlan();
  }, []);

  async function getAndSetFeaturedPlan() {
    const response = await fetch("/featured-plan");
    const data = await response.json();

    if (response.ok) {
      if (data) setFeaturedPlan(data);
    } else {
      console.log(data.errors);
    }
  }

  if (!featuredPlan.id) return <div>LOADING......</div>;

  return (
    <div className="mini-plan">
      <Link to={`/plans/${featuredPlan.id}`}>
        <h4>{featuredPlan.name}</h4>
      </Link>
      {featuredPlan.plan_meals.map((item) => (
        <p key={item.id}>
          <b>{item.day}: </b>
          {item.meal.name}
        </p>
      ))}
    </div>
  );
}

export default MiniPlan;
