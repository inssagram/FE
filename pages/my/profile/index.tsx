import React from "react";
import * as SC from "@/styled/my_profile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";

const Profile: React.FC = () => {
  const router = useRouter();
  const handlePrevClick = () => {
    router.push("/my");
  };
  return (
    <>
      <SC.Header>
        <SC.Prev onClick={handlePrevClick}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </SC.Prev>
        <SC.H1>프로필 편집</SC.H1>
      </SC.Header>
      <SC.Container>
        <SC.ProfileCont>
          <SC.H2>프로필 편집</SC.H2>
        </SC.ProfileCont>
        <SC.ProfileCont>
          <SC.MyProfile>
            <SC.ProfileImage />
            <SC.IdCont>
              <SC.MyId>gummy_jelly</SC.MyId>F
              <SC.ChangeProfile>프로필 사진 바꾸기</SC.ChangeProfile>
            </SC.IdCont>
          </SC.MyProfile>
        </SC.ProfileCont>
        <SC.IntroduceCont>
          <SC.Aside>소개</SC.Aside>
          <SC.TextArea placeholder="나를 소개하세요" />
        </SC.IntroduceCont>
        <SC.IntroduceCont>
          <SC.Aside>성별</SC.Aside>
          <SC.Dropdown>
            <option value="male">남성</option>
            <option value="female">여성</option>
            <option value="other">밝히지 않음</option>
          </SC.Dropdown>
        </SC.IntroduceCont>
        <SC.PrivatePolicy>이 정보는 공개 프로필에 포함되지 않습니다.</SC.PrivatePolicy>
        <SC.RecommendCont>
          <SC.RecommendMyID>프로필에 계정 추천 표시</SC.RecommendMyID>
          <SC.CheckboxCont>
            <SC.Checkbox type="checkbox" />
            <SC.CheckboxDesc>
              사람들이 회원님의 프로필에서 비슷한 계정 추천을
              <br />볼 수 있는지와 회원님의 계정이 다른 프로필에서
              <br />
              추천될 수 있는지를 선택하세요.
            </SC.CheckboxDesc>
          </SC.CheckboxCont>
        </SC.RecommendCont>
        <SC.SubmitCont>
          <SC.Submit type="submit">제출</SC.Submit>
        </SC.SubmitCont>
      </SC.Container>
      <Footer />
    </>
  );
};

export default Profile;
