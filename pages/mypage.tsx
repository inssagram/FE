import React from "react";
import * as SC from "../styles/mypage";

const MyPage: React.FC = () => {
  return (
    <>
      <SC.ProfileContainer>
        <SC.MyProfile />
        <SC.MyId>
          <h1>gummy_bear</h1>
        </SC.MyId>
      </SC.ProfileContainer>
    </>
  );
};

export default MyPage;
