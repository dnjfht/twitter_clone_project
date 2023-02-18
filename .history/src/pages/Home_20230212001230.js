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

  console.log(nweet);

  console.log(nweets);
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
        <input type="submit" value="Nweet" />
      </form>
      <div>
        {nweets.map((nweet) => (
          <div key={nweet.id}>
            <p>{new Date(nweet.createAt).toLocaleDateString()}</p>
            <h3>{nweet.text}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
