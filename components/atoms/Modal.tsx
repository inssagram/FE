import Image from "next/image";
import { useState } from "react";
import * as SC from "../styled/atoms_modal";
import {
  faCalendarDays,
  faLocationDot,
  faChevronLeft,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { LinkCopyButton } from "./Button";
import SearchInput from "../Chat/SearchInput";
import { PostDetailData } from "@/types/PostTypes";

interface EllipsisModalProps {
  post: { postId: number };
  handleAccountInfo: () => void;
  handleInfoClose: () => void;
}

export const EllipsisModal: React.FC<EllipsisModalProps> = ({
  post,
  handleAccountInfo,
  handleInfoClose,
}) => {
  return (
    <SC.ModalBackdrop>
      <SC.ModalContent>
        <SC.CopyLink>
          <LinkCopyButton linkCopy={`localhost:3000/post/${post.postId}`} />
        </SC.CopyLink>
        <SC.AccountInfo onClick={handleAccountInfo}>
          이 계정 정보
        </SC.AccountInfo>
        <SC.CloseBtn onClick={handleInfoClose}>취소</SC.CloseBtn>
      </SC.ModalContent>
    </SC.ModalBackdrop>
  );
};

interface MyEllipsisModalProps {
  post: { postId: number };
  handlePostDelete: () => void;
  handleEditPost: () => void;
  handleAccountInfo: () => void;
  handleInfoClose: () => void;
}

export const MyEllipsisModal: React.FC<MyEllipsisModalProps> = ({
  post,
  handlePostDelete,
  handleEditPost,
  handleAccountInfo,
  handleInfoClose,
}) => {
  return (
    <SC.ModalBackdrop>
      <SC.ModalContent>
        <SC.DeletePost onClick={handlePostDelete}>삭제하기</SC.DeletePost>
        <SC.EditPost onClick={handleEditPost}>수정하기</SC.EditPost>
        <SC.MyCopyLink>
          <LinkCopyButton linkCopy={`localhost:3000/post/${post.postId}`} />
        </SC.MyCopyLink>
        <SC.AccountInfo onClick={handleAccountInfo}>
          이 계정 정보
        </SC.AccountInfo>
        <SC.CloseBtn onClick={handleInfoClose}>취소</SC.CloseBtn>
      </SC.ModalContent>
    </SC.ModalBackdrop>
  );
};

interface AccountInfoModalProps {
  post: { nickName: string; memberImage: string };
  handleInfoClose?: () => void;
}

export const AccountInfoModal: React.FC<AccountInfoModalProps> = ({
  post,
  handleInfoClose,
}) => {
  return (
    <SC.ModalBackdrop>
      <SC.ModalContent>
        <SC.ModalTitle>이 계정 정보</SC.ModalTitle>
        <SC.InfoContent>
          <SC.AccountArea>
            <SC.Account>
              <Image
                src={
                  post.memberImage ? post.memberImage : "/images/noProfile.jpg"
                }
                alt="프로필"
                width={78}
                height={78}
                style={{ borderRadius: "100%" }}
              />
            </SC.Account>
            <SC.Id>{post.nickName}</SC.Id>
          </SC.AccountArea>
          <SC.InfoArea>
            <SC.Detail>
              <SC.Icon icon={faCalendarDays} fontSize={24} />
              <SC.Infos>
                <SC.SubTitle>가입한 날짜</SC.SubTitle>
                <SC.SubContent>2023년 10월</SC.SubContent>
              </SC.Infos>
            </SC.Detail>
            <SC.Detail>
              <SC.Icon icon={faLocationDot} fontSize={24} />
              <SC.Infos>
                <SC.SubTitle>계정 기본 위치</SC.SubTitle>
                <SC.SubContent>대한민국</SC.SubContent>
              </SC.Infos>
            </SC.Detail>
          </SC.InfoArea>
        </SC.InfoContent>
        <SC.CloseBtn onClick={handleInfoClose}>닫기</SC.CloseBtn>
      </SC.ModalContent>
    </SC.ModalBackdrop>
  );
};

interface EditFormData {
  type: string;
  postId: number;
  contents: string;
  location: string | null;
  taggedMemberIds: number[] | null;
}

interface PostEditModalProps {
  post: PostDetailData;
  editFormData: EditFormData;
  handlePostUpdate: () => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleInfoClose: () => void;
}

export const PostEditModal: React.FC<PostEditModalProps> = ({
  post,
  editFormData,
  handlePostUpdate,
  handleInputChange,
  handleInfoClose,
}) => {
  return (
    <SC.ModalBackdrop>
      <SC.ModalContent>
        <SC.Header>
          <SC.BackButton onClick={handleInfoClose}>
            <SC.HeaderIcon icon={faChevronLeft} fontSize={24} />
          </SC.BackButton>
          <SC.Title>게시글 수정</SC.Title>
          <SC.UpdateButton onClick={handlePostUpdate}>
            <SC.HeaderIcon icon={faCheck} fontSize={24} />
          </SC.UpdateButton>
        </SC.Header>

        <SC.ProfileArea>
          <SC.Profile>
            <Image
              src={
                post.memberImage ? post.memberImage : "/images/noProfile.jpg"
              }
              alt="프로필"
              width={40}
              height={40}
              style={{ borderRadius: "100%" }}
            />
            <SC.ID>{post.nickName}</SC.ID>
            <SC.Date>{post.createdAt}</SC.Date>
          </SC.Profile>
        </SC.ProfileArea>

        <SC.ContentContainer>
          <SC.ContentArea>
            <SC.Content
              src={post.image ? post.image[0] : "/images/noImage.svg"}
              alt="게시글 이미지"
              layout="responsive"
              width={10}
              height={10}
            />
          </SC.ContentArea>
          <SC.EditArea>
            <SC.EditInput
              type="text"
              value={editFormData.contents}
              placeholder="게시글을 수정해보세요"
              onChange={handleInputChange}
            />
          </SC.EditArea>
        </SC.ContentContainer>
      </SC.ModalContent>
    </SC.ModalBackdrop>
  );
};

interface CommentDeleteModalProps {
  onDelete: () => void;
  onCancel: () => void;
}

export const CommentDeleteModal: React.FC<CommentDeleteModalProps> = ({
  onDelete,
  onCancel,
}) => {
  return (
    <SC.ModalBackdrop>
      <SC.ModalContent>
        <SC.ModalText>댓글을 정말 삭제하시겠습니까?</SC.ModalText>
        <SC.ModalButtons>
          <SC.DeleteButton onClick={onDelete}>삭제하기</SC.DeleteButton>
          <SC.CancelButton onClick={onCancel}>취소하기</SC.CancelButton>
        </SC.ModalButtons>
      </SC.ModalContent>
    </SC.ModalBackdrop>
  );
};
