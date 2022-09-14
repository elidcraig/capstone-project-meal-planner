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
import ShoppingListPage from "./pages/ShoppingListPage";
import NewShoppingListForm from "./pages/NewShoppingListForm";
import MealPlanPage from "./pages/MealPlanPage";
import NewMealPlanForm from "./pages/NewMealPlanForm";
import NewMealForm from "./pages/NewMealForm";
import MealUpdateForm from "./pages/MealUpdateForm";
import toast, { Toaster, ToastBar } from "react-hot-toast";

function App() {
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);

  useEffect(() => {
    getAndSetCurrentUser();
    // eslint-disable-next-line
  }, []);

  async function getAndSetCurrentUser() {
    const response = await fetch("/me");
    const data = await response.json();
    if (response.ok && data !== null) {
      setCurrentUser(data);
    }
  }

  return (
    <div className="app">
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
        <Route path="/lists/:listId" element={<ShoppingListPage />} />
        <Route path="/lists/new" element={<NewShoppingListForm />} />
        <Route path="/plans/:planId" element={<MealPlanPage />} />
        <Route path="/plans/new" element={<NewMealPlanForm />} />
        <Route path="/meals/:mealId/edit" element={<MealUpdateForm />} />
        <Route path="/meals/new" element={<NewMealForm />} />
      </Routes>
      <Toaster position='bottom-center'>
        {(t) => (
          <ToastBar toast={t}>
            {({ icon, message }) => (
              <>
                {icon}
                {message}
                {<button className="close-toast-button" onClick={() => toast.dismiss(t.id)}>X</button>}
              </>
            )}
          </ToastBar>
        )}
      </Toaster>
    </div>
  );
}

export default App;
