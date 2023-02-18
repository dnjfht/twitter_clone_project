import React from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { dbService } from "../firebase";

export default function Nweet({ nweet, isOwner }) {
  const onDeleteClick = async() => {
    const ok = window.confirm("Are you sure you want to delete?");
    console.log(ok);

    const 
    if (ok) {
      //delete nweet
      const deletDoc = await deleteDoc(doc(dbService, "nweets"))
    }
  };

  return (
    <div>
      <p>{new Date(nweet.createAt).toLocaleDateString()}</p>
      <h3>{nweet.text}</h3>
      {isOwner ? (
        <>
          <button onClick={onDeleteClick}>Delete Nweet</button>
          <button>Edit Nweet</button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
