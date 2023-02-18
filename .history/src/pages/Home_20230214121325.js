import Nweet from "components/Nweet";
import {
  addDoc,
  collection,
  //getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { dbService } from "../firebase";

export default function Home({ userObj }) {
  console.log(userObj);

  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  const [attachment, setAttachment] = useState();
  // 우리가 가진 이미지 파일의 URL

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
      const nweetArr = snapshot.docs.map((doc) => ({
        // 모든 doc은 object를 반환함
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArr);
    });
  }, []);

  console.log(nweets);

  const onSubmit = async (event) => {
    // promise를 return하므로 async, await 사용

    event.preventDefault();

    // submit 할 때마다 document 생성시킬 거임.

    try {
      // collection은 collection path라는 것을 줘야 함.
      const docRef = await addDoc(collection(dbService, "nweets"), {
        // 이 안에 어떤 데이터든 원하는 것을 넣을 수 있음. => 필드 설정 구간
        text: nweet, // 필드 value 값으로 input에 담기는 값인 nweet를 이용.
        createAt: Date.now(), // createAt이라는 필드명으로 Date.now()를 이용.
        creatorId: userObj.uid,
        creatorName: userObj.displayName,
      });
      console.log("Document written with ID:", docRef.id);
      // document 안에는 id가 존재함. document가 생성될 때마다 id가 랜덤으로 생성됨.
    } catch (error) {
      console.error("Error adding document: ", error);
    }

    setNweet("");
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
    reader.readAsDataURL(theFile);
    // 파일로 reader라는 변수를 만든 다음 onloadend를 실행. 끝나면 finishedEvent를 받음.
    // readAsDataURL을 사용하여 파일을 읽는 것
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
          onChange={onChange}
          value={nweet}
        />
        <input type="file" accept="image/*" onChange={onFileChange} />
        {/*어떤 종류의 이미지라도 그게 이미지기만 하면 됨*/}
        <img src={attachment} alt="preview" width="50" height="50" />
        <input type="submit" value="Nweet" />
      </form>
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
    </div>
  );
}
