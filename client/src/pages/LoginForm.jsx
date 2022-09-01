import React, { useState } from "react";

const formDefault = {
  username: "",
  password: "",
};

function LoginForm() {
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
      console.log(data);
      setFormData(formDefault);
    } else {
      console.log(data.errors);
    }
  }

  return (
    <form className="login-form" onSubmit={handleFormSubmit}>
      <label for="username">Username</label>
      <br />
      <input
        type="text"
        name="username"
        required
        value={formData.username}
        onChange={handleFormChange}
      />
      <br />
      <label for="password">Password</label>
      <br />
      <input
        type="password"
        name="password"
        required
        value={formData.password}
        onChange={handleFormChange}
      />
      <br />
      <input type="submit" />
    </form>
  );
}

export default LoginForm;
