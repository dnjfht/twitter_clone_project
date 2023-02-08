import { addDoc, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { dbService } from "../firebase";

export default function Home() {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);

  useEffect(() => {
    dbService.collection("nweets").get();
  }, []);

  const onSubmit = async (event) => {
    // promise를 return하므로 async, await 사용

    event.preventDefault();

    // submit 할 때마다 document 생성시킬 거임.

    try {
      // collection은 collection path라는 것을 줘야 함.
      const docRef = await addDoc(collection(dbService, "nweets"), {
        // 이 안에 어떤 데이터든 원하는 것을 넣을 수 있음. => 필드 설정 구간
        nweet: nweet, // 필드 value 값으로 input에 담기는 값인 nweet를 이용.
        createAt: Date.now(), // createAt이라는 필드명으로 Date.now()를 이용.
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
    </div>
  );
}
