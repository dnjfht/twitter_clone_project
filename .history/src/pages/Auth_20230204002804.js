import React, { useState } from "react";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <form>
        <input type="text" placeholder="Email" required value={email} />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
        />
        <input type="submit" value="Log In" />
      </form>

      <div>
        <button>Continue with Google</button>
        <button>Continue with Github</button>
        https://nwitter-85f4d.firebaseapp.com/__/auth/handler
      </div>
    </div>
  );
}
