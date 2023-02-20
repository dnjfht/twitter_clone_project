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
`;

const ChangeNameInput = styled.input`
  width: 100%;
`;

export default function Profile({ userObj, refreshUser }) {
  // const Navigate = useNavigate();

  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  const onLogOutClick = () => {
    authService.signOut();
    // 로그아웃을 했는데 계속 profile page에 있음
    // Router.js에서 Navigate()를 사용해도 되고 Profile.js에서 useNavigate()를 사용해도 됨
    // Navigate("/"); or Navigate(-1); => 한 페이지 전으로 가기
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    // const value = event.target.value;

    setNewDisplayName(value);
  };

  // displayName 업데이트
  const onSubmit = async (event) => {
    event.preventDefault();

    if (userObj.displayName !== newDisplayName) {
      // 조건에 들어맞을 때만 user를 업데이트할 거임.
      await updateProfile(authService.currentUser, {
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };

  const getMyNweets = async () => {
    // 프로필 화면이 지금 사용 중인 user가 누구인지 인식해야만 함.
    // 그래야 Nweets를 얻을 수 있음.
    // 그러기 위해서는 Router.js로 돌아가서 Profile.js에 userObj를 props로 전달.

    // 트윗 불러오기
    // dbService의 컬렉션 중 "nweets" Docs에서 userObj의 uid와 동일한 creatorID를 가진 모든 문서를
    // 내림차순으로 가져오는 쿼리(요청) 생성

    const dbNweets = query(
      collection(dbService, "nweets"),
      where("creatorId", "==", `${userObj.uid}`),
      orderBy("createdAt", "desc")
    );

    // getDocs()메서드로 쿼리 결과 값 가져오기
    const querySnapshot = await getDocs(dbNweets);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  };

  // 지금 로그인 중인 user의 Nweets를 얻는 function을 호출할 거임.
  useEffect(() => {
    getMyNweets();
  }, []);

  return (
    <ProfileWrap>
      <ProfileInnerWrap>
        {/* 파도 효과 */}
        <div className="box">
          <div className="wave -one"></div>
          <div className="wave -two"></div>
          <div className="wave -three"></div>
          <div className="title">USER</div>
        </div>

        <ChangeNameFormWrap onSubmit={onSubmit}>
          <ChangeNameInput
            type="text"
            placeholder="Display name"
            value={newDisplayName}
            onChange={onChange}
          />
          <input type="submit" value="Update Profile" />
        </ChangeNameFormWrap>
        <button onClick={onLogOutClick}>Log Out</button>
      </ProfileInnerWrap>
    </ProfileWrap>
  );
}
