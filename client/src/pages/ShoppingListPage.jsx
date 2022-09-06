import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ShoppingListPage() {
  let { listId } = useParams();

  const [shoppingList, setShoppingList] = useState({});

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

  if (!shoppingList.id) return <h4>LOADING...</h4>;

  return (
    <div className="shopping-list-page">
      <h2>{shoppingList.title}</h2>
      <ul>
        {shoppingList.items.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingListPage;
