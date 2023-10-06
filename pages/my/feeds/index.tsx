import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as SC from "./styled";
import Image from "next/image";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faComment } from "@fortawesome/free-regular-svg-icons/faComment";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons/faPaperPlane";
import { faBookmark } from "@fortawesome/free-regular-svg-icons/faBookmark";
import { faEllipsis, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Footer from "@/components/Footer";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Feeds: React.FC = () => {
  const defaultImageSrc = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Golde33443.jpg/280px-Golde33443.jpg";
  const [imageSrc, setImageSrc] = useState<string>("");

  useEffect(() => {
    // 컴포넌트가 마운트될 때 localStorage에서 이미지 URL을 가져옵니다.
    const storedImageSrc = localStorage.getItem("selectedImage");
    if (storedImageSrc) {
      setImageSrc(storedImageSrc);
    }
  }, []); // 의존성 배열을 비워 useEffect가 컴포넌트 마운트 시에만 실행되도록 합니다.
  // const [content, setContent] = useState("");

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:4000/posts/1");
  //       setContent(response.data.content);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <SC.Container>
      <SC.Header>
        <SC.Prev>
          <FontAwesomeIcon icon={faChevronLeft} />
        </SC.Prev>
        <SC.H1>게시물</SC.H1>
      </SC.Header>

      <SC.Head>
        <SC.Profile>
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Golde33443.jpg/280px-Golde33443.jpg"
            alt="개"
            width={40}
            height={40}
            style={{ borderRadius: "100%" }}
          />
          <SC.ID>정호인척 하는 유리</SC.ID>
        </SC.Profile>
        <SC.More>
          <FontAwesomeIcon icon={faEllipsis} />
        </SC.More>
      </SC.Head>
      <SC.Contents>
        <SC.ImageContent>{imageSrc && <Image src={imageSrc} alt="개" layout="responsive" width={10} height={10} />}</SC.ImageContent>
      </SC.Contents>
      <SC.Details>
        <SC.Buttons>
          <SC.LeftIcons>
            <FontAwesomeIcon icon={faHeart} fontSize={"25px"} />
            <FontAwesomeIcon icon={faComment} fontSize={"25px"} />
            <FontAwesomeIcon icon={faPaperPlane} fontSize={"25px"} />
          </SC.LeftIcons>
          <SC.RightIcon>
            <FontAwesomeIcon icon={faBookmark} fontSize={"25px"} />
          </SC.RightIcon>
        </SC.Buttons>
        <SC.Likes>foreignerSyoon님 외 100명이 좋아합니다</SC.Likes>
        <SC.BoardContents>
          <SC.MyId>gummy__jelly</SC.MyId>
          <SC.Content>곱창 먹고 싶다고요옹</SC.Content>
        </SC.BoardContents>
        <SC.MoreComments>더 보기</SC.MoreComments>
        <SC.AllComment>댓글 4개 모두 보기</SC.AllComment>
        <SC.CommentCont>
          <SC.UserId>Kyungjeeni</SC.UserId>
          <SC.UserComment>언니 솔직히 정신차려요ㅋ</SC.UserComment>
          <SC.UserId>Ahnjanhee</SC.UserId>
          <SC.UserComment>이 분 지금 뭐함?</SC.UserComment>
        </SC.CommentCont>
        <SC.ContentsDate>7월 1일</SC.ContentsDate>
      </SC.Details>

      <Footer />
    </SC.Container>
  );
};

export default Feeds;
