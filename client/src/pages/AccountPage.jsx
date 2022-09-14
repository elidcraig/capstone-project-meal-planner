import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import currentUserAtom from "../state/currentUserAtom";
import toast from "react-hot-toast";

function AccountPage() {
  const [currentUser] = useAtom(currentUserAtom);
  const [editing, setEditing] = useState(false);
  const [userPlans, setUserPlans] = useState([]);
  const [followedPlans, setFollowedPlans] = useState([]);
  const [userLists, setUserLists] = useState([]);
  const [userMeals, setUserMeals] = useState([]);

  useEffect(() => {
    getAndSetPlans();
    getAndSetFollowedPlans();
    getAndSetLists();
    getAndSetMeals();
  }, []);

  async function getAndSetPlans() {
    const response = await fetch("/plans");
    const data = await response.json();

    if (response.ok) {
      setUserPlans(data);
    } else {
      data.errors.forEach((error) => toast(error));
    }
  }

  async function getAndSetFollowedPlans() {
    const response = await fetch("/plan_follows");
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      setFollowedPlans(data);
    } else {
      data.errors.forEach((error) => toast(error));
    }
  }

  async function getAndSetLists() {
    const response = await fetch("/lists");
    const data = await response.json();

    if (response.ok) {
      setUserLists(data);
    } else {
      data.errors.forEach((error) => toast(error));
    }
  }

  async function getAndSetMeals() {
    const response = await fetch("/meals");
    const data = await response.json();

    if (response.ok) {
      setUserMeals(data);
    } else {
      data.errors.forEach((error) => toast(error));
    }
  }

  async function handleDeletePlan(e) {
    const planId = parseInt(e.target.id);
    const response = await fetch(`/plans/${planId}`, { method: "DELETE" });
    if (response.ok) {
      const newPlanState = userPlans.filter((plan) => plan.id !== planId);
      setUserPlans(newPlanState);
    } else {
      const data = await response.json();
      data.errors.forEach((error) => toast(error));
    }
  }

  async function handleUnfollowPlan(e) {
    const followId = parseInt(e.target.id);
    const response = await fetch(`/plan_follows/${followId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      const newFollowState = followedPlans.filter(
        (follow) => follow.id !== followId
      );
      setFollowedPlans(newFollowState);
    } else {
      const data = await response.json();
      data.errors.forEach((error) => toast(error));
    }
  }

  async function handleDeleteList(e) {
    const listId = parseInt(e.target.id);
    const response = await fetch(`/lists/${listId}`, { method: "DELETE" });
    if (response.ok) {
      const newListState = userLists.filter((list) => list.id !== listId);
      setUserLists(newListState);
    } else {
      const data = await response.json();
      data.errors.forEach((error) => toast(error));
    }
  }

  async function handleDeleteMeal(e) {
    const mealId = parseInt(e.target.id);
    const response = await fetch(`/meals/${mealId}`, { method: "DELETE" });
    if (response.ok) {
      const newMealState = userMeals.filter((meal) => meal.id !== mealId);
      setUserMeals(newMealState);
    } else {
      const data = await response.json();
      data.errors.forEach((error) => toast(error));
    }
  }

  return (
    <div className="account-page">
      <h2>{currentUser.username}</h2>
      <h4>{currentUser.email}</h4>

      <h4>Your Lists</h4>
      <ul>
        {userLists.map((list) => (
          <li key={list.id}>
            <Link to={`/lists/${list.id}`}>{list.title}</Link>
            {editing ? (
              <button id={list.id} onClick={handleDeleteList}>
                X
              </button>
            ) : null}
          </li>
        ))}
      </ul>

      <h4>Your Plans</h4>
      <ul>
        {userPlans.map((plan) => (
          <li key={plan.id}>
            <Link to={`/plans/${plan.id}`}>{plan.name}</Link>
            {editing ? (
              <button id={plan.id} onClick={handleDeletePlan}>
                X
              </button>
            ) : null}
          </li>
        ))}
      </ul>

      <h4>Followed Plans</h4>
      <ul>
        {followedPlans.map((follow) => (
          <li key={follow.id}>
            <Link to={`/plans/${follow.plan.id}`}>{follow.plan.name}</Link>
            {editing ? (
              <button id={follow.id} onClick={handleUnfollowPlan}>
                X
              </button>
            ) : null}
          </li>
        ))}
      </ul>

      <h4>Your Meals</h4>
      <ul>
        {userMeals.map((meal) => (
          <li key={meal.id}>
            <Link to={`/meals/${meal.id}/edit`}>{meal.name}</Link>
            {editing ? (
              <button id={meal.id} onClick={handleDeleteMeal}>
                X
              </button>
            ) : null}
          </li>
        ))}
      </ul>

      <button onClick={() => setEditing(!editing)}>
        {editing ? "Done" : "Edit"}
      </button>
    </div>
  );
}

export default AccountPage;
