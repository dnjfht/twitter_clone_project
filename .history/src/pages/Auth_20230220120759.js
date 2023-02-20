import { authService } from "../firebase";
import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import styled from "styled-components";

const AuthWrap = styled.div`
  width: 100%;
  height: calc(100vh - 100px);
  background-color: black;

  color: white;

  display: flex;
  flex-direction: column;
  align-items: center;

  position: relative;
`;

const AuthInnerWrap = styled.div`
  width: 400px;
  height: 400px;
  border: 1px solid transparent;
  border-radius: 18px;
  background-image: linear-gradient(#000, #000),
    linear-gradient(to right, #fbfcb9be, #ffcdf3aa, #65d3ffaa);
  background-origin: border-box;
  background-clip: content-box, border-box;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -200px;
  margin-left: -200px;
`;

const PaddingWrap = styled.div`
  width: 400px;
  height: 400px;
  padding: 40px;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ChangeFormWrap = styled.form`
  width: 100%;
  padding-bottom: 18px;
  margin-top: 40px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ChangeInputWrap = styled.div`
  width: 100%;
  height: 40px;
  margin-bottom: 6px;
  background-color: black;
  border: 1px solid transparent;
  border-radius: 50px;
  background-image: linear-gradient(black, black),
    linear-gradient(
      to left,
      rgba(8, 160, 240, 0.5) 20%,
      rgba(255, 255, 255, 0.4) 70%
    );
  background-origin: border-box;
  background-clip: content-box, border-box;

  position: relative;
`;

const EmailChangeInput = styled.input`
  width: 100%;
  height: 40px;
  margin-bottom: 6px;
  padding: 20px;
  box-sizing: border-box;
  background-color: transparent;
  border: none;

  outline: none;

  color: white;
`;

const PasswordChangeInput = styled.input`
  width: 100%;
  height: 40px;
  margin-bottom: 6px;
  padding: 20px;
  box-sizing: border-box;
  background-color: transparent;
  border: none;

  outline: none;

  color: white;
`;

const SubmitInput = styled.input`
  width: 100%;
  height: 40px;
  border-radius: 50px;

  outline: none;
`;

const SwitchChangeAccount = styled.span`
  color: rgb(8, 160, 240);
`;

const SocialLoginWrap = styled.div`
  width: 100%;
  margin-top: 30px;
`;

const GoogleSocialLoginButton = styled.button`
  width: 50%;
  height: 40px;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 50px;

  text-align: left;
`;

const GithubSocialLoginButton = styled.button`
  width: 50%;
  height: 40px;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 50px;

  text-align: left;
`;

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const onChange = (event) => {
    console.log(event.target.name);

    const {
      target: { name, value },
    } = event;
    // const name = event.target.name;
    // const value = event.target.value;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  console.log(email, password);

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        // create account
        data = await createUserWithEmailAndPassword(
          authService,
          email,
          password
        );
      } else {
        // log in
        data = await signInWithEmailAndPassword(authService, email, password);
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);

  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    // const name = event.target.name;

    let provider;

    if (name === "google") {
      provider = new GoogleAuthProvider();
    } else if (name === "github") {
      provider = new GithubAuthProvider();
    }
    const data = await signInWithPopup(authService, provider);
    console.log(data);
  };

  return (
    <AuthWrap>
      <AuthInnerWrap>
        <PaddingWrap>
          <FontAwesomeIcon
            icon={faTwitter}
            style={{ color: "08a0f0", fontSize: 40 }}
          />
          <ChangeFormWrap onSubmit={onSubmit}>
            <ChangeInputWrap>
              <EmailChangeInput
                name="email"
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={onChange}
              />
            </ChangeInputWrap>
            <ChangeInputWrap>
              <PasswordChangeInput
                name="password"
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={onChange}
              />
            </ChangeInputWrap>
            <SubmitInput
              type="submit"
              value={newAccount ? "Create Account" : "Sign In"}
            />
            {error}
          </ChangeFormWrap>

          <SwitchChangeAccount onClick={toggleAccount}>
            {newAccount ? "Sign In" : "Create Account"}
          </SwitchChangeAccount>

          <SocialLoginWrap>
            <GoogleSocialLoginButton onClick={onSocialClick} name="google">
              Continue with Google
            </GoogleSocialLoginButton>
            <GithubSocialLoginButton onClick={onSocialClick} name="github">
              Continue with Github
            </GithubSocialLoginButton>
          </SocialLoginWrap>
        </PaddingWrap>
      </AuthInnerWrap>
    </AuthWrap>
  );
}
