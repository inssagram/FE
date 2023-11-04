import React from "react";
import * as SC from "@/components/styled/my_feeds_comments";

interface ModalProps {
    onDelete: ()=> void;
    onCancel: ()=> void;
}

const Modal:React.FC<ModalProps> = ({onDelete, onCancel}) => {
    return(
    <SC.ModalWrapper>
      <SC.ModalContent>
        <SC.ModalText>댓글을 삭제하시겠습니까?</SC.ModalText>
        <SC.ModalButtons>
          <SC.DeleteButton onClick={onDelete}>삭제하기</SC.DeleteButton>
          <SC.CancelButton onClick={onCancel}>취소하기</SC.CancelButton>
        </SC.ModalButtons>
      </SC.ModalContent>
    </SC.ModalWrapper>

    )
}

export default Modal;