import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpand, faArrowsRotate, faXmark } from "@fortawesome/free-solid-svg-icons";
// import { faBookmark, faUser } from "@fortawesome/free-regular-svg-icons";
import * as SC from "@/styled/main/boardwrite/styled";
import Image from "next/image";

const BoardWrite: React.FC = () => {
  return (
    <>
      <SC.Header>
        <SC.CloseBtn>
          <FontAwesomeIcon icon={faXmark} />
        </SC.CloseBtn>
        <SC.H1>새로운 사진 게시물</SC.H1>
        <SC.Next>다음</SC.Next>
      </SC.Header>
      <SC.Container>
        <Image src="/images/cat.jpg" alt="cute cat" layout="fill" objectFit="cover" />
      </SC.Container>
      <SC.IconContainer>
        <SC.Button>
          <FontAwesomeIcon icon={faExpand} />
        </SC.Button>
        <SC.Button>
          <FontAwesomeIcon icon={faArrowsRotate} />
        </SC.Button>
      </SC.IconContainer>
      <SC.Footer>
        <SC.FunctionPannels>필터</SC.FunctionPannels>
        <SC.FunctionPannels>수정</SC.FunctionPannels>
      </SC.Footer>
    </>
  );
};

export default BoardWrite;
