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

export const Profile = styled.div`
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

export const Icon = styled(FontAwesomeIcon)`
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
