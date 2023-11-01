import * as SC from "@/components/styled/signin";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "@/src/redux/Posts/userSlice";
import { RootState } from "@/src/redux/Posts/store";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const dispatch = useDispatch();
  const backendAPI = process.env.BASE_URL;

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendAPI}/signin`, {
          email: email,
          password: password,
      });

      if (response.status === 200) {
        const token = response.headers.authorization;
        sessionStorage.setItem("token", token);
        dispatch(login({ email, password }));
        console.log("토큰: ", token);
        router.push("/main");
      } else {
        console.log("로그인 실패: ", response.data.error); // 백엔드에서 전달한 에러 메시지 출력
      }
    } catch (error) {
      console.error("로그인 중 오류 발생:", error);
    }
  };



  return (
    <SC.Container>
      <SC.Notification>
        <Image src="/images/logo.png" alt="Logo" width={60} height={60} />
        <SC.Title>Inssagram</SC.Title>
        <SC.LoginCont>
          <SC.Id alt="이메일입력" placeholder="이메일을 입력하세요" onChange={(e) => setEmail(e.target.value)} />
          <SC.Password alt="비밀번호입력" placeholder="비밀번호를 입력하세요" onChange={(e) => setPassword(e.target.value)} />
          <SC.FindPassword>비밀번호를 잊으셨나요?</SC.FindPassword>
          <SC.Login onClick={handleLogin}>로그인</SC.Login>
        </SC.LoginCont>
        <SC.NotaMember>
          계정이 없으신가요?<SC.SignIn>가입하기</SC.SignIn>
        </SC.NotaMember>
      </SC.Notification>
    </SC.Container>
  );
};

export default Login;
