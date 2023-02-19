import React, { useState } from "react";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { dbService, storageService } from "../firebase";
import { deleteObject, ref } from "firebase/storage";
import styled from "styled-components";

const NweetsWrap = styled.div`
  width: 100%;
  height: 200px;
  background-color: white;
  margin-bottom: 60px;
`;

export default function Nweet({ nweet, isOwner }) {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweet.text);
  // 수정하기 위한 useState
  // editing이 true일 때 게시글을 수정할 수 있는 input을 하나 생성하여
  // 기존의 text를 담아줌

  //삭제하려는 이미지 파일 가리키는 ref 생성하기
  // nweetObj의 attachmentUrl이 바로 삭제하려는 그 url임
  const desertRef = ref(storageService, nweet.attachmentUrl);

  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete?");
    // 확인을 누르면 ok의 값으로 true가 들어오고, 취소를 누르면 false가 들어옴

    const NweetTextRef = doc(dbService, "nweets", `${nweet.id}`);
    // 삭제 버튼을 누른 게시물만 삭제되게끔 nweet.id
    // Collection 안에 document를 얻어낸 후에 삭제가 가능하므로 nweet.id가 필요함
    // NweetTextRef 변수에 담아서 deleteDoc 함수에 넣어줌
    if (ok) {
      //delete nweet
      try {
        //해당하는 트윗 파이어스토어에서 삭제
        await deleteDoc(NweetTextRef);
        //삭제하려는 트윗에 이미지 파일이 있는 경우 이미지 파일 스토리지에서 삭제
        if (nweet.attachmentUrl !== "") {
          await deleteObject(desertRef);
        }
      } catch (error) {
        window.alert("트윗을 삭제하는 데 실패했습니다!");
      }
    } else {
    }
  };

  const toggleEditing = () => {
    setEditing((prev) => !prev);
    // 함수가 실행될 때마다 이전 값의 반대로 바뀜
  };

  console.log(newNweet);

  const onChangeText = (event) => {
    const {
      target: { value },
    } = event;

    setNewNweet(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    console.log(nweet, newNweet);

    const NweetTextRef = doc(dbService, "nweets", `${nweet.id}`);

    await updateDoc(NweetTextRef, {
      text: newNweet,
      // text: newNweet로 update 되게끔
    });

    setEditing(false);
  };

  return (
    <NweetsWrap>
      <p>{new Date(nweet.createAt).toLocaleDateString()}</p>
      <p style={{ fontSize: 18 }}>{nweet.creatorName}님의 글</p>
      {nweet.attachmentUrl && (
        <img src={nweet.attachmentUrl} width="100px" height="100px" />
      )}

      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              value={newNweet}
              required
              placeholder="Edit your nweet"
              onChange={onChangeText}
            />
            <input type="submit" value="Update Nweet" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h3>{nweet.text}</h3>
        </>
      )}

      {isOwner ? (
        <>
          <button onClick={onDeleteClick}>Delete Nweet</button>
          <button onClick={toggleEditing}>Edit Nweet</button>
        </>
      ) : (
        <></>
      )}
    </NweetsWrap>
  );
}
