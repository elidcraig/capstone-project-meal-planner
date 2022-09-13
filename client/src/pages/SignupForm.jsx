import React, { useState } from "react";
import { useAtom } from "jotai";
import currentUserAtom from "../state/currentUserAtom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const formDefault = {
  username: "",
  email: "",
  password: "",
  passwordConfirm: "",
};

function SignupForm() {
  const navigate = useNavigate();

  const [, setCurrentUser] = useAtom(currentUserAtom);
  const [formData, setFormData] = useState(formDefault);

  function handleFormChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleFormSubmit(e) {
    e.preventDefault();

    const config = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      password_confirmation: formData.passwordConfirm,
    };

    const response = await fetch("/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(config),
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
    <form className="signup-form" onSubmit={handleFormSubmit}>
      <label htmlFor="username">Username</label>
      <br />
      <input
        type="text"
        name="username"
        required
        value={formData.username}
        onChange={handleFormChange}
      />
      <br />
      <label htmlFor="email">Email</label>
      <br />
      <input
        type="text"
        name="email"
        required
        value={formData.email}
        onChange={handleFormChange}
      />
      <br />
      <label htmlFor="password">Password</label>
      <br />
      <input
        type="password"
        name="password"
        required
        value={formData.password}
        onChange={handleFormChange}
      />
      <br />
      <label htmlFor="passwordConfirm">Confirm Password</label>
      <br />
      <input
        type="password"
        name="passwordConfirm"
        required
        value={formData.passwordConfirm}
        onChange={handleFormChange}
      />
      <br />
      <input type="submit" className="button" />
    </form>
  );
}

export default SignupForm;
