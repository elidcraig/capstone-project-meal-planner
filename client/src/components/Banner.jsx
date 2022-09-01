import React from "react";
import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import currentUserAtom from "../state/currentUserAtom";

function Banner() {
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
  console.log(currentUser);

  async function handleLogout() {
    const response = await fetch("/logout", {
      method: "DELETE",
    });
    if (response.ok) {
      setCurrentUser({});
    }
  }

  return (
    <div className="banner">
      <Link to="/">
        <div className="banner-logo">MEAL PLANNER</div>
      </Link>
      <div className="banner-button-group">
        {currentUser.id ? (
          <>
            <Link to="/account">Account</Link>
            <span onClick={handleLogout}>Log out</span>
          </>
        ) : (
          <>
            <Link to="/login">Log in</Link>
            <Link to="/signup">Sign up</Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Banner;
