import React from "react";

export default function Auth() {
  return (
    <div>
      <form>
        <input type="text" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <input type="submit" value="Log In" />
      </form>

      <div>
        <button>Continue with Google</button>
      </div>
    </div>
  );
}
