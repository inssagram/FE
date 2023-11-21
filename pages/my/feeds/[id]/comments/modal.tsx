import React from "react";
import styled from "styled-components";

interface ModalProps {
  onDelete: () => void;
  onCancel: () => void;
}

const Modal: React.FC<ModalProps> = ({ onDelete, onCancel }) => {
  return (
    <ModalWrapper>
      <ModalContent>
        <ModalText>댓글을 삭제하시겠습니까?</ModalText>
        <ModalButtons>
          <DeleteButton onClick={onDelete}>삭제하기</DeleteButton>
          <CancelButton onClick={onCancel}>취소하기</CancelButton>
        </ModalButtons>
      </ModalContent>
    </ModalWrapper>
  );
};

export default Modal;

const ModalWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100%;
  top: 0;
  width: 412px;
  margin: -12px;
  background-color: black;
  opacity: 0.9;
  z-index: 9;
`;

const ModalContent = styled.div`
  height: 110px;
  text-align: center;
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ModalText = styled.span`
  font-size: 1.5rem;
  color: white;
`;

const ModalButtons = styled.div`
  width: 324px;
  height: 96px;
  margin-top: 3rem;
`;

const DeleteButton = styled.button`
  width: 200px;
  height: 48px;
  background-color: #0095f6;
  color: white;
  border: none;
  border-radius: 8px;
  margin-bottom: 10px;
  cursor: pointer;
  border-radius: 16px;
`;

const CancelButton = styled.button`
  width: 200px;
  height: 48px;
  background-color: #e5e5e5;
  color: black;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  border-radius: 16px;
`;
