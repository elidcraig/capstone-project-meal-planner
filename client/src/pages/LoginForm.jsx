import React, { useState } from "react";
import { useAtom } from "jotai";
import currentUserAtom from "../state/currentUserAtom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const formDefault = {
  username: "",
  password: "",
};

function LoginForm() {
  const navigate = useNavigate();

  const [, setCurrentUser] = useAtom(currentUserAtom);
  const [formData, setFormData] = useState(formDefault);

  function handleFormChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleFormSubmit(e) {
    e.preventDefault();

    const response = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await response.json();

    if (response.ok) {
      setFormData(formDefault);
      setCurrentUser(data);
      navigate("/");
    } else {
      data.errors.forEach((error) => toast(error));
    }
  }

  return (
    <form className="login-form" onSubmit={handleFormSubmit}>
      <label className="form-input" htmlFor="username">
        Username
      </label>
      <br />
      <input
        className="form-input"
        type="text"
        name="username"
        required
        value={formData.username}
        onChange={handleFormChange}
      />
      <br />
      <label className="form-input" htmlFor="password">
        Password
      </label>
      <br />
      <input
        className="form-input"
        type="password"
        name="password"
        required
        value={formData.password}
        onChange={handleFormChange}
      />
      <br />
      <input type="submit" className="button" />
    </form>
  );
}

export default LoginForm;
