import { useState } from "react";
import "App.css";
import Router from "shared/Router";
import { authService } from "./firebase";

function App() {
  const authService = firebase.authService();
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  console.log(authService.currentUser);
  return (
    <div>
      <Router isLoggedIn={isLoggedIn} />
      <div>© {new Date().getFullYear()} Nwitter</div>
    </div>
  );
}

export default App;
