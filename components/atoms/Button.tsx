import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faHeart as fasHeart,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

interface DeleteButtonProps {
  onClick: () => void;
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick }) => {
  return (
    <Delete onClick={onClick}>
      <Icon icon={faXmark} fontSize={16} />
    </Delete>
  );
};

interface FollowButtonProps {
  isFollowing: boolean;
  onClick?: () => void;
}

export const FollowButton: React.FC<FollowButtonProps> = ({
  onClick,
  isFollowing,
}) => {
  return (
    <Follow
      onClick={onClick}
      style={{
        background: isFollowing ? "#efefef" : "#0095f6",
        color: isFollowing ? "#222222" : "#ffffff",
      }}
    >
      {isFollowing ? "팔로잉" : "팔로우"}
    </Follow>
  );
};

interface HeartButtonProps {
  isLiked: boolean;
  onClick: () => void;
}

export const HeartButton: React.FC<HeartButtonProps> = ({
  isLiked,
  onClick,
}) => {
  return (
    <Heart onClick={onClick}>
      <FontAwesomeIcon
        icon={isLiked ? fasHeart : farHeart}
        style={{ color: isLiked ? "red" : "inherit" }}
        fontSize={24}
      />
    </Heart>
  );
};

export const LinkCopyButton: React.FC<{ linkCopy: string }> = ({
  linkCopy,
}) => {
  const copyToClipboard = () => {
    const tempInput = document.createElement("input");
    tempInput.value = linkCopy;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    alert("링크가 복사되었습니다.");
  };

  return <Copy onClick={copyToClipboard}>링크 복사</Copy>;
};

const Delete = styled.button`
  padding: 8px;
  border: none;
  background-color: transparent;
`;

const Icon = styled(FontAwesomeIcon)`
  width: 24px;
  height: 24px;
  margin-right: 8px;
  color: "#737373";
`;

const Copy = styled.button`
  width: 100%;
  border: none;
  padding: 4px 8px;
  background-color: transparent;
`;

const Follow = styled.button`
  display: flex;
  align-items: center;
  margin-left: 12px;
  padding: 7px 16px;
  border: none;
  border-radius: 10px;
  min-width: 71px;
  height: 32px;
  font-size: 14px;
  color: #ffffff;
  background-color: #0095f6;
`;

const Heart = styled.button`
  border: none;
  background-color: transparent;
`;
