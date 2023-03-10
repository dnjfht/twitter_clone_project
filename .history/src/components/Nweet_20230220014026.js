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
  padding: 0;
  font-size: 18px;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.7);
  background-size: 101% 100%;
  background-position: left 0px bottom -40px;
  background-repeat: repeat-x;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  background-clip: text;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 90 240 300' preserveAspectRatio='none'%3E%3Crect x='0' y='0' width='500' height='800' style='stroke: none; fill: rgb(255,255,255);' /%3E%3Cpath d='M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z' style='stroke: none;'%3E%3C/path%3E%3C/svg%3E");
  animation: wave 2s infinite both linear;
  @keyframes wave {
    0% {
      background-position: left 0px bottom -80px;
    }
    100% {
      background-position: left 1500px bottom 20px;
    }
  }
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
  padding: 16px;
  margin-top: 30px;
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

  font-size: 14px;
  color: white;
`;

const ModifyCancelButton = styled.button`
  width: 100%;
  padding: 16px;
  margin-top: 10px;
  box-sizing: border-box;
  background: rgb(222, 52, 84);
  background: linear-gradient(
    0deg,
    rgba(222, 52, 84, 1) 0%,
    rgba(255, 168, 76, 0.7) 100%
  );
  border: none;
  border-radius: 50px;

  outline: none;

  font-size: 14px;
  color: white;
`;

export default function Nweet({ nweet, isOwner }) {
  const [over, setOver] = useState(false);
  const [over2, setOver2] = useState(false);

  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweet.text);
  // ???????????? ?????? useState
  // editing??? true??? ??? ???????????? ????????? ??? ?????? input??? ?????? ????????????
  // ????????? text??? ?????????

  //??????????????? ????????? ?????? ???????????? ref ????????????
  // nweetObj??? attachmentUrl??? ?????? ??????????????? ??? url???
  const desertRef = ref(storageService, nweet.attachmentUrl);

  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete?");
    // ????????? ????????? ok??? ????????? true??? ????????????, ????????? ????????? false??? ?????????

    const NweetTextRef = doc(dbService, "nweets", `${nweet.id}`);
    // ?????? ????????? ?????? ???????????? ??????????????? nweet.id
    // Collection ?????? document??? ????????? ?????? ????????? ??????????????? nweet.id??? ?????????
    // NweetTextRef ????????? ????????? deleteDoc ????????? ?????????
    if (ok) {
      //delete nweet
      try {
        //???????????? ?????? ???????????????????????? ??????
        await deleteDoc(NweetTextRef);
        //??????????????? ????????? ????????? ????????? ?????? ?????? ????????? ?????? ?????????????????? ??????
        if (nweet.attachmentUrl !== "") {
          await deleteObject(desertRef);
        }
      } catch (error) {
        window.alert("????????? ???????????? ??? ??????????????????!");
      }
    } else {
    }
  };

  const toggleEditing = () => {
    setEditing((prev) => !prev);
    // ????????? ????????? ????????? ?????? ?????? ????????? ??????
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
      // text: newNweet??? update ?????????
    });

    setEditing(false);
  };

  return (
    <NweetsWrap>
      <NweetTopWrap>
        <NweetTopLeft>
          <Editor>{nweet.creatorName}?????? ???</Editor>

          <p style={{ color: "rgba(0,0,0,0.5)", marginRight: 10 }}>??</p>
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
              <ModifyCancelButton onClick={toggleEditing}>
                Cancel
              </ModifyCancelButton>
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
