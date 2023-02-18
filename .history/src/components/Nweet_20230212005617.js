import React from "react";

export default function Nweet({ nweet }) {
  return (
    <div>
      <p>{new Date(nweet.createAt).toLocaleDateString()}</p>
      <h3>{nweet.text}</h3>
    </div>
  );
}
