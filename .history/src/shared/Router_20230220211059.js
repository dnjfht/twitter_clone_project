import Navigation from "components/Navigation";
import Profile from "pages/Profile";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Auth from "../pages/Auth";
import Home from "../pages/Home";
import styled from "styled-components";

const RouterWrap = styled.div`
  width: 100%;
  background-color: black;
`;

export default function Router({ isLoggedIn, userObj, refreshUser }) {
  // 우리가 render시킬 routes는 인증 (로그인) 여부에 따라 달라질 거임.
  // 사용자가 로그인이 되어 있다면 home을 보여주고, 로그인이 되어있지 않다면 login page를 보여줌

  // 로그아웃을 했는데 계속 profile page에 있음
  // redirect 컴포넌트는 렌더링되면 to의 지정된 경로로 이동.
  // ex : <Route path="/redirect" element={<Redirect to="/" />} />
  // 하지만 React의 향후 버전과의 호환성 문제로 인해 redirect를 더 이상 지원하지 않음.
  // router verson6으로 업데이트 되면서 redirect를 Navigate로 대신하게 되었음.
  // ex : <Route path="*" element={<Navigate replace to="/" />} /> => 모든 route가 다 "/"로 재이동하는 것

  return (
    <RouterWrap>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        {isLoggedIn && <Navigation userObj={userObj} />}
        <Routes>
          {isLoggedIn ? (
            <>
              <Route path="/" element={<Home userObj={userObj} />} />
              <Route
                path="/profile"
                element={
                  <Profile userObj={userObj} refreshUser={refreshUser} />
                }
              />
            </>
          ) : (
            <>
              <Route path="/" element={<Auth />} />
              <Route path="*" element={<Navigate replace to="/" />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </RouterWrap>
  );
}
