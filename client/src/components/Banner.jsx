import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import currentUserAtom from "../state/currentUserAtom";
import bannerLogo from "../SERVE.png";
import toast from "react-hot-toast";

function Banner() {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);

  async function handleLogout() {
    const response = await fetch("/logout", {
      method: "DELETE",
    });
    if (response.ok) {
      setCurrentUser({});
      navigate("/login");
    } else {
      const data = await response.json();
      data.errors.forEach((error) => toast(error));
    }
  }

  return (
    <div className="banner">
      <Link to="/">
        <img className="banner-logo" alt="Serve logo" src={bannerLogo} />
      </Link>
      <div className="banner-button-group">
        {currentUser.id ? (
          <>
            <Link to="/lists/new">New List</Link>
            <Link to="/plans/new">New Meal Plan</Link>
            <Link to="/meals/new">New Meal</Link>
            <Link to="/account">Account</Link>
            <span className="logout" onClick={handleLogout}>
              Log out
            </span>
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
