import Image from "next/image";
import styled, { css } from "styled-components";
import * as SC from "@/components/styled/my_feeds_edit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faLocationDot,
  faChevronLeft,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { CopyLinkButton } from "./Button";
import axios from "axios";
import { useState } from "react";
import React, { useEffect, ReactNode } from "react";
import { useRouter } from "next/router";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  return (
    <ModalContainer isOpen={isOpen} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </ModalContainer>
  );
};

const ModalContainer = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export default Modal;

interface MyEllipsisModalProps {
  post: { postId: number };
  handleEditClick: () => void;
  handleAccountInfoClick: () => void;
  handleInfoClose?: () => void;
}

export const MyEllipsisModal: React.FC<MyEllipsisModalProps> = ({
  post,
  handleEditClick,
  handleAccountInfoClick,
  handleInfoClose,
}) => {
  const { postId } = post;

  const handlePostDelete = () => {
    const token = sessionStorage.getItem("token");
    axios
      .delete(`http://3.36.239.69:8080/post/delete/${postId}`, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((response) => {
        console.log("포스트가 성공적으로 삭제되었습니다.", response);
      })
      .catch((error) => {
        console.error("포스트 삭제 중 오류가 발생했습니다.", error);
      });
  };

  return (
    <ModalBackdrop>
      <ModalContent>
        <DeletePost onClick={handlePostDelete}>삭제하기</DeletePost>
        <EditPost onClick={handleEditClick}>수정하기</EditPost>
        <MyCopyLink>
          <CopyLinkButton linkToCopy={`localhost:3000/post/${post.postId}`} />
        </MyCopyLink>
        <AccountInfo onClick={handleAccountInfoClick}>이 계정 정보</AccountInfo>
        <CloseBtn onClick={handleInfoClose}>취소</CloseBtn>
      </ModalContent>
    </ModalBackdrop>
  );
};

interface EllipsisModalProps {
  post: { postId: number };
  handleAccountInfoClick?: () => void;
  handleInfoClose?: () => void;
}

export const EllipsisModal: React.FC<EllipsisModalProps> = ({
  post,
  handleAccountInfoClick,
  handleInfoClose,
}) => {
  return (
    <ModalBackdrop>
      <ModalContent>
        <CopyLink>
          <CopyLinkButton linkToCopy={`localhost:3000/post/${post.postId}`} />
        </CopyLink>
        <AccountInfo onClick={handleAccountInfoClick}>이 계정 정보</AccountInfo>
        <CloseBtn onClick={handleInfoClose}>취소</CloseBtn>
      </ModalContent>
    </ModalBackdrop>
  );
};

interface PostInfo {
  postId: number;
  memberId: number;
  nickName: string;
  image: string;
  contents: string;
  likeCount: number;
  commentsCounts: number;
  hashTags: string;
}

interface AccountInfoModalProps {
  post: PostInfo;
  handleInfoClose?: () => void;
}

export const AccountInfoModal: React.FC<AccountInfoModalProps> = ({
  post,
  handleInfoClose,
}) => {
  return (
    <ModalBackdrop>
      <ModalContent>
        <ModalTitle>이 계정 정보</ModalTitle>
        <InfoContent>
          <AccountArea>
            <Profile>
              <Image
                src="/images/noProfile.jpg"
                alt="프로필"
                width={78}
                height={78}
                style={{ borderRadius: "100%" }}
              />
            </Profile>
            <Id>{post.nickName}</Id>
          </AccountArea>
          <InfoArea>
            <Detail>
              <Icon icon={faCalendarDays} fontSize={24} />
              <Infos>
                <SubTitle>가입한 날짜</SubTitle>
                <SubContent>2023년 10월</SubContent>
              </Infos>
            </Detail>
            <Detail>
              <Icon icon={faLocationDot} fontSize={24} />
              <Infos>
                <SubTitle>계정 기본 위치</SubTitle>
                <SubContent>대한민국</SubContent>
              </Infos>
            </Detail>
          </InfoArea>
        </InfoContent>
        <CloseBtn onClick={handleInfoClose}>닫기</CloseBtn>
      </ModalContent>
    </ModalBackdrop>
  );
};

interface EditModalProps {
  post: { postId: number; memberId: number };
  handleEditClick?: () => void;
}

export const EditModal: React.FC<EditModalProps> = ({ post }) => {
  const [formData, setFormData] = useState({
    contents: "",
    location: "",
  });
  const router = useRouter();

  useEffect(() => {
    if (post && post.postId) {
      // 서버로부터 게시물 데이터를 가져오는 API 요청
      const fetchPostData = async () => {
        try {
          const response = await axios.get(
            `http://3.36.239.69:8080/post/${post.postId}`
          );
          if (response.status === 200) {
            const postData = response.data;
            // 가져온 데이터로 폼 필드를 채웁니다
            setFormData({
              contents: postData.contents,
              location: postData.location,
              // 기타 필요한 폼 필드들도 postData의 속성을 이용해 채워주세요
            });
          } else {
            console.error("게시물 데이터를 불러오는데 실패했습니다.");
          }
        } catch (error) {
          console.error(
            "게시물 데이터를 불러오는 중 오류가 발생했습니다:",
            error
          );
        }
      };

      fetchPostData();
    }
  }, [post]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      contents: value,
    }));
  };

  const handleEditDone = () => {
    const token = sessionStorage.getItem("token");

    if (post) {
      const { postId, memberId } = post;
      axios
        .put(`http://3.36.239.69:8080/post/update/${postId}`, {
          headers: {
            Authorization: `${token}`,
          },
          memberId: memberId,
          contents: formData.contents,
          location: formData.location,
        })
        .then((response) => {
          console.log("게시물이 성공적으로 업데이트되었습니다.", response);
          router.push(`/my/feeds/${postId}`);
        })
        .catch((error) => {
          console.error("게시물 업데이트 중 오류가 발생했습니다.", error);
        });
    } else {
      console.error("유효한 게시물이 없습니다.");
    }
  };

  return (
    <SC.ModalWrapper>
      <SC.Container>
        <SC.Header>
          <SC.Prev>
            <FontAwesomeIcon icon={faChevronLeft} />
          </SC.Prev>
          <SC.H1>게시글 수정</SC.H1>
          <SC.Next onClick={() => handleEditDone()}>
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
              </SC.FunctionFannels>
            </SC.ImageContent>
            <SC.UserInput
              type="text"
              value={formData.contents}
              placeholder={formData.contents}
              onChange={handleInputChange}
            />
          </SC.Contents>
        </SC.Details>
      </SC.Container>
    </SC.ModalWrapper>
  );
};

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 324px;
  background-color: #fff;
  border-radius: 10px;
`;

const ModalTitle = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 43px;
  font-size: 16px;
  font-weight: 600;
  border-bottom: 1px solid #ccc;
`;

const InfoContent = styled.div`
  width: 100%;
`;

const AccountArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-bottom: 10px;
`;

const Profile = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding-top: 16px;
  padding-bottom: 8px;
`;

const Id = styled.span`
  display: flex;
  justify-content: center;
  width: 100%;
  padding-top: 8px;
  font-size: 16px;
  font-weight: 600;
`;

const InfoArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-bottom: 10px;
  font-size: 16px;
`;

const Detail = styled.div`
  display: flex;
  flex-direction: row;
  padding: 12px 16px;
`;

const Icon = styled(FontAwesomeIcon)`
  padding-right: 12px;
`;

const Infos = styled.div`
  display: flex;
  flex-direction: column;
`;
const SubTitle = styled.span``;

const SubContent = styled.span`
  font-size: 14px;
  color: rgb(115, 115, 115);
`;

const Link = css`
  width: 100%;
  height: 48px;
  font-size: 14px;
  border: none;
  background-color: inherit;
  padding: 4px 8px;
  border-top: 1px solid #ccc;
`;

const CloseBtn = styled.button`
  ${Link}
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border-top: 1px solid #ccc;
`;

const CopyLink = styled.button`
  ${Link}
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const MyCopyLink = styled.button`
  ${Link}
  display: flex;
  align-items: center;
`;

const EditPost = styled.button`
  ${Link}
`;

const DeletePost = styled.button`
  ${Link}
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  color: red;
`;

const AccountInfo = styled.button`
  ${Link}
`;
