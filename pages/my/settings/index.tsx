import * as SC from "@/components/styled/my_settings";
import React, { useState } from "react";
import { BackArrow } from "@/components/atoms/Icon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, logoutUser } from "@/src/redux/Posts/userSlice";
import { RootState } from "@/src/redux/Posts/store";

const Settings: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const member = useSelector((state: RootState) => state.user.member);

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const moveProfile = () => {
    router.push("settings/profile");
  };

  const moveAccount = () => {
    router.push("settings/account");
  };

  const moveJob = () => {
    router.push("settings/job");
  };

  // 회원 탈퇴
  const handleWithdrawal = async () => {
    setShowConfirmationModal(false);
  
    const token = sessionStorage.getItem("token");
  
    if (!member || !member.member_id || !token) {
      console.error("Invalid member ID or token");
      return;
    }
    try {
      const response = await axios.delete(
        `http://3.36.239.69:8080/member/delete/${member.member_id}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      if (
        response.status === 200 &&
        response.data &&
        response.data.status === "success"
      ) {
        sessionStorage.removeItem("token");
        alert("회원탈퇴가 완료되었습니다.");
        dispatch(logoutUser());
        router.push("/signin");
      } else {
        console.log("Withdrawal failed or invalid response status:", response.data);
      }
    } catch (error) {
      console.error("Error during withdrawal:", error);
    }
  };

  const handleConfirmation = async (confirmed: boolean) => {
    if (confirmed) {
      setShowConfirmationModal(false); // Close the modal
  
      // Proceed with withdrawal
      await handleWithdrawal();
    } else {
      // Handle the case when the user clicks "No"
      setShowConfirmationModal(false); // Close the modal
    }
  };
  

  return (
    <SC.Container>
      <SC.Header>
        <BackArrow></BackArrow>
        <span>설정 및 개인정보</span>
        <div></div>
      </SC.Header>
      <SC.Category>계정</SC.Category>
      <SC.Lists>
        <SC.List onClick={moveProfile}>
          <span>프로필 편집</span>
          <SC.Button>
            <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
          </SC.Button>
        </SC.List>
        <SC.List onClick={moveAccount}>
          <span>닉네임 / 비밀번호 변경</span>
          <SC.Button>
            <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
          </SC.Button>
        </SC.List>
        <SC.List onClick={moveJob}>
          <span>직업 변경</span>
          <SC.Button>
            <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
          </SC.Button>
        </SC.List>
      </SC.Lists>
      <SC.Category>활동</SC.Category>
      <SC.Lists>
        <SC.List>
          <span>내 활동</span>
          <SC.Button>
            <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
          </SC.Button>
        </SC.List>
      </SC.Lists>
      <SC.Logout>로그아웃</SC.Logout>
      <SC.Unregister onClick={() => setShowConfirmationModal(true)}>
      회원탈퇴
    </SC.Unregister>

      {showConfirmationModal && (
        <SC.Modal>
          <SC.ModalContent>
            <p>정말 탈퇴하시겠습니까?</p>
            <SC.ModalButtons>
            <button onClick={() => handleConfirmation(true)}>예</button>
            <button onClick={() => handleConfirmation(false)}>아니오</button>
            </SC.ModalButtons>
          </SC.ModalContent>
        </SC.Modal>
      )}
    </SC.Container>
  );
};

export default Settings;