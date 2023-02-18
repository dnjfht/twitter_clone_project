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
        setUserObj(user);
        if (user.displayName === null) {
          const name = user.email.split("@")[0];
          user.displayName = name;
        }
        // 로그인을 하면 onAuthStateChanged 함수가 실행되고 로그인한 user를 받게 됨.
        // user를 어딘가에 저장하고 필요할 때 쓸 수 있음.
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  console.log(userObj);
  return (
    <div>
      {init ? (
        <Router isLoggedIn={isLoggedIn} userObj={userObj} />
      ) : (
        "Initializing..."
      )}
      <footer>© {new Date().getFullYear()} Nwitter</footer>
    </div>
  );
}

export default App;
