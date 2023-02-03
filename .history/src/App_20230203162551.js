import { useState } from "react";
import "./App.css";
import Router from "./shared/Router";
import { authService } from "./firebase";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  return <Router isLoggedIn={isLoggedIn} />;
}

export default App;
