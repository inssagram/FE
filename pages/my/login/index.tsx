import * as SC from "@/styled/my_login";
import Image from "next/image";
import React from "react";

const Login: React.FC = () => {
  return (
    <SC.Container>
      <SC.Notification>
        <Image src="/images/logo.png" alt="Logo" width={60} height={60} />
        <SC.Title>Inssagram</SC.Title>
        <SC.LoginCont>
          <SC.Id alt="이메일입력" placeholder="이메일을 입력하세요" />
          <SC.Password alt="비밀번호입력" placeholder="비밀번호를 입력하세요" />
          <SC.FindPassword>비밀번호를 잊으셨나요?</SC.FindPassword>
          <SC.Login>로그인</SC.Login>
        </SC.LoginCont>
        <SC.NotaMember>
          계정이 없으신가요?<SC.SignIn>가입하기</SC.SignIn>
        </SC.NotaMember>
      </SC.Notification>
    </SC.Container>
  );
};

export default Login;
