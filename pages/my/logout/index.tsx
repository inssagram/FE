import * as SC from "@/components/styled/my_logout";
import Image from "next/image";
import React from "react";

const Logout: React.FC = () => {
  return (
    <SC.Container>
      <SC.Notification>
        <Image src="/images/logo.png" alt="Logo" width={60} height={60} />
        <SC.Title>Inssagram</SC.Title>
        <SC.Promotion>
          친구들의 <SC.Emphasis>사진</SC.Emphasis>과 <SC.Emphasis>동영상</SC.Emphasis>을 보려면
          <br />
          가입하세요
        </SC.Promotion>
        <SC.DownButton>Inssagram 앱 다운로드</SC.DownButton>
        <SC.LoginButton>
          <SC.BlueEmphasis>로그인</SC.BlueEmphasis> 또는 <SC.BlueEmphasis>가입</SC.BlueEmphasis>
        </SC.LoginButton>
      </SC.Notification>
    </SC.Container>
  );
};

export default Logout;
