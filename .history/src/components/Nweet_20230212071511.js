import React from "react";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { dbService } from "../firebase";

export default function Nweet({ nweet, isOwner }) {
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete?");
    // 확인을 누르면 ok의 값으로 true가 들어오고, 취소를 누르면 false가 들어옴
    console.log(ok);

    const NweetTextRef = doc(dbService, "nweets", `${nweet.id}`);
    // 삭제 버튼을 누른 게시물만 삭제되게끔 nweet.id
    // NweetTextRef 변수에 담아서 deleteDoc 함수에 넣어줌
    if (ok) {
      //delete nweet
      await deleteDoc(NweetTextRef);
    } else {
    }
  };

  return (
    <div>
      <p>{new Date(nweet.createAt).toLocaleDateString()}</p>
      <p style={{ fontSize: 18 }}>{nweet.creatorId}</p>
      <p style={{ fontSize: 18 }}>{nweet.creatorName}</p>
      <h3>{nweet.text}</h3>
      {isOwner ? (
        <>
          <button onClick={onDeleteClick}>Delete Nweet</button>
          <button>Edit Nweet</button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
