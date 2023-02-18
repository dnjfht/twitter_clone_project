import { authService } from "../firebase";
import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

export default function Profile() {
  // const Navigate = useNavigate();

  const onLogOutClick = () => {
    authService.signOut();
    // 로그아웃을 했는데 계속 profile page에 있음
    // Router.js에서 Navigate()를 사용해도 되고 Profile.js에서 useNavigate()를 사용해도 됨
    // Navigate("/"); or Navigate(-1); => 한 페이지 전으로 가기
  };

  // 지금 로그인 중인 user의 Nweets를 얻는 function을 호출할 거임.
  useEffect(() => {}, []);

  return (
    <div>
      <button onClick={onLogOutClick}>Log Out</button>
    </div>
  );
}
