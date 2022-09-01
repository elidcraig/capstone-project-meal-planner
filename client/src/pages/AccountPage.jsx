import React from "react";
import { useAtom } from "jotai";
import currentUserAtom from "../state/currentUserAtom";

function AccountPage() {
  const [currentUser] = useAtom(currentUserAtom);

  return (
    <div className="account-page">
      <h2>{currentUser.username}</h2>
      <h4>{currentUser.email}</h4>
    </div>
  );
}

export default AccountPage;
