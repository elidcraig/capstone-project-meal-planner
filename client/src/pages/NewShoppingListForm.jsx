import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import currentUserAtom from "../state/currentUserAtom";

function NewShoppingListForm() {
  const navigate = useNavigate();

  const [currentUser] = useAtom(currentUserAtom);
  const [input, setInput] = useState("");

  async function handleCreateNewList(e) {
    e.preventDefault()

    const config = {
      title: input,
      user_id: currentUser.id,
    };

    const response = await fetch("/lists", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(config),
    });
    const data = await response.json();

    if (response.ok) {
      setInput("");
      navigate(`/lists/${data.id}`);
    } else {
      console.log(data.errors);
    }
  }

  return (
    <form className="new-shopping-list-form" onSubmit={handleCreateNewList}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <input type="submit" className="button" value="Create List" />
    </form>
  );
}

export default NewShoppingListForm;
