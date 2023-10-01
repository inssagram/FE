import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
// import { faBookmark, faUser } from "@fortawesome/free-regular-svg-icons";
import * as SC from "./styled";
import Image from "next/image";

const BoardWrite: React.FC = () => {
  return (
    <>
      <SC.Header>
        <SC.Prev>
          <FontAwesomeIcon icon={faChevronLeft} />
        </SC.Prev>
        <SC.H1>새 게시물</SC.H1>
        <SC.Next>공유하기</SC.Next>
      </SC.Header>
      <SC.Container>
        <SC.MyProfile />
        <SC.TextCont>
          <SC.Text>떡볶이 먹고 싶다</SC.Text>
        </SC.TextCont>
        <SC.PicCon>
          <Image src="/images/cat.jpg" alt="cute cat" width={50} height={50} />
        </SC.PicCon>
      </SC.Container>
      <SC.FunctionPannels>
        <SC.Button>
          <SC.Text>위치 추가</SC.Text>
        </SC.Button>
        <SC.Button>
          <FontAwesomeIcon icon={faChevronRight} />
        </SC.Button>
      </SC.FunctionPannels>
      <SC.FunctionPannels>
        <SC.Button>
          <SC.Text>사람 태그</SC.Text>
        </SC.Button>
        <SC.Button>
          <FontAwesomeIcon icon={faChevronRight} />
        </SC.Button>
      </SC.FunctionPannels>
      <SC.FunctionPannels>
        <SC.Button>
          <SC.Text>고급 설정</SC.Text>
        </SC.Button>
        <SC.Button>
          <FontAwesomeIcon icon={faChevronRight} />
        </SC.Button>
      </SC.FunctionPannels>
    </>
  );
};

export default BoardWrite;
