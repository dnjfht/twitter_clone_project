import { useState } from "react";
import "./App.css";
import Router from "./shared/Router";
import firebase from "./firebase";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return <Router isLoggedIn={isLoggedIn} />;
}

export default App;
