import { useState } from "react";
import "./App.css";
import Router from "./shared/Router";
import { authService } from "./firebase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  console.log(authService.currentUser);
  setInterval(() => {
    console.log(authService.currentUser);
  }, 2000);
  return (
    <div>
      <Router isLoggedIn={isLoggedIn} />
      <div>© {new Date().getFullYear()} Nwitter</div>
    </div>
  );
}

export default App;
