import React, { useState } from "react";
import { useAtom } from "jotai";
import currentUserAtom from "../state/currentUserAtom";
import toast from "react-hot-toast";

function NewItemInput({ setNewItemInState, listId }) {
  const [currentUser] = useAtom(currentUserAtom);
  const [input, setInput] = useState("");

  async function handleAddNewItem(e) {
    e.preventDefault();

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
      data.errors.forEach((error) => toast(error));
    }
  }

  return (
    <form className="new-item-form" onSubmit={handleAddNewItem}>
      <input
        className="form-input"
        type="text"
        value={input}
        placeholder="Add a new item..."
        onChange={(e) => setInput(e.target.value)}
      />
      <input type="submit" className="button" />
    </form>
  );
}

export default NewItemInput;
