import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { dbService } from "../firebase";

export default function Home() {
  const [nweet, setNweet] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();

    // submit 할 때마다 document 생성시킬 거임.

    // collection은 collection path라는 것을 줘야 함.
    const docRef = addDoc(collection(dbService, "nweets"), {
      nweet,
      createAt: Date.now();
    });
    console.log("Document written with ID:",docRef.id);
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
