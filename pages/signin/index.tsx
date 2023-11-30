import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { loginUser } from "@/src/redux/Posts/userSlice";
import * as SC from "@/components/styled/signin";
import { handleError } from "@/utils/errorHandler";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.BASE_URL}/signin`, {
        email: email,
        password: password,
      });

      if (response.status === 200) {
        const token = response.headers.authorization;
        sessionStorage.setItem("token", token);

        const memberInfo = response.data.data;
        dispatch(loginUser(memberInfo));
        console.log("토큰: ", token);
        router.push("/main");
      } else {
        console.log("로그인 실패: ", response.data.error);
      }
    } catch (error) {
      handleError(error, "로그인 중 오류 발생:");
    }
  };

  return (
    <SC.Container>
      <SC.Notification>
        <Image src="/images/logo.png" alt="Logo" width={60} height={60} />
        <SC.Title>Inssagram</SC.Title>
        <SC.LoginCont>
          <SC.Id
            alt="이메일입력"
            placeholder="이메일을 입력하세요"
            onChange={(e) => setEmail(e.target.value)}
          />
          <SC.Password
            alt="비밀번호입력"
            placeholder="비밀번호를 입력하세요"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <SC.Login onClick={handleLogin}>로그인</SC.Login>
        </SC.LoginCont>
        <SC.SignupArea>
          <span>계정이 없으신가요?</span>
          <Link href="/signup">
            <SC.SignUp>가입하기</SC.SignUp>
          </Link>
        </SC.SignupArea>
      </SC.Notification>
    </SC.Container>
  );
};

export default Login;
