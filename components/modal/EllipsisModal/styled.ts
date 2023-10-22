import styled, { css } from "styled-components";

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

const Link = css`
  width: 100%;
  height: 48px;
  font-size: 14px;
  border: none;
  background-color: inherit;
  padding: 4px 8px;
  border-top: 1px solid #ccc;
`;

export const CopyLink = styled.button`
  ${Link}
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

export const AccountInfo = styled.button`
  ${Link}
`;

export const CloseBtn = styled.button`
  ${Link}
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border-top: 1px solid #ccc;
`;
