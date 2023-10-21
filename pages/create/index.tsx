import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpand, faArrowsRotate, faXmark } from "@fortawesome/free-solid-svg-icons";
// import { faBookmark, faUser } from "@fortawesome/free-regular-svg-icons";
import * as SC from "@/components/styled/main_boardwrite";
import Image from "next/image";
import {useRouter} from 'next/router'

const BoardWrite: React.FC = () => {
  const router = useRouter();

  const handlePrevClick = () => {
    router.push('/main')
  }

  const handleNextClick = () => {
    router.push('/create/details')
  }
  return (
    <>
      <SC.Header>
        <SC.CloseBtn onClick={handlePrevClick}>
          <FontAwesomeIcon icon={faXmark} />
        </SC.CloseBtn>
        <SC.H1>새로운 사진 게시물</SC.H1>
        <SC.Next onClick={handleNextClick}>다음</SC.Next>
      </SC.Header>
      <SC.Container>
        <Image src="/images/cat.jpg" alt="cute cat" fill />
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
