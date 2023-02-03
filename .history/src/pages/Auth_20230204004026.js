import React, { useState } from "react";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangePassword = (event) => {
    console.log(event);
    setPassword(event.target.value);
  };

  console.log(email, password);

  const onSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <form>
        <input
          name="email"
          type="text"
          placeholder="Email"
          required
          value={email}
          onChange={onChangeEmail}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChangePassword}
        />
        <input type="submit" value="Log In" onSubmit={onSubmit} />
      </form>

      <div>
        <button>Continue with Google</button>
        <button>Continue with Github</button>
      </div>
    </div>
  );
}
