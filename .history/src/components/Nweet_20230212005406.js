import React from "react";

export default function Nweet({ nweetObj }) {
  return (
    <div>
      <p>{new Date(nweetObj.createAt).toLocaleDateString()}</p>
      <h3>{nweetObj.text}</h3>
    </div>
  );
}
