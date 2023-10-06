import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as SC from "@/styled/my/feeds/comments/styled";
import Image from "next/image";
import { faHeart, faFaceSmile } from "@fortawesome/free-regular-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Footer from "@/components/Footer";
import React from "react";

const Comments: React.FC = () => {
  return (
    <SC.Container>
      <SC.Header>
        <SC.Prev>
          <FontAwesomeIcon icon={faChevronLeft} />
        </SC.Prev>
        <SC.H1>댓글</SC.H1>
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
          <SC.Content>곱창 먹고 싶다고요옹</SC.Content>
        </SC.Profile>
        <SC.ContentsDate>16주</SC.ContentsDate>
      </SC.Head>
      <SC.Details>
        <SC.CommentCont>
          <SC.UserCont>
            <SC.UserProfile>
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Golde33443.jpg/280px-Golde33443.jpg"
                alt="개"
                width={40}
                height={40}
                style={{ borderRadius: "100%" }}
              />
              <SC.UserId>Kyungjeeni</SC.UserId>
              <SC.CommentsDate>12주</SC.CommentsDate>
            </SC.UserProfile>
            <SC.UserComment>
              언니 솔직히 정신차려요ㅋ
              <FontAwesomeIcon icon={faHeart} fontSize={"20px"} />
            </SC.UserComment>

            <SC.WriteReply>답글 달기</SC.WriteReply>
          </SC.UserCont>
          <SC.UserCont>
            <SC.UserProfile>
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Golde33443.jpg/280px-Golde33443.jpg"
                alt="개"
                width={40}
                height={40}
                style={{ borderRadius: "100%" }}
              />
              <SC.UserId>Ahnjanhee</SC.UserId>
              <SC.CommentsDate>12주</SC.CommentsDate>
            </SC.UserProfile>
            <SC.UserComment>이 분 지금 뭐함?</SC.UserComment>
            <SC.WriteReply>답글 달기</SC.WriteReply>
          </SC.UserCont>
          <SC.AllComment>답글 4개 모두 보기</SC.AllComment>
        </SC.CommentCont>
      </SC.Details>
      <SC.CommentsContainer>
        <SC.UserProfile>
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Golde33443.jpg/280px-Golde33443.jpg"
            alt="개"
            width={40}
            height={40}
            style={{ borderRadius: "100%" }}
          />
        </SC.UserProfile>
        <SC.CommentsForm>
          <SC.CommentsInput placeholder="댓글 달기..." />
          <SC.SmileIcon>
            <FontAwesomeIcon icon={faFaceSmile} fontSize={"2rem"} />
          </SC.SmileIcon>
        </SC.CommentsForm>
      </SC.CommentsContainer>

      <Footer />
    </SC.Container>
  );
};

export default Comments;
