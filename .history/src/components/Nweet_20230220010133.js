import React, { useState } from "react";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { dbService, storageService } from "../firebase";
import { deleteObject, ref } from "firebase/storage";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";

const NweetsWrap = styled.div`
  width: 100%;
  height: auto;
  padding: 20px;
  box-sizing: border-box;
  margin-bottom: 50px;
  background-color: white;
  border-radius: 10px;

  position: relative;
`;

const NweetTopWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const NweetTopLeft = styled.div`
  display: flex;
  align-items: center;
`;

const NweetTopRight = styled.div`
  display: flex;
  align-items: center;
`;

const Editor = styled.p`
  margin-right: 10px;

  color: rgba(0, 0, 0, 0.7);
  font-weight: 600;
  font-size: 17px;
`;

const PostDate = styled.p`
  color: rgba(0, 0, 0, 0.5);
`;

const NweetBottomWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PostLetter = styled.h3`
  color: rgba(0, 0, 0, 0.8);
`;

const PostImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50px;

  position: absolute;
  bottom: -40px;
  right: -40px;

  z-index: 99999;
`;

const DeleteNweetButton = styled.button`
  border: none;
  background-color: transparent;
`;

const EditNweetButton = styled.button`
  margin-left: 20px;

  border: none;
  background-color: transparent;
`;

const ModifyForm = styled.form`
  width: 100%;
  margin-top: 20px;
`;

const ModifyInputWrap = styled.div`
  width: 100%;
  height: 70px;

  border: 1px solid transparent;
  border-radius: 50px;
  background-image: linear-gradient(white, white),
    linear-gradient(
      to left,
      rgba(8, 160, 240, 1) 20%,
      rgba(82, 210, 202, 0.8) 70%
    );
  background-origin: border-box;
  background-clip: content-box, border-box;

  position: relative;
`;

const ModifyInput = styled.input`
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  background-color: transparent;

  border: none;

  outline: none;

  font-size: 16px;
`;

const ModifySubmitInput = styled.input`
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  background: rgb(8, 160, 240);
  background: linear-gradient(
    0deg,
    rgba(8, 160, 240, 0.8) 0%,
    rgba(82, 210, 202, 0.8) 100%
  );
  border: none;
  border-radius: 50px;

  outline: none;
`;

export default function Nweet({ nweet, isOwner }) {
  const [over, setOver] = useState(false);
  const [over2, setOver2] = useState(false);

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
      <NweetTopWrap>
        <NweetTopLeft>
          <Editor>{nweet.creatorName}님의 글</Editor>
          <p style={{ color: "rgba(0,0,0,0.5)", marginRight: 10 }}>·</p>
          <PostDate>{new Date(nweet.createAt).toLocaleDateString()}</PostDate>
        </NweetTopLeft>

        <NweetTopRight>
          {isOwner ? (
            <>
              <DeleteNweetButton
                onClick={onDeleteClick}
                onMouseOver={() => setOver2(true)}
                onMouseLeave={() => setOver2(false)}
              >
                <FontAwesomeIcon
                  icon={faTrash}
                  style={
                    over2
                      ? { color: "rgb(8, 160, 240)", fontSize: 17 }
                      : { color: "rgba(0,0,0,0.8)", fontSize: 17 }
                  }
                />
              </DeleteNweetButton>
              <EditNweetButton
                onClick={toggleEditing}
                onMouseOver={() => setOver(true)}
                onMouseLeave={() => setOver(false)}
              >
                <FontAwesomeIcon
                  icon={faPen}
                  style={
                    over
                      ? { color: "rgb(8, 160, 240)", fontSize: 17 }
                      : { color: "rgba(0,0,0,0.8)", fontSize: 17 }
                  }
                />
              </EditNweetButton>
            </>
          ) : (
            <></>
          )}
        </NweetTopRight>
      </NweetTopWrap>

      <NweetBottomWrap>
        {editing ? (
          <>
            <ModifyForm onSubmit={onSubmit}>
              <ModifyInputWrap>
                <ModifyInput
                  type="text"
                  value={newNweet}
                  required
                  placeholder="Edit your nweet"
                  onChange={onChangeText}
                />
              </ModifyInputWrap>
              <ModifySubmitInput type="submit" value="Update Nweet" />
              <button onClick={toggleEditing}>Cancel</button>
            </ModifyForm>
          </>
        ) : (
          <>
            <PostLetter>{nweet.text}</PostLetter>
          </>
        )}

        {nweet.attachmentUrl && <PostImg src={nweet.attachmentUrl} />}
      </NweetBottomWrap>
    </NweetsWrap>
  );
}
