import * as SC from "@/components/styled/signup_details";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { BackArrow } from "@/components/atoms/Icon";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/src/redux/Posts/userSlice"
import { RootState } from "@/src/redux/Posts/store";

const Account: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const member = useSelector((state: RootState) => state.user.member)
  const [nicknameSet, setNicknameSet] = useState(false);
  const [passwordSet, setPasswordSet] = useState(false);

  const [nickname, setNickname] = useState("");
  const [nicknameProcessState, setNicknameProcessState] = useState("");
  const [wrongWayNickname, setWrongWayNickname] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordProcessState, setPasswordProcessState] = useState("");
  const [wrongWayPassword, setWrongWayPassword] = useState(false);

  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordCheckProcessState, setPasswordCheckProcessState] =
    useState("");
  const [wrongWayPasswordCheck, setWrongWayPasswordCheck] = useState(false);
  const inputNicknameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const inputPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const inputPasswordCheckHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordCheck(e.target.value);
  };

  const nicknameHandler = () => {
    const nicknamePattern = /^[A-Za-z0-9._]*$/;
    if (nickname.length === 0) {
      setNicknameProcessState("Please write a nickname");
      setWrongWayNickname(true);
      setNicknameSet(false);
      return;
    } else if (nickname.length > 15 || nickname.length < 2) {
      setNicknameProcessState(
        "The nickname can be a minimum of 2 characters and a maximum of 15 characters."
      );
      setWrongWayNickname(true);
      setNicknameSet(false);
      return;
    } else if (!nicknamePattern.test(nickname)) {
      setNicknameProcessState(
        "Nicknames can only contain letters, numbers, underscores, and periods."
      );
      setWrongWayNickname(true);
      setNicknameSet(false);
      return;
    } else {
      setNicknameProcessState("");
      setWrongWayNickname(false);
      setNicknameSet(true);
    }
  };

  const passwordHandler = () => {
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]+$/;
    if (password.length === 0) {
      setPasswordProcessState("비밀번호를 입력해주세요");
      setWrongWayPassword(true);
      setPasswordSet(false);
      return;
    } else if (password.length < 10) {
      setPasswordProcessState("비밀번호는 10자 이상이어야 합니다.");
      setWrongWayPassword(true);
      setPasswordSet(false);
      return;
    } else if (!passwordPattern.test(password)) {
      setPasswordProcessState(
        "비밀번호는 영문 대소문자 숫자 특수문자가 포함되어야 합니다."
      );
      setWrongWayPassword(true);
      setPasswordSet(false);
      return;
    } else {
      setPasswordProcessState("");
      setWrongWayPassword(false);
    }
  };

  const passwordCheckHandler = () => {
    if (password !== passwordCheck) {
      setPasswordCheckProcessState("설정한 비밀번호와 일치하지 않습니다");
      setWrongWayPasswordCheck(true);
      setPasswordSet(false);
    } else {
      setPasswordCheckProcessState("");
      setWrongWayPasswordCheck(false);
      setPasswordSet(true);
    }
  };

  const setHandler = () => {
    const token = sessionStorage.getItem('token');
    if (!member || !member.member_id || !token) {
      console.error("Invalid member or token");
      return;
    }
    axios
      .put(
        `https://inssagram-fe.vercel.app/${member.member_id}`,
        {
          nickname: nickname,
          password: password,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      )
      .then((response) => {
        console.log('API Response:', response);
  
        if (response.status === 200 && response.data && response.data.status === "success") {
          const updatedMember = response.data.data;
          dispatch(loginUser(updatedMember));
          alert("회원정보가 변경되었습니다.");
          router.push("/my/settings");
        } else {
          console.log('유효한 api응답 값이 없습니다.');
        }
      })
      .catch((error) => {
        console.error('Error updating user details:', error);
      });
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
          <SC.Title>닉네임 / 비밀번호 변경</SC.Title>
          <SC.Descriptions>닉네임과 비밀번호를 변경해주세요</SC.Descriptions>
          <SC.InputBox>
            <SC.Input
              type="string"
              placeholder="사용할 닉네임을 입력하세요"
              onChange={inputNicknameHandler}
              value={nickname}
              onBlur={nicknameHandler}
              style={{ borderColor: wrongWayNickname ? "red" : "transparent" }}
            ></SC.Input>
            <SC.Input
              type="password"
              placeholder="비밀번호를 입력하세요"
              onChange={inputPasswordHandler}
              value={password}
              onBlur={passwordHandler}
              style={{
                borderColor: wrongWayPassword ? "red" : "transparent",
                fontFamily: "Aria",
              }}
            ></SC.Input>
            <SC.Input
              type="password"
              placeholder="비밀번호를 재확인 해주세요"
              onChange={inputPasswordCheckHandler}
              value={passwordCheck}
              onBlur={passwordCheckHandler}
              style={{
                borderColor: wrongWayPasswordCheck ? "red" : "transparent",
                fontFamily: "Aria",
              }}
            ></SC.Input>
          </SC.InputBox>
          <SC.ProcessState>
            {nicknameProcessState}
            <br></br>
            {passwordProcessState}
            <br></br>
            {passwordCheckProcessState}
          </SC.ProcessState>
          <SC.SubmitButton onClick={setHandler}>다음</SC.SubmitButton>
        </SC.Contents>
      </SC.Container>
    </>
  );
};

export default Account;
