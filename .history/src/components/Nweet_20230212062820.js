import React from "react";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { dbService } from "../firebase";

export default function Nweet({ nweet, isOwner }) {
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete?");
    console.log(ok);

    const NweetTextRef = doc(dbService, "nweets", `${nweetObj.id}`);

    if (ok) {
      //delete nweet
      await deleteDoc(NweetTextRef);
    } else {
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
