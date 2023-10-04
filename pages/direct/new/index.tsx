import React from "react";
import * as SC from "@/styled/direct/new/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import DirectSearchBar from "@/components/input/DirectSearchBar";

const New: React.FC = () => {
  return (
    <>
      <SC.NewHeader>
        <FontAwesomeIcon icon={faArrowLeft} fontSize={24} />
        <SC.HeaderTitle>새로운 메시지</SC.HeaderTitle>
        <SC.Next>다음</SC.Next>
      </SC.NewHeader>
      <SC.NewContainer>
        <DirectSearchBar />
        <SC.ResultsList>
          <SC.Results>계정을 찾을 수가 없습니다</SC.Results>
        </SC.ResultsList>
      </SC.NewContainer>
    </>
  );
};

export default New;
