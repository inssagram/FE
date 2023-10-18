import * as SC from "./styled";
import Image from "next/image";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import EllipsisModal from "../../modal/EllipsisModal/EllipsisModal";
import AccountInfoModal from "../../modal/AccountInfoModal/AccountInfoModal";

interface Post {
  id: number;
  name: string;
  profileUrl: string;
  imageUrl: string;
  content: string;
}

const PostHeader: React.FC<{ post: Post }> = ({ post }) => {
  const [isEllipsisModalOpen, setIsEllipsisModalOpen] = useState(false);
  const [isAccountInfoModalOpen, setIsAccountInfoModalOpen] = useState(false);

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
      <SC.Loading>
        <FontAwesomeIcon icon={faSpinner} fontSize={"24px"} />
      </SC.Loading>
    );
  }

  return (
    <>
      <SC.ContentArea>
        <SC.ContentHeader>
          <SC.AccountArea>
            <SC.Profile>
              <Image
                src={post.profileUrl}
                alt="프로필"
                width={32}
                height={32}
                style={{ borderRadius: "100%" }}
              />
            </SC.Profile>
            <SC.Id>{post.name}</SC.Id>
            <SC.FollowBtn>팔로우</SC.FollowBtn>
          </SC.AccountArea>
          <SC.EtcIcon onClick={handleEtcClick}>
            <FontAwesomeIcon icon={faEllipsis} fontSize={"24px"} />
          </SC.EtcIcon>
          {isEllipsisModalOpen && (
            <EllipsisModal
              handleAccountInfoClick={handleAccountInfoClick}
              handleEtcClick={handleEtcClick}
              post={post}
            />
          )}
          {isAccountInfoModalOpen && (
            <AccountInfoModal handleInfoClose={handleInfoClose} post={post} />
          )}
        </SC.ContentHeader>
      </SC.ContentArea>
    </>
  );
};

export default PostHeader;
