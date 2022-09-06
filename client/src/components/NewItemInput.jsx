import React, { useState } from "react";
import { useAtom } from "jotai";
import currentUserAtom from "../state/currentUserAtom";

function NewItemInput({ setNewItemInState, listId }) {
  const [currentUser] = useAtom(currentUserAtom);
  const [input, setInput] = useState("");

  async function handleAddNewItem() {
    const config = {
      user_id: currentUser.id,
      list_id: listId,
      name: input,
    };

    const response = await fetch("/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(config),
    });
    const data = await response.json();

    if (response.ok) {
      setNewItemInState(data);
      setInput("");
    } else {
      console.log(data.errors);
    }
  }

  return (
    <>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleAddNewItem}>Add</button>
    </>
  );
}

export default NewItemInput;
