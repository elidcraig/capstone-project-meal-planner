import React, { useState, useEffect } from "react";
import { useAtom } from "jotai";
import currentUserAtom from "../state/currentUserAtom";

function AccountPage() {
  const [currentUser] = useAtom(currentUserAtom);
  const [userLists, setUserLists] = useState([]);

  useEffect(() => {
    getAndSetLists();
  }, []);

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

      <h4>Your Lists</h4>
      <ul>
        {userLists.map((list) => (
          <li key={list.id}>{list.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default AccountPage;
