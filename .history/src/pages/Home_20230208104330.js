import React, { useState } from "react";
import { dbService } from "../firebase";

export default function Home() {
  const [nweet, setNweet] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();

    // submit 할 때마다 document 생성.
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
