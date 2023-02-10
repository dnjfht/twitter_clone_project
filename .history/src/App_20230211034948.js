import { useEffect, useState } from "react";
import "./App.css";
import Router from "./shared/Router";
import { authService } from "./firebase";

function App() {
  const [init, setInit] = useState(false);
  // firebase가 프로그램을 초기화하길 기다려야 함.
  // 그런 다음 isLoggedIn이 바뀌도록 해야 함.
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // console.log(authService.currentUser);

  const [userObj, setUserObj] = useState(null);
  // user가 누구인지 알려주기 위하여

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <div>
      {init ? <Router isLoggedIn={isLoggedIn} /> : "Initializing..."}
      <footer>© {new Date().getFullYear()} Nwitter</footer>
    </div>
  );
}

export default App;
