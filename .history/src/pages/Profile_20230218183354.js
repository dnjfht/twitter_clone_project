import { authService, dbService } from "../firebase";
import React, { useEffect } from "react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";

export default function Profile({ userObj }) {
  // const Navigate = useNavigate();

  const onLogOutClick = () => {
    authService.signOut();
    // 로그아웃을 했는데 계속 profile page에 있음
    // Router.js에서 Navigate()를 사용해도 되고 Profile.js에서 useNavigate()를 사용해도 됨
    // Navigate("/"); or Navigate(-1); => 한 페이지 전으로 가기
  };

  const getMyNweets = async () => {
    // 프로필 화면이 지금 사용 중인 user가 누구인지 인식해야만 함.
    // 그래야 Nweets를 얻을 수 있음.
    // 그러기 위해서는 Router.js로 돌아가서 Profile.js에 userObj를 props로 전달.

    // 트윗 불러오기
    // dbService의 컬렉션 중 "nweets" Docs에서 userObj의 uid와 동일한 creatorID를 가진 모든 문서를
    // 내림차순으로 가져오는 쿼리(요청) 생성

    const nweets = query(
      collection(dbService, "nweets"),
      where("creatorId", "==", userObj.uid),
      orderBy("createdAt", "desc")
    );

    //  getDocs()메서드로 쿼리 결과 값 가져오기
    const querySnapshot = await getDocs(nweets);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  };

  // 지금 로그인 중인 user의 Nweets를 얻는 function을 호출할 거임.
  useEffect(() => {
    getMyNweets();
  }, []);

  return (
    <div>
      <button onClick={onLogOutClick}>Log Out</button>
    </div>
  );
}
