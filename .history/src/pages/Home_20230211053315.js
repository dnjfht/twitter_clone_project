import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { dbService } from "../firebase";

export default function Home({ userObj }) {
  console.log(userObj);

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
