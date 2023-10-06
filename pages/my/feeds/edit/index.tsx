import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as SC from "@/styled/my/feeds/edit/styled";
import Image from "next/image";
import { faFaceSmile, faUser } from "@fortawesome/free-regular-svg-icons";
import { faChevronLeft, faCheck, faFont } from "@fortawesome/free-solid-svg-icons";
import Footer from "@/components/Footer";
import React from "react";

const Edit: React.FC = () => {
  return (
    <SC.Container>
      <SC.Header>
        <SC.Prev>
          <FontAwesomeIcon icon={faChevronLeft} />
        </SC.Prev>
        <SC.H1>게시글 수정</SC.H1>
        <SC.Next>
          <FontAwesomeIcon icon={faCheck} />
        </SC.Next>
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

          <SC.ContentsDate>16주</SC.ContentsDate>
        </SC.Profile>
        <SC.AddLocation>위치 찾기</SC.AddLocation>
      </SC.Head>
      <SC.Details>
        <SC.Contents>
          <SC.ImageContent>
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Golde33443.jpg/280px-Golde33443.jpg"
              alt="개"
              layout="responsive"
              width={10}
              height={10}
            />
            <SC.FunctionFannels>
              <SC.Button>
                <FontAwesomeIcon icon={faUser} fontSize={"2rem"} />
              </SC.Button>
              <SC.Text>사람 태그</SC.Text>

              <SC.Button>
                <FontAwesomeIcon icon={faFont} fontSize={"2rem"} />
              </SC.Button>
              <SC.Text>대체 택스트 수정</SC.Text>
            </SC.FunctionFannels>
          </SC.ImageContent>
        </SC.Contents>
      </SC.Details>
      <SC.CommentsContainer>
        <SC.Content>곱창 먹고 싶다고요옹</SC.Content>
      </SC.CommentsContainer>
    </SC.Container>
  );
};

export default Edit;
