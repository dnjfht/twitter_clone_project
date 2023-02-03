import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "pages/Auth";
import Home from "pages/Home";

export default function Router({ isLoggedIn }) {
  // 우리가 render시킬 routes는 인증 (로그인) 여부에 따라 달라질 거임.
  // 사용자가 로그인이 되어 있다면 home을 보여주고, 로그인이 되어있지 않다면 login page를 보여줌
  return (
    <BrowserRouter>
      <Routes>
        {isLoggedIn ? (
          <Route path="/" element={<Home />} />
        ) : (
          <Route path="/" element={<Auth />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}
