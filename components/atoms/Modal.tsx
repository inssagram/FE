import Image from "next/image";
import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { CopyLinkButton } from "./Button";

interface EllipsisModalProps {
  handleAccountInfoClick: () => void;
  handleEtcClick: () => void;
  post: { postId: number };
}

export const EllipsisModal: React.FC<EllipsisModalProps> = ({
  handleAccountInfoClick,
  handleEtcClick,
  post,
}) => {
  return (
    <ModalBackdrop>
      <ModalContent>
        <CopyLink>
          <CopyLinkButton linkToCopy={`localhost:3000/post/${post.postId}`} />
        </CopyLink>
        <AccountInfo onClick={handleAccountInfoClick}>이 계정 정보</AccountInfo>
        <CloseBtn onClick={handleEtcClick}>취소</CloseBtn>
      </ModalContent>
    </ModalBackdrop>
  );
};

interface MyEllipsisModalProps {
  handleAccountInfoClick: () => void;
  handleEtcClick: () => void;
  post: { postId: number };
}

export const MyEllipsisModal: React.FC<MyEllipsisModalProps> = ({
  handleAccountInfoClick,
  handleEtcClick,
  post,
}) => {
  return (
    <ModalBackdrop>
      <ModalContent>
        <DeletePost>삭제하기</DeletePost>
        <EditPost>수정하기</EditPost>
        <MyCopyLink>
          <CopyLinkButton linkToCopy={`localhost:3000/post/${post.postId}`} />
        </MyCopyLink>
        <AccountInfo onClick={handleAccountInfoClick}>이 계정 정보</AccountInfo>
        <CloseBtn onClick={handleEtcClick}>취소</CloseBtn>
      </ModalContent>
    </ModalBackdrop>
  );
};

interface PostWriterInfo {
  postId: string;
  memberId: string;
  // nickname: string;
  // profile: string;
}

interface AccountInfoModalProps {
  post: PostWriterInfo;
  handleInfoClose: () => void;
}

export const AccountInfoModal: React.FC<AccountInfoModalProps> = ({
  handleInfoClose,
  post,
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
            {/* <Id>{post.nickname}닉네임</Id> */}
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
