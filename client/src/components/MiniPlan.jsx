import React, { useState, useEffect } from "react";

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
      <h4>{featuredPlan.name}</h4>
    </div>
  );
}

export default MiniPlan;
