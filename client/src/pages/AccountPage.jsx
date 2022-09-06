import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import currentUserAtom from "../state/currentUserAtom";

function AccountPage() {
  const [currentUser] = useAtom(currentUserAtom);
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

  return (
    <div className="account-page">
      <h2>{currentUser.username}</h2>
      <h4>{currentUser.email}</h4>

      <h4>YourPlans</h4>
      <ul>
        {userPlans.map((plan) => (
          <li key={plan.id}>
            <Link to={`/plans/${plan.id}`}>{plan.name}</Link>
          </li>
        ))}
      </ul>

      <h4>Your Lists</h4>
      <ul>
        {userLists.map((list) => (
          <li key={list.id}>
            <Link to={`/lists/${list.id}`}>{list.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AccountPage;
