import * as SC from "./styled";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const Login: React.FC = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await axios.get("http://localhost:4000/users", {
        params: {
          email: id,
          password: password,
        },
      });

      // 사용자 검증하기
      if (response.data && response.data.length > 0) {
        const user = response.data[0];

        const tokenResponse = await axios.get("http://localhost:4000/tokens", {
          params: {
            userId: user.id,
          },
        });

        if (tokenResponse.data && tokenResponse.data.length > 0) {
          const token = tokenResponse.data[0].token;
          // 토큰을 LocalStorage에 저장하기
          localStorage.setItem("token", token);

          console.log("토큰: ", token);
          router.push("/main");
        } else {
          alert("토큰을 받아오는데 실패했습니다.");
        }
      } else {
        alert("로그인 정보가 올바르지 않습니다.");
      }
    } catch (error) {
      alert("로그인 중 오류가 발생했습니다.");
    }
  };

  return (
    <SC.Container>
      <SC.Notification>
        <Image src="/images/logo.png" alt="Logo" width={60} height={60} />
        <SC.Title>Inssagram</SC.Title>
        <SC.LoginCont>
          <SC.Id alt="이메일입력" placeholder="이메일을 입력하세요" onChange={(e) => setId(e.target.value)} />
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
