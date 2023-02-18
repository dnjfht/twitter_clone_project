import React from "react";

export default function Nweet({ nweet, isOwner }) {
  const onDeleteClick = () => {
    const ok = window.confirm("Are you sure you want to delete?");
    console.log(ok);
    if (ok) {
      //delete nweet
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