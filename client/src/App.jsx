import React from "react";
import { Routes, Route } from "react-router-dom";
import Banner from "./components/Banner";
import AccountPage from "./pages/AccountPage";
import LoginForm from "./pages/LoginForm";
import SignupForm from "./pages/SignupForm";

function App() {

  return (
    <div className="App">
      <Banner />
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/account" element={<AccountPage/>} />
      </Routes>
    </div>
  );
}

export default App;
