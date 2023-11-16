import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faHeart as fasHeart,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

export const CopyLinkButton: React.FC<{ linkToCopy: string }> = ({
  linkToCopy,
}) => {
  const copyToClipboard = () => {
    const tempInput = document.createElement("input");
    tempInput.value = linkToCopy;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    alert("링크가 복사되었습니다.");
  };

  return <CopyLink onClick={copyToClipboard}>링크 복사</CopyLink>;
};

interface CloseButtonProps {
  onClick?: () => void;
}
export const CloseButton: React.FC<CloseButtonProps> = ({ onClick }) => {
  return (
    <CloseBtn onClick={onClick}>
      <FontAwesomeIcon
        icon={faXmark}
        fontSize={16}
        style={{ color: "#737373" }}
      />
    </CloseBtn>
  );
};

interface FollowButtonProps {
  onClick?: () => void;
  isFollowing: boolean;
}

export const FollowButton: React.FC<FollowButtonProps> = ({
  onClick,
  isFollowing,
}) => {
  return (
    <FollowBtn
      onClick={onClick}
      style={{
        background: isFollowing ? "#efefef" : "#0095f6",
        color: isFollowing ? "#222222" : "#ffffff",
      }}
    >
      {isFollowing ? "팔로잉" : "팔로우"}
    </FollowBtn>
  );
};

interface HeartButtonProps {
  isLiked: boolean;
  handleLikeClick: () => void;
}

export const HeartButton: React.FC<HeartButtonProps> = ({
  isLiked,
  handleLikeClick,
}) => {
  return (
    <HeartBtn onClick={handleLikeClick}>
      <FontAwesomeIcon
        icon={isLiked ? fasHeart : farHeart}
        style={{ color: isLiked ? "red" : "inherit" }}
        fontSize={"24px"}
      />
    </HeartBtn>
  );
};

const CopyLink = styled.span`
  width: 100%;
  border: none;
  padding: 4px 8px;
  background-color: transparent;
`;

const CloseBtn = styled.button`
  padding: 8px;
  border: none;
  background-color: transparent;
`;

const FollowBtn = styled.button`
  width: 82px;
  height: 32px;
  padding: 7px 16px;
  border: none;
  border-radius: 10px;
  color: #ffffff;
  background-color: #0095f6;
`;

const HeartBtn = styled.button`
  border: none;
  background-color: transparent;
`;
