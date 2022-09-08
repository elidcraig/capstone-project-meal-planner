import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import currentUserAtom from "../state/currentUserAtom";

function AccountPage() {
  const [currentUser] = useAtom(currentUserAtom);
  const [editing, setEditing] = useState(false);
  const [userPlans, setUserPlans] = useState([]);
  const [userLists, setUserLists] = useState([]);

  useEffect(() => {
    getAndSetPlans();
    getAndSetLists();
  }, []);

  async function getAndSetPlans() {
    const response = await fetch("/plans");
    const data = await response.json();

    if (response.ok) {
      setUserPlans(data);
    } else {
      console.log(data.errors);
    }
  }

  async function getAndSetLists() {
    const response = await fetch("/lists");
    const data = await response.json();

    if (response.ok) {
      setUserLists(data);
    } else {
      console.log(data.errors);
    }
  }

  async function handleDeletePlan(e) {
    const planId = parseInt(e.target.id);
    const response = await fetch(`/plans/${planId}`, { method: "DELETE" });
    if (response.ok) {
      const newPlanState = userPlans.filter((plan) => plan.id !== planId);
      setUserPlans(newPlanState);
    } else {
      console.error("Error processing DELETE request");
    }
  }

  async function handleDeleteList(e) {
    const listId = parseInt(e.target.id);
    const response = await fetch(`/lists/${listId}`, { method: "DELETE" });
    if (response.ok) {
      const newListState = userLists.filter((list) => list.id !== listId);
      setUserLists(newListState);
    } else {
      console.error("Error processing DELETE request");
    }
  }

  return (
    <div className="account-page">
      <h2>{currentUser.username}</h2>
      <h4>{currentUser.email}</h4>

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
      <button onClick={() => setEditing(!editing)}>
        {editing ? "Done" : "Edit"}
      </button>
    </div>
  );
}

export default AccountPage;
