import React from "react";

export default function Auth() {
  return (
    <div>
      <form>
        <input type="text" placeholder="Email" required />

        <input type="text" placeholder="Password" required />
      </form>
    </div>
  );
}
