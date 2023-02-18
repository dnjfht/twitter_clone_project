import React from "react";

export default function Nweet({ nweet, isOwner }) {
  return (
    <div>
      <p>{new Date(nweet.createAt).toLocaleDateString()}</p>
      <h3>{nweet.text}</h3>
      {isOwner ? (
        <>
          <button>Delete Nweet</button>
          <button>Edit Nweet</button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
