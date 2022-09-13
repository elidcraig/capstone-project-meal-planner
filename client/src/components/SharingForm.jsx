import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAtom } from "jotai";
import currentUserAtom from "../state/currentUserAtom";

function SharingForm() {
  let { planId } = useParams();
  const [currentUser] = useAtom(currentUserAtom);
  const [sharing, setSharing] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedUserId, setSelectedUserId] = useState();

  useEffect(() => {
    if (sharing) getAndSetUsers();
  }, [sharing]);

  async function getAndSetUsers() {
    const response = await fetch("/users");
    const data = await response.json();
    if (response.ok) {
      setAllUsers(data);
    } else {
      console.log(data.errors);
    }
  }

  async function handleAddFollow() {
    const config = { plan_id: planId, user_id: selectedUserId };
    const response = await fetch("/plan_follows", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(config),
    });
    const data = await response.json();
    if (response.ok) {
      setSharing(false);
    } else console.log(data.errors);
  }

  function handleSelectChange(e) {
    let userId = parseInt(e.target.value);
    setSelectedUserId(userId);
  }

  function handleCloseSearch() {
    setSharing(false);
    setSearchInput("");
  }

  const filteredUsers = allUsers.filter(
    (user) => user.username.includes(searchInput) && user.id !== currentUser.id
  );

  return (
    <div>
      {sharing ? (
        <>
          <input
            type="text"
            placeholder="Search by username..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <select name="users" onChange={handleSelectChange}>
            <option selected disabled hidden>
              ----
            </option>
            {filteredUsers.map((user) => (
              <option value={user.id}>{user.username}</option>
            ))}
          </select>
          <button onClick={handleAddFollow}>Confirm</button>
          <button onClick={handleCloseSearch}>Cancel</button>
        </>
      ) : (
        <button onClick={() => setSharing(true)}>Share</button>
      )}
    </div>
  );
}

export default SharingForm;
