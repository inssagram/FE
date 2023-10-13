import * as SC from "@/components/styled/my_settings";
import React from "react";
import { BackArrow } from "@/components/atoms/Icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";


const Settings: React.FC = () => {
    const router = useRouter()
    
    const moveProfile = () => {
        router.push('settings/profile')
    }

    const moveAccount = () => {
        router.push('settings/account')
    }

    const moveJob = () => {
        router.push('settings/job')
    }

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
    </SC.Container>
  );
};

export default Settings;