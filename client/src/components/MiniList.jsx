import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function MiniList() {
  const [featuredList, setFeaturedList] = useState({});

  useEffect(() => {
    getAndSetFeaturedList();
  }, []);

  async function getAndSetFeaturedList() {
    const response = await fetch("/featured-list");
    const data = await response.json();

    if (response.ok) {
      if (data) setFeaturedList(data);
    } else {
      data.errors.forEach((error) => toast(error));
    }
  }

  if (!featuredList.id) return <div>LOADING......</div>;

  return (
    <div className="mini-list">
      <Link to={`/lists/${featuredList.id}`}>
        <h4>{featuredList.title}</h4>
      </Link>
      {featuredList.items.map((item) => (
        <p key={item.id}>{item.name}</p>
      ))}
    </div>
  );
}

export default MiniList;
