import Image from "next/image";
import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const ModalBackdrop = styled.div`
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

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 324px;
  background-color: #fff;
  border-radius: 10px;
`;

export const ModalTitle = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 43px;
  font-size: 16px;
  font-weight: 600;
  border-bottom: 1px solid #ccc;
`;

export const InfoContent = styled.div`
  width: 100%;
`;

export const AccountArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-bottom: 10px;
`;

export const Account = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding-top: 16px;
  padding-bottom: 8px;
`;

export const Id = styled.span`
  display: flex;
  justify-content: center;
  width: 100%;
  padding-top: 8px;
  font-size: 16px;
  font-weight: 600;
`;

export const InfoArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-bottom: 10px;
  font-size: 16px;
`;

export const Detail = styled.div`
  display: flex;
  flex-direction: row;
  padding: 12px 16px;
`;

export const HeaderIcon = styled(FontAwesomeIcon)`
  padding-right: 12px;
`;

export const Infos = styled.div`
  display: flex;
  flex-direction: column;
`;
export const SubTitle = styled.span``;

export const SubContent = styled.span`
  font-size: 14px;
  color: rgb(115, 115, 115);
`;

export const Link = css`
  width: 100%;
  height: 48px;
  font-size: 14px;
  border: none;
  background-color: inherit;
  padding: 4px 8px;
  border-top: 1px solid #ccc;
`;

export const CloseBtn = styled.button`
  ${Link}
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border-top: 1px solid #ccc;
`;

export const CopyLink = styled.div`
  ${Link}
  display: flex;
  align-items: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

export const MyCopyLink = styled.div`
  ${Link}
  display: flex;
  align-items: center;
`;

export const EditPost = styled.button`
  ${Link}
`;

export const DeletePost = styled.button`
  ${Link}
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  color: red;
`;

export const AccountInfo = styled.button`
  ${Link}
`;

export const Header = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  margin-top: 5px;
`;

export const BackButton = styled.button`
  border: none;
  background-color: transparent;
`;

export const Icon = styled(FontAwesomeIcon)`
  margin-right: 8px;
`;

export const Title = styled.h2`
  font-size: 1.4rem;
  font-weight: lighter;
  text-align: center;
`;

export const UpdateButton = styled.button`
  border: none;
  color: #0095f6;
  background-color: transparent;
`;

export const ProfileArea = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  height: 50px;
  margin: 12px 0;
`;

export const Profile = styled.div`
  flex: 1;
  display: flex;
  padding: 0 12px;
  align-items: center;
  justify-content: space-around;
`;

export const ID = styled.span`
  flex: 1;
  margin-left: 12px;
`;

export const Date = styled.span`
  color: #cccccc;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 12px;
  padding: 0 12px;
`;

export const ContentArea = styled.div`
  display: flex;
  align-items: center;
`;

export const Content = styled(Image)`
  width: 100%;
  height: 100%;
`;

export const EditArea = styled.div`
  width: 100%;
  min-height: 80px;
  margin-top: 12px;
  border: 1.5px solid #0095f6;
  border-radius: 10px;
`;

export const EditInput = styled.input`
  width: 100%;
  height: 30px;
  margin-top: 12px;
  padding: 0 12px;
  font-size: 16px;
  border-style: none;
`;
