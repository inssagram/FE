import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTable, faMobileScreen, faGear, faChevronDown, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { faBookmark, faUser } from "@fortawesome/free-regular-svg-icons";
import * as SC from "@/styled/my/styled";
import Footer from "@/components/Footer";

const My: React.FC = () => {
  return (
    <>
      <SC.Header>
        <FontAwesomeIcon icon={faGear} fontSize={"2rem"} />
        <SC.HeaderCon>
          <h2>gummy_jelly</h2>
          <FontAwesomeIcon icon={faChevronDown} fontSize={"1.5rem"} />
        </SC.HeaderCon>
        <FontAwesomeIcon icon={faUserPlus} fontSize={"2rem"} />
      </SC.Header>
      <SC.Container>
        <SC.ProfileLeft>
          <SC.MyProfile />
          <SC.UserName>조유리</SC.UserName>
        </SC.ProfileLeft>
        <SC.MyIdContainer>
          <SC.UserId>gummy_bear</SC.UserId>
          <SC.MyIdGroup>
            <SC.ProfileEdit>
              <SC.ProfileBox>프로필 편집</SC.ProfileBox>
            </SC.ProfileEdit>
            <SC.ProfileEdit>
              <SC.ProfileBox>보관된 스토리 보기</SC.ProfileBox>
            </SC.ProfileEdit>
          </SC.MyIdGroup>
        </SC.MyIdContainer>
      </SC.Container>
      <SC.MyDataContainer>
        <SC.MyDataValue>
          <SC.DataName>게시물</SC.DataName>
          <SC.DataValue>77</SC.DataValue>
        </SC.MyDataValue>
        <SC.MyDataValue>
          <SC.DataName>팔로워</SC.DataName>
          <SC.DataValue>485</SC.DataValue>
        </SC.MyDataValue>
        <SC.MyDataValue>
          <SC.DataName>팔로우</SC.DataName>
          <SC.DataValue>557</SC.DataValue>
        </SC.MyDataValue>
      </SC.MyDataContainer>
      <SC.IconContainer>
        <FontAwesomeIcon icon={faTable} />
        <FontAwesomeIcon icon={faMobileScreen} />
        <FontAwesomeIcon icon={faBookmark} />
        <FontAwesomeIcon icon={faUser} />
      </SC.IconContainer>
      <SC.FeedViewCon>
        {Array.from({ length: 12 }, (_, index) => (
          <SC.Feed key={index}></SC.Feed>
        ))}
      </SC.FeedViewCon>
      <Footer />
    </>
  );
};

export default My;
