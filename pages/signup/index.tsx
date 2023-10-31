import * as SC from "@/components/styled/signup";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { BackArrow } from "@/components/atoms/Icon";
import { reduceEmail } from "./emailState";
import { useDispatch } from "react-redux";

const Signup: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch()
  const BASE_URL = process.env.BASE_URL
  let [email, setEmail] = useState("");

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const shortcutHandler = (e: React.MouseEvent<HTMLSpanElement>) => {
    const targetElement = e.target as HTMLElement;
    if (email.includes("@")) {
      const division = email.split("@");
      setEmail(division[0] + targetElement.innerHTML);
    } else {
      setEmail((prev) => prev + targetElement.innerHTML);
    }
  };

  const backButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    router.back();
  };

  const submitHandler = () => {
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailPattern.test(email)) {
      alert("올바른 이메일 형식이 아닙니다");
    } else {
      axios.post(`${BASE_URL}/signup/check/email`, {
        email: email
      })
        .then(() => {
            dispatch( reduceEmail({ email: email }) )
            router.push("/signup/auth");
        })
        .catch((error) => {
          if (error.response.status === 409) {
            alert("중복된 이메일이 있습니다.");
          } 
        });
    }
  };

  return (
    <>
      <SC.Header>
        <BackArrow></BackArrow>
        <span>회원가입</span>
        <span></span>
      </SC.Header>
      <SC.Container>
        <SC.Contents>
          <SC.Title>이메일</SC.Title>
          <SC.EmailInput onChange={inputHandler} value={email}></SC.EmailInput>
          <SC.EmailList onClick={shortcutHandler}>
            <SC.EmailShortcut>@gmail.com</SC.EmailShortcut>
            <SC.EmailShortcut>@naver.com</SC.EmailShortcut>
            <SC.EmailShortcut>@nate.com</SC.EmailShortcut>
            <SC.EmailShortcut>@daum.com</SC.EmailShortcut>
            <SC.EmailShortcut>@info.com</SC.EmailShortcut>
          </SC.EmailList>
          <SC.SubmitButton onClick={submitHandler}>다음</SC.SubmitButton>
        </SC.Contents>
      </SC.Container>
    </>
  );
};

export default Signup;
