import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

const NaviWrap = styled.nav`
  width: 100%;
  height: 100px;
  background-color: black;

  color: white;
`;

const UlWrap = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

export default function Navigation({ userObj }) {
  return (
    <NaviWrap>
      <ul>
        <li>
          <Link to="/" style={{ color: "white" }}>
            <FontAwesomeIcon
              icon={faTwitter}
              style={{ color: "08a0f0", fontSize: 40 }}
            />
          </Link>
        </li>
        <li>
          <Link to="/profile">{userObj.displayName}의 Profile</Link>
        </li>
      </ul>
    </NaviWrap>
  );
}
