import React from "react";

export default function Home() {
  return (
    <div>
      <form>
        <input type="text" placeholder="What's on your mind?" maxLength={120} />
      </form>
    </div>
  );
}
