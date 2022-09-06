import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NewItemInput from "../components/NewItemInput";

function ShoppingListPage() {
  let { listId } = useParams();

  const [shoppingList, setShoppingList] = useState({});
  const { title, items } = shoppingList;

  const [targetTextContent, setTargetTextContent] = useState();
  const [targetId, setTargetId] = useState();

  useEffect(() => {
    getAndSetShoppingList();
    // eslint-disable-next-line
  }, []);

  async function getAndSetShoppingList() {
    const response = await fetch(`/lists/${listId}`);
    const data = await response.json();

    if (response.ok) {
      setShoppingList(data);
    } else {
      console.log(data.errors);
    }
  }

  async function updateItemOnBlur() {
    const response = await fetch(`/items/${targetId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: targetTextContent }),
    });
    const data = await response.json();

    if (response.ok) {
      let newItems = items.map((item) => {
        if (item.id === data.id) return data;
        else return item;
      });
      setShoppingList({ ...shoppingList, items: newItems });
    } else {
      console.log(data.errors);
    }
  }

  // async function handleDeleteItem() {
  //   const response = await fetch()
  //   const data = await response.json()
  // }

  function handleNewItem(newItem) {
    const newItemsArray = [...items, newItem];
    setShoppingList({ ...shoppingList, items: newItemsArray });
  }

  if (!shoppingList.id) return <h4>LOADING...</h4>;

  return (
    <div className="shopping-list-page">
      <h2>{title}</h2>
      <ul>
        {items.map((item) => (
          <li
            key={item.id}
            id={item.id}
            contentEditable="true"
            onInput={(e) => setTargetTextContent(e.currentTarget.textContent)}
            onClick={(e) => setTargetId(e.currentTarget.id)}
            onBlur={updateItemOnBlur}
          >
            {item.name}
          </li>
        ))}
      </ul>
      <NewItemInput setNewItemInState={handleNewItem} listId={listId} />
    </div>
  );
}

export default ShoppingListPage;
