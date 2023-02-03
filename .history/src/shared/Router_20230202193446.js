import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "../pages/Auth";
import Home from "../pages/Home";

export default function Router() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    // 우리가 render시킬 routes는 인증 (로그인) 여부에 따라 달라질 거임.
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="Auth" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
}
