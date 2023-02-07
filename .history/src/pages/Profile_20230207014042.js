import { authService } from "../firebase";
import React from "react";

export default function Profile() {
  const onLogOutClick = () => {
    authService.signOut();
  };
  return (
    <div>
      <button onClick={onLogOutClick}>Log Out</button>
    </div>
  );
}
