import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NaviWrap = styled.nav`
  width: 100%;
  height: 100px;
  background-color: black;

  color: white;
`;

export default function Navigation({ userObj }) {
  return (
    <NaviWrap>
      <ul>
        <li>
          <Link to="/" style={{ color: "white" }}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/profile">{userObj.displayName}의 Profile</Link>
        </li>
      </ul>
    </NaviWrap>
  );
}
