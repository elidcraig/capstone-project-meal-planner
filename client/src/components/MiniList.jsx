import React, { useState, useEffect } from "react";
// import { useAtom } from 'jotai';
// import currentUserAtom from '../state/currentUserAtom';

function MiniList() {
  // const [currentUser] = useAtom(currentUserAtom)

  const [featuredList, setFeaturedList] = useState({});

  useEffect(() => {
    getAndSetFeaturedList();
  }, []);

  async function getAndSetFeaturedList() {
    const response = await fetch("/featured-list");
    const data = await response.json();

    if (response.ok) {
      setFeaturedList(data);
    } else {
      console.log(data.errors);
    }
  }

  if (!featuredList.id) return <div>LOADING......</div>;

  return (
    <div className="mini-list">
      <h4>{featuredList.title}</h4>
      {featuredList.items.map((item) => (
        <p key={item.id}>{item.name}</p>
      ))}
    </div>
  );
}

export default MiniList;
