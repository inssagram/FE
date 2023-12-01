import * as SC from "@/components/styled/signup";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { BackArrow } from "@/components/atoms/Icon";
import { reduceEmail } from "../../components/redux/emailState";
import { useDispatch } from "react-redux";

const Signup: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch()
  const BASE_URL = process.env.BASE_URL
  let [email, setEmail] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false)



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


  const submitHandler = () => {
    setButtonDisabled(true)
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailPattern.test(email)) {
      alert("올바른 이메일 형식이 아닙니다");
      setButtonDisabled(false)
    } else {
      axios.post(`${BASE_URL}/signup/check/email`, {
        email: email
      })
        .then(() => {
            dispatch( reduceEmail(email) )
            axios.post(`${BASE_URL}/signup/auth`,{
              email: email
            }).then(() => {
              router.push("/signup/auth");
            }).catch((error) => {
              console.error(error)
            })
        })
        .catch((error) => {
          if (error.response.status === 409) {
            alert("중복된 이메일이 있습니다.");
            setButtonDisabled(false)
          }
          if(error.response.status === 500) {
            alert("잘못된 접근입니다.")
            setButtonDisabled(false)
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
            <SC.EmailShortcut>@daum.net</SC.EmailShortcut>
            <SC.EmailShortcut>@info.com</SC.EmailShortcut>
          </SC.EmailList>
          <SC.SubmitButton disabled={buttonDisabled} onClick={submitHandler}>다음</SC.SubmitButton>
        </SC.Contents>
      </SC.Container>
    </>
  );
};

export default Signup;
