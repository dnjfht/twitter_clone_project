import { authService, dbService } from "../firebase";
import React, { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
// import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import "./Profile.css";

const ProfileWrap = styled.div`
  width: 100%;
  height: calc(100vh - 240px);
  padding: 80px 0;
  box-sizing: border-box;
  background-color: black;

  color: white;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileInnerWrap = styled.div`
  width: 300px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ChangeNameFormWrap = styled.form`
  width: 100%;
  margin-top: 40px;
`;

const ChangeNameInputWrap = styled.div`
  width: 100%;
  height: 50px;
  background-color: black;
  border: 1px solid transparent;
  border-radius: 50px;
  background-image: linear-gradient(black, black),
    linear-gradient(
      to left,
      rgba(8, 160, 240, 0.5) 20%,
      rgba(255, 255, 255, 0.4) 70%
    );
  background-origin: border-box;
  background-clip: content-box, border-box;

  position: relative;
`;

const ChangeNameInput = styled.input`
  width: 100%;
  height: 50px;
  background-color: transparent;
  padding: 20px;
  box-sizing: border-box;
  border: none;

  outline: none;

  color: white;
  text-align: center;
  font-size: 14px;
`;

const ChangeNameSubmit = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 20px;
  background: rgb(8, 160, 240);
  background: linear-gradient(
    0deg,
    rgba(8, 160, 240, 0.8) 0%,
    rgba(82, 210, 202, 0.9) 100%
  );
  border: none;
  border-radius: 50px;

  outline: none;

  font-size: 14px;
  color: white;
`;

export default function Profile({ userObj, refreshUser }) {
  // const Navigate = useNavigate();

  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  const onLogOutClick = () => {
    authService.signOut();
    // ??????????????? ????????? ?????? profile page??? ??????
    // Router.js?????? Navigate()??? ???????????? ?????? Profile.js?????? useNavigate()??? ???????????? ???
    // Navigate("/"); or Navigate(-1); => ??? ????????? ????????? ??????
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    // const value = event.target.value;

    setNewDisplayName(value);
  };

  // displayName ????????????
  const onSubmit = async (event) => {
    event.preventDefault();

    if (userObj.displayName !== newDisplayName) {
      // ????????? ???????????? ?????? user??? ??????????????? ??????.
      await updateProfile(authService.currentUser, {
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };

  const getMyNweets = async () => {
    // ????????? ????????? ?????? ?????? ?????? user??? ???????????? ??????????????? ???.
    // ????????? Nweets??? ?????? ??? ??????.
    // ????????? ???????????? Router.js??? ???????????? Profile.js??? userObj??? props??? ??????.

    // ?????? ????????????
    // dbService??? ????????? ??? "nweets" Docs?????? userObj??? uid??? ????????? creatorID??? ?????? ?????? ?????????
    // ?????????????????? ???????????? ??????(??????) ??????

    const dbNweets = query(
      collection(dbService, "nweets"),
      where("creatorId", "==", `${userObj.uid}`),
      orderBy("createdAt", "desc")
    );

    // getDocs()???????????? ?????? ?????? ??? ????????????
    const querySnapshot = await getDocs(dbNweets);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  };

  // ?????? ????????? ?????? user??? Nweets??? ?????? function??? ????????? ??????.
  useEffect(() => {
    getMyNweets();
  }, []);

  return (
    <ProfileWrap>
      <ProfileInnerWrap>
        {/* ?????? ?????? */}
        <div className="box">
          <div className="wave -one"></div>
          <div className="wave -two"></div>
          <div className="wave -three"></div>
          <div className="title">USER</div>
        </div>

        <ChangeNameFormWrap onSubmit={onSubmit}>
          <ChangeNameInputWrap>
            <ChangeNameInput
              type="text"
              placeholder="Display name"
              value={newDisplayName}
              onChange={onChange}
            />
          </ChangeNameInputWrap>
          <ChangeNameSubmit type="submit" value="Update Profile" />
        </ChangeNameFormWrap>
        <button onClick={onLogOutClick}>Log Out</button>
      </ProfileInnerWrap>
    </ProfileWrap>
  );
}
