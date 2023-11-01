import * as SC from "@/components/styled/signup_auth";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { BackArrow } from "@/components/atoms/Icon";
import { useSelector } from "react-redux";

interface UserState {
  user: {
    email: string;
  };
}

const Auth: React.FC = () => {
  const BASE_URL = process.env.BASE_URL;
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [authNumber, setAuthNumber] = useState("");
  const userState = useSelector((state: UserState) => state.user);

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthNumber(e.target.value);
  };

  const submitHandler = () => {
    if (authNumber === "") {
      alert("인증번호를 입력해주세요");
    } else {
      axios
        .post(`${BASE_URL}/signup/check/code`, {
          email: userState.email,
          code: authNumber,
        })
        .then(() => {
          router.push("/signup/details");
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    }
  };

  return (
    <>
      <SC.Header>
        <BackArrow></BackArrow>
        <span>등록</span>
        <span></span>
      </SC.Header>
      <SC.Container>
        <SC.Contents>
          <SC.Title>인증코드 입력</SC.Title>
          <SC.Descriptions>
            {email} 주소로 전송된 인증 코드를 입력하세요.
            <span style={{ color: "blue" }}>코드 재전송</span>
          </SC.Descriptions>
          <SC.AuthInput
            type="number"
            placeholder="인증번호를 입력하세요"
            onChange={inputHandler}
            value={authNumber}
          ></SC.AuthInput>
          <SC.SubmitButton onClick={submitHandler}>다음</SC.SubmitButton>
        </SC.Contents>
      </SC.Container>
    </>
  );
};

export default Auth;
