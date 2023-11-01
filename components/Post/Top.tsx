import axios from "axios";
import styled from "styled-components";
import Image from "next/image";
import { useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import {
  EllipsisModal,
  MyEllipsisModal,
  AccountInfoModal,
} from "../atoms/Modal";

interface PostData {
  postId: number;
  memberId: number;
  image: string;
  contents: string;
  likeCount: number;
  commentsCounts: number;
  hashTags: string;
}

const PostTop: React.FC<{ post: PostData | undefined }> = ({ post }) => {
  const userInfo = useSelector((state: any) => state.user);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isEllipsisModalOpen, setIsEllipsisModalOpen] = useState(false);
  const [isAccountInfoModalOpen, setIsAccountInfoModalOpen] = useState(false);

  const handleFollowClick = () => {
    setIsFollowing(!isFollowing);
    axios
      .post("http://localhost:3001/followStatus", {
        follow: !isFollowing,
      })
      .then((response) => {
        console.log("팔로우 상태가 서버에 업데이트되었습니다.", response);
      })
      .catch((error) => {
        console.error("팔로우 상태가 업데이트 중 오류가 발생했습니다.", error);
      });
  };

  const handleEtcClick = () => {
    setIsEllipsisModalOpen(!isEllipsisModalOpen);
  };

  const handleAccountInfoClick = () => {
    setIsEllipsisModalOpen(false);
    setIsAccountInfoModalOpen(true);
  };

  const handleInfoClose = () => {
    setIsAccountInfoModalOpen(false);
  };

  if (!post) {
    return (
      <Loading>
        <FontAwesomeIcon icon={faSpinner} fontSize={"24px"} />
      </Loading>
    );
  }

  return (
    <Top>
      <Account>
        <ProfileImage
          src="/images/noProfile.jpg"
          alt="프로필"
          width={32}
          height={32}
          style={{ borderRadius: "100%" }}
        />
        <Id>{post.memberId}</Id>
        <FollowBtn
          onClick={handleFollowClick}
          style={{
            color: isFollowing ? "#262626" : "#0095f6",
          }}
        >
          {isFollowing ? `팔로잉` : `팔로우`}
        </FollowBtn>
      </Account>
      <EtcIcon onClick={handleEtcClick}>
        <FontAwesomeIcon icon={faEllipsis} fontSize={"24px"} />
      </EtcIcon>
      {userInfo.id === post?.memberId
        ? isEllipsisModalOpen && (
            <MyEllipsisModal
              handleAccountInfoClick={handleAccountInfoClick}
              handleEtcClick={handleEtcClick}
              post={post}
            />
          )
        : isEllipsisModalOpen && (
            <EllipsisModal
              handleAccountInfoClick={handleAccountInfoClick}
              handleEtcClick={handleEtcClick}
              post={post}
            />
          )}
      {isAccountInfoModalOpen && (
        <AccountInfoModal handleInfoClose={handleInfoClose} post={post} />
      )}
    </Top>
  );
};

const Top = styled.div`
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

export default PostTop;
