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
  width: 100%;
  height: 100%;

  margin: 0;
  padding: 0;
  list-style: none;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const HomeIconText = styled.text`
  font-size: 14px;

  position:absolute !important;  
 width:1px; 
 height:1px; 
 overflow:hidden;
 clip:rect(1px 1px 1px 1px); /* IE6, IE7 */
 clip:rect(1px, 1px, 1px, 1px);}
`;

const ProfileIconText = styled.text`
  font-size: 14px;
`;

export default function Navigation({ userObj }) {
  return (
    <NaviWrap>
      <UlWrap>
        <li>
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
            <FontAwesomeIcon
              icon={faTwitter}
              style={{ color: "08a0f0", fontSize: 34 }}
            />
            <HomeIconText>Home</HomeIconText>
          </Link>
        </li>
        <li>
          <Link
            to="/profile"
            style={{ color: "white", textDecoration: "none" }}
          >
            <FontAwesomeIcon
              icon={faTwitter}
              style={{ color: "08a0f0", fontSize: 34 }}
            />
            <ProfileIconText>{userObj.displayName}의 Profile</ProfileIconText>
          </Link>
        </li>
      </UlWrap>
    </NaviWrap>
  );
}
