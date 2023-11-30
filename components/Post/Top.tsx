import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@/src/redux/Posts/store";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import {
  EllipsisModal,
  MyEllipsisModal,
  AccountInfoModal,
  PostEditModal,
} from "../atoms/Modal";
import { handleError } from "@/utils/errorHandler";
import putUpdatePostAxios from "@/services/postInfo/putUpdatePost";
import deletePostAxios from "@/services/postInfo/deletePost";
import postMemberFollowAxios from "@/services/userInfo/postMemberFollow";
import { UserInfoData } from "@/types/UserTypes";
import { PostDetailData } from "@/types/PostTypes";

interface PostContentsProps {
  post: PostDetailData;
}

const PostTop: React.FC<PostContentsProps> = ({ post }) => {
  const userInfo = useSelector(
    (state: RootState) => state.user.member
  ) as UserInfoData;
  const [isFollowing, setIsFollowing] = useState(false);
  const [isEllipsisModalOpen, setIsEllipsisModalOpen] = useState(false);
  const [isAccountInfoModalOpen, setIsAccountInfoModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    type: "post",
    postId: "",
    contents: "",
    location: "",
    taggedMemberIds: [],
  });
  const router = useRouter();
  const isCurrentUserPost = userInfo.member_id === post.memberId;
  const isCurrentUser = userInfo.nickname === post.nickName;

  const handleFollowClick = async () => {
    try {
      const followId = post.memberId;
      const res = await postMemberFollowAxios(followId);
      console.log("follow member success", res);
      setIsFollowing(!isFollowing);
    } catch (err) {
      handleError(err, "follow member failed");
    }
  };

  const handleUpdatePost = async (
    postId: number,
    contents: string,
    location: string | null,
    taggedMemberIds: number[] | null
  ) => {
    try {
      console.log("API 호출 전:", contents, location, taggedMemberIds);

      const res = await putUpdatePostAxios("post", postId, {
        contents,
        location,
        taggedMemberIds,
      });
      console.log("게시글 업데이트 성공", res);
      router.push(`/my/feeds/${post.postId}`);
    } catch (err) {
      handleError(err, "게시글 업데이트 실패");
    }
  };

  const handlePostUpdate = async () => {
    try {
      await handleUpdatePost(
        post.postId,
        editFormData.contents,
        editFormData.location,
        editFormData.taggedMemberIds
      );
    } catch (err) {
      handleError(err, "게시글 업데이트 실패");
    }
  };

  const handlePostDelete = async (postId: number) => {
    try {
      const res = await deletePostAxios(postId);
      console.log("delete Post success", res);
    } catch (err) {
      handleError(err, "delete Post failed");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEditFormData((prevData) => ({
      ...prevData,
      contents: value,
    }));
  };

  const handleEtcClick = () => {
    setIsEllipsisModalOpen(true);
  };

  const handleAccountInfoClick = () => {
    setIsEllipsisModalOpen(false);
    setIsAccountInfoModalOpen(true);
  };

  const handleEditClick = () => {
    setIsEllipsisModalOpen(false);
    setIsEditModalOpen(true);
    setEditFormData({
      ...editFormData,
      contents: post.contents,
      location: post.location || "",
      taggedMemberIds: [],
    });
  };

  const handleInfoClose = () => {
    setIsEllipsisModalOpen(false);
    setIsAccountInfoModalOpen(false);
    setIsEditModalOpen(false);
  };

  if (!post) {
    return (
      <Loading>
        <FontAwesomeIcon icon={faSpinner} fontSize={"24px"} />
      </Loading>
    );
  }

  return (
    <TopContainer>
      <Account>
        <Link href={isCurrentUser ? "/my" : `/user/${post.memberId}`}>
          <ProfileImage
            src={post.memberImage ? post.memberImage : "/images/noProfile.jpg"}
            alt="프로필"
            width={32}
            height={32}
            style={{ borderRadius: "100%" }}
          />
        </Link>
        <Id>{post.nickName}</Id>
        {!isCurrentUserPost && (
          <FollowBtn
            onClick={handleFollowClick}
            style={{
              color: isFollowing ? "#262626" : "#0095f6",
            }}
          >
            {isFollowing ? `팔로잉` : `팔로우`}
          </FollowBtn>
        )}
      </Account>
      <EtcIcon onClick={handleEtcClick}>
        <FontAwesomeIcon icon={faEllipsis} fontSize={"24px"} />
      </EtcIcon>
      {isCurrentUserPost
        ? isEllipsisModalOpen && (
            <MyEllipsisModal
              post={post}
              handlePostDelete={() => handlePostDelete(post.postId)}
              handleEditPost={handleEditClick}
              handleAccountInfo={handleAccountInfoClick}
              handleInfoClose={handleInfoClose}
            />
          )
        : isEllipsisModalOpen && (
            <EllipsisModal
              post={post}
              handleAccountInfo={handleAccountInfoClick}
              handleInfoClose={handleInfoClose}
            />
          )}
      {isAccountInfoModalOpen && (
        <AccountInfoModal post={post} handleInfoClose={handleInfoClose} />
      )}
      {isEditModalOpen && (
        <PostEditModal
          post={post}
          editFormData={editFormData}
          handlePostUpdate={() => handlePostUpdate(editFormData.contents)}
          handleInputChange={handleInputChange}
          handleInfoClose={handleInfoClose}
        />
      )}
    </TopContainer>
  );
};

export default PostTop;

const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  font-size: 14px;
`;

const Account = styled.div`
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-grow: 1;
  flex-shrink: 1;
  max-width: calc(100% - 48px);
  padding: 14px 4px 14px 16px;
`;

const ProfileImage = styled(Image)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Id = styled.button`
  margin-left: 12px;
  padding: 2px;
  border: none;
  background-color: transparent;
`;

const FollowBtn = styled.button`
  border: none;
  margin-left: 18px;
  background-color: transparent;
`;

const EtcIcon = styled.span`
  height: 40px;
  padding: 8px 16px 8px 8px;
`;

const Loading = styled.div`
  position: absolute;
  top: 25%;
  left: 50%;
`;
