import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faXmark } from "@fortawesome/free-solid-svg-icons";

interface SearchItemProps {
  searchTerm: string;
  onClick?: () => void;
  isHistory?: boolean;
}

export const SearchItem: React.FC<SearchItemProps> = ({
  searchTerm,
  onClick,
  isHistory,
}) => {
  return (
    <>
      <ItemContainer>
        <ClickTo href="/my">
          <ContentImg
            src="/images/noProfile.jpg"
            alt="프로필 이미지"
            width={44}
            height={44}
          />
          <ContentArea>
            <AccountInfo>
              <Id>{searchTerm}</Id>
              <Follow>팔로우</Follow>
            </AccountInfo>
            {isHistory ? (
              <CloseBtn onClick={onClick}>
                <FontAwesomeIcon
                  icon={faXmark}
                  fontSize={16}
                  style={{ color: "#737373" }}
                />
              </CloseBtn>
            ) : (
              <FollowBtn>팔로우</FollowBtn>
            )}
          </ContentArea>
        </ClickTo>
      </ItemContainer>
    </>
  );
};

const ItemContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 8px 0;
`;

const ClickTo = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 16px;
`;

const ContentImg = styled(Image)`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 1px solid #ccc;
  border-radius: 100%;
  margin-right: 12px;
`;

const ContentArea = styled.div`
  width: 324px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 14px;
`;

const AccountInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 36px;
`;

const Id = styled.span`
  color: inherit;
  font-size: inherit;
  padding-bottom: 3px;
`;

const Follow = styled.span`
  font-size: inherit;
  color: #7c7c7c;
`;

const CloseBtn = styled.button`
  padding: 8px;
  border: none;
  background-color: transparent;
`;

const FollowBtn = styled.button`
  padding: 7px 16px;
  border: none;
  border-radius: 10px;
  color: #ffffff;
  background-color: #0095f6;
`;
