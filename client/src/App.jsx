import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useAtom } from "jotai";
import currentUserAtom from "./state/currentUserAtom";
import Banner from "./components/Banner";
import AuthLandingPage from "./pages/AuthLandingPage";
import UnauthLandingPage from "./pages/UnauthLandingPage";
import AccountPage from "./pages/AccountPage";
import LoginForm from "./pages/LoginForm";
import SignupForm from "./pages/SignupForm";

function App() {
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);

  useEffect(() => {
    getAndSetCurrentUser();
    // eslint-disable-next-line
  }, []);

  async function getAndSetCurrentUser() {
    const response = await fetch("/me");
    const data = await response.json();
    if (response.ok) {
      setCurrentUser(data);
    }
  }

  return (
    <div className="App">
      <Banner />
      <Routes>
        <Route
          exact
          path="/"
          element={currentUser.id ? <AuthLandingPage /> : <UnauthLandingPage />}
        />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/account" element={<AccountPage />} />
      </Routes>
    </div>
  );
}

export default App;
