import React from "react";

export default function Nweet({ nweetObj }) {
  return (
    <div>
      <p>{new Date(nweet.createAt).toLocaleDateString()}</p>
      <h3>{nweet.text}</h3>
    </div>
  );
}
