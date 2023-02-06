import { useState } from "react";
import "./App.css";
import Router from "./shared/Router";
import { authService } from "./firebase";

function App() {
  const [init, setInit] = useState(false);
  // firebase가 프로그램을 초기화하길 기다려야 함.
  // 그런 다음 isLoggedIn이 바뀌도록 해야 함.
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
