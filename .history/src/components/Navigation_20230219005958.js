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
  width: 50%;
  height: 100%;
  margin: 0 auto;
  padding: 0;

  list-style: none;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LiWrap = styled.li``;

const HomeIconText = styled.text`
  font-size: 14px;

  opacity: 0;
`;

const ProfileIconText = styled.text`
  font-size: 14px;
`;

export default function Navigation({ userObj }) {
  return (
    <NaviWrap>
      <UlWrap>
        <LiWrap>
          <Link
            to="/"
            style={{
              color: "white",
              textDecoration: "none",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <FontAwesomeIcon
              icon={faTwitter}
              style={{ color: "08a0f0", fontSize: 34 }}
            />
            <HomeIconText>Home</HomeIconText>
          </Link>
        </LiWrap>
        <LiWrap>
          <Link
            to="/profile"
            style={{
              color: "white",
              textDecoration: "none",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <FontAwesomeIcon
              icon={faTwitter}
              style={{ color: "08a0f0", fontSize: 34 }}
            />
            <ProfileIconText>{userObj.displayName}의 Profile</ProfileIconText>
          </Link>
        </LiWrap>
      </UlWrap>
    </NaviWrap>
  );
}
