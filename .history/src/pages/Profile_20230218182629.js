import { authService, dbService } from "../firebase";
import React, { useEffect } from "react";
import { collection, orderBy, query } from "firebase/firestore";
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

    const nweets = query(
      collection(dbService, "nweets"),
      orderBy("createAt", "desc") // 시간 순으로 작성하기 위한 것
    );
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
