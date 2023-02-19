import Nweet from "components/Nweet";
import {
  addDoc,
  collection,
  //getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import React, { useEffect, useRef, useState } from "react";
import { dbService } from "../firebase";
import { storageService } from "../firebase";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const HomeWrap = styled.div`
  width: 100%;
  height: calc(100vh - 240px);
  padding: 80px 0;
  box-sizing: border-box;
  background-color: black;

  overflow-x: hidden;
  overflow-y: auto;

  color: white;

  display: flex;
  flex-direction: column;
  align-items: center;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const HomeInnerWrap = styled.div`
  width: 500px;
`;

const FormWrap = styled.form`
  margin-bottom: 40px;
`;

const TextInputWrap = styled.div`
  width: 100%;
  height: 70px;

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
`;

const TextInput = styled.input`
  width: 100%;
  height: 70px;
  padding: 20px;
  box-sizing: border-box;
  background-color: transparent;

  border: none;

  outline: none;

  color: white;
`;

const SubmitButton = styled.button`
  width: 80px;
  height: 80px;
  border-radius: 50px;
  background-color: #08a0f0;

  text-indent: -999999px;

  position: relative;
  top: -76px;
  right: -170px;
`;

const AddPhotoSpan = styled.span`
  color: #08a0f0;
`;

const AddPhotoLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function Home({ userObj }) {
  console.log(userObj);

  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  const [attachment, setAttachment] = useState("");
  // 우리가 가진 이미지 파일의 URL
  //사진 첨부 없이 텍스트만 트윗하고 싶을 때도 있으므로 기본 값을 ""로 해야한다.
  //트윗할 때 텍스트만 입력시 이미지 url ""로 비워두기 위함

  // const getNweets = async () => {
  //   const dbNweets = query(
  //     collection(dbService, "nweets"),
  //     orderBy("createAt", "desc") // 시간 순으로 작성하기 위한 것
  //   );
  //   console.log(dbNweets);
  //   const querySnapshot = await getDocs(dbNweets);
  //   // querySnapshot에 모든 Document들을 가져와서 담아줌.
  //   querySnapshot.forEach((doc) => {
  //     // doc는 각각의 Document.
  //     //console.log(doc.data());
  //     //console.log(doc.id);

  //     const nweetObj = {
  //       ...doc.data(),
  //       // 모든 doc.data()를 가지고
  //       id: doc.id,
  //       // doc.id에서 id를 가져와 nweetObj에 담아줄 거임.
  //     };
  //     setNweets((prev) => [nweetObj, ...prev]);
  //     // 모든 이전 nweets에 대해 배열을 리턴.
  //   });
  // };

  // useEffect(() => {
  //   getNweets();
  // }, []);

  useEffect(() => {
    const dbNweets = query(
      collection(dbService, "nweets"),
      orderBy("createAt", "desc") // 시간 순으로 작성하기 위한 것
    );
    console.log(dbNweets);
    onSnapshot(dbNweets, (snapshot) => {
      // 데이터베이스의 어떤 변화를 계속해서 실시간으로 보여주는 것. => onSnapshot
      // nweets는 우리가 페이지를 불러올 때 snapshot에서 나오는 것.
      // query 대신 onSnapshot을 사용했기 때문에 실시간으로 데이터가 들어오는 것을 볼 수 있음.
      const nweetArr = snapshot.docs.map((doc) => {
        return {
          // 모든 doc은 object를 반환함
          id: doc.id,
          ...doc.data(),
        };
      });
      setNweets(nweetArr);
    });
  }, []);

  const onSubmit = async (event) => {
    // promise를 return하므로 async, await 사용

    event.preventDefault();

    // submit 할 때마다 document 생성시킬 거임.

    // try {
    //   // collection은 collection path라는 것을 줘야 함.
    //   const docRef = await addDoc(collection(dbService, "nweets"), {
    //     // 이 안에 어떤 데이터든 원하는 것을 넣을 수 있음. => 필드 설정 구간
    //     text: nweet, // 필드 value 값으로 input에 담기는 값인 nweet를 이용.
    //     createAt: Date.now(), // createAt이라는 필드명으로 Date.now()를 이용.
    //     creatorId: userObj.uid,
    //     creatorName: userObj.displayName,
    //   });
    //   console.log("Document written with ID:", docRef.id);
    //   // document 안에는 id가 존재함. document가 생성될 때마다 id가 랜덤으로 생성됨.
    // } catch (error) {
    //   console.error("Error adding document: ", error);
    // }

    // setNweet("");

    let attachmentUrl = "";

    //이미지 첨부하지 않고 텍스트만 올리고 싶을 때도 있기 때문에 attachment가 있을때만 아래 코드 실행
    //이미지 첨부하지 않은 경우엔 attachmentUrl=""이 된다.
    if (attachment !== "") {
      // 먼저 사진을 업로드하고 사진이 있다면 사진의 URL을 받아서 URL을 nweet에 추가하여 nweet를 만들 거임
      // 우리가 지금 만들기 원하는 것은 ref(reference) => 구글 클라우드 스토리지 오브젝트(bucket)에 대한 참조를 나타냄
      // 참조를 통하여 오브젝트를 업로드, 다운로드 그리고 삭제할 수 있음

      // 파일을 업로드하기 위해서는 먼저 파일의 경로에 대한 참조를 생성해야 함.
      const fileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
      // 하위 참조 생성. => 이미지의 path
      // collection과 비슷함. reference에서 폴더를 만들 수 있음
      // 모든 유저의 사진은 아이디와 분리되어 있음. => userObj.uid를 이용할 거임.
      // 또한, 기본적으로 사진에 이름을 줄 수 있음. => uuid를 이용해 랜덤으로 이름을 부여.

      const response = await uploadString(fileRef, attachment, "data_url");
      // 파일을 업로드하기 위한 것. => 문자열로 된 파일 업로드
      // data와 데이터 형식을 요구. 여기서 data는 attachment의 string. 데이터 형식은 data_url
      console.log(response);

      //storage 참조 경로에 있는 파일의 URL을 다운로드해서 attachmentUrl 변수에 넣어서 업데이트
      attachmentUrl = await getDownloadURL(response.ref);
    }

    //트윗 오브젝트
    const nweetObj = {
      text: nweet,
      createAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl: attachmentUrl,
      creatorName: userObj.uid.substr(0, 5),
    };

    //트윗하기 누르면 nweetObj 형태로 새로운 document 생성하여 nweets 콜렉션에 넣기
    await addDoc(collection(dbService, "nweets"), nweetObj);

    //state 비워서 form 비우기
    setNweet("");

    //파일 미리보기 img src 비워주기
    setAttachment("");

    // submit 버튼을 누른 후에 파일명이 사라지도록
    fileInput.current.value = "";
  };

  const onChange = (event) => {
    // setNweet(event.target.value);

    const {
      target: { value },
    } = event;

    setNweet(value);
  };

  const onFileChange = (event) => {
    // console.log(event.target.files);

    const {
      target: { files },
    } = event;
    // const files = event.target.files; => 이미지 파일을 변수로 받아옴

    const theFile = files[0];
    // 파일은 하나만 넣을 거기 때문에 files[0];

    console.log(theFile);

    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      // console.log(finishedEvent);

      const {
        currentTarget: { result },
      } = finishedEvent;
      // const result = finishedEvent.currentTarget.result

      setAttachment(result);
      // 받아온 파일의 경로는 result에 저장되어 있으므로 setAttachment(result);를 하여 attachment 값을 변경
      console.log(attachment);
    };

    if (theFile) {
      reader.readAsDataURL(theFile);
    }

    //reader.readAsDataURL(theFile);
    // 파일로 reader라는 변수를 만든 다음 onloadend를 실행. 끝나면 finishedEvent를 받음.
    // readAsDataURL을 사용하여 파일을 읽는 것
  };

  //선택했던 첨부파일명 없애기위해 useRef() 훅 사용
  const fileInput = useRef();
  console.log(fileInput);

  //첨부 사진 취소하는 버튼
  const onClearAttachment = () => {
    // 1. 첨부파일 url 넣는 state 비워서 프리뷰 img src 없애기
    setAttachment("");
    // 2. 선택했던 첨부파일명 없애기
    //null에서 빈 값("")으로 수정, 트윗할 때 텍스트만 입력시 이미지 url ""로 비워두기 위함
    fileInput.current.value = "";
  };

  console.log(nweets);

  return (
    <HomeWrap>
      <HomeInnerWrap>
        <FormWrap onSubmit={onSubmit}>
          <TextInputWrap>
            <TextInput
              type="text"
              placeholder="What's on your mind?"
              maxLength={120}
              onChange={onChange}
              value={nweet}
            />
          </TextInputWrap>

          <AddPhotoLabel for="attach-file" className="factoryInput__label">
            <AddPhotoSpan>Add photos</AddPhotoSpan>
            <FontAwesomeIcon icon={faPlus} style={{ color: "#08a0f0" }} />
          </AddPhotoLabel>
          <input
            id="attach-file"
            type="file"
            accept="image/*"
            onChange={onFileChange}
            ref={fileInput}
          />
          {/*어떤 종류의 이미지라도 그게 이미지기만 하면 됨*/}
          {attachment && (
            <div>
              <img src={attachment} alt="preview" width="70" height="70" />
              <button onClick={onClearAttachment}>Clear</button>
            </div>
          )}

          <SubmitButton type="submit" value="제출">
            <FontAwesomeIcon
              icon={faArrowRight}
              style={{
                fontSize: 26,
                color: "rgba(255,255,255,0.7)",
                position: "absolute",
                top: "34%",
                left: "36%",
              }}
            />
          </SubmitButton>
        </FormWrap>
        <div>
          {nweets.map((nweet) => (
            <Nweet
              key={nweet.id}
              nweet={nweet}
              isOwner={nweet.creatorId === userObj.uid}
              // nweet의 creatorId가 userObj의 uid와 일치할 때 =>
              // 내(현재 로그인된 user)가 쓴 글을 찾기 위하여
            />
          ))}
        </div>
      </HomeInnerWrap>
    </HomeWrap>
  );
}
