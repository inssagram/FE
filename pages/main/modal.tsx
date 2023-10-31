import React from "react";
import * as SC from "@/components/styled/my_feeds_comments";
import { PostType } from "@/src/redux/Posts/postSlice";
import {useState} from 'react';

interface ModalProps {
    onEdit: (postId: number, updatedPostData: PostType) => void;
    onDelete: ()=> void;
    onCancel: ()=> void;
}

const Modal:React.FC<ModalProps> = ({onEdit, onDelete, onCancel}) => {
  const [updatedData, setUpdatedData] = useState<PostType>({
    postId: 1,
    memberId: 1,
    image: "",
    contents: "",
    likeCount: 0,
    commentsCounts: 0,
    // ...다른 필드들을 초기화하거나 사용자 입력에 따라 설정
  });
  
    return(
<SC.ModalWrapper>
      <SC.ModalContent>
        <SC.ModalButtons>
        <SC.EditButton onClick={() => onEdit(1, updatedData)}>수정하기</SC.EditButton>
          <SC.DeleteButton onClick={onDelete}>삭제하기</SC.DeleteButton>
          <SC.CancelButton onClick={onCancel}>취소하기</SC.CancelButton>
        </SC.ModalButtons>
      </SC.ModalContent>
    </SC.ModalWrapper>

    )
}

export default Modal;