import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { DeleteButton } from "@/components/atoms/Button";
import { SearchItemData } from "@/types/SearchItemTypes";

interface SearchItemProps {
  result: SearchItemData;
  handleClick?: (memberId: number) => void;
  handleDelete?: (searched: string) => void;
  isHistory?: boolean;
}

export const SearchItem: React.FC<SearchItemProps> = ({
  result,
  handleClick,
  handleDelete,
  isHistory,
}) => {
  const handleSearchItemClick = () => {
    if (handleClick) {
      handleClick(result.memberId);
    }
  };

  const handleSearchItemDeleteClick = () => {
    if (handleDelete && isHistory) {
      handleDelete(result.searched);
    }
  };

  return (
    <>
      {isHistory ? (
        <ItemContainer>
          <ClickTo
            href={`/user/${result.memberId}`}
            onClick={handleSearchItemClick}
          >
            <AccountImg
              src={result.image ? result?.image : "/images/noProfile.jpg"}
              alt="프로필 이미지"
              width={44}
              height={44}
            />
            <ContentArea>
              <AccountInfo>
                <Id>{result.searched}</Id>
                <Status>
                  <Job>{result.job}</Job>
                  <Follow>{result.friendStatus ? "팔로잉" : ""}</Follow>
                </Status>
              </AccountInfo>
              <DeleteButton onClick={handleSearchItemDeleteClick} />
            </ContentArea>
          </ClickTo>
        </ItemContainer>
      ) : (
        <ItemContainer>
          <ClickTo
            href={`/user/${result.memberId}`}
            onClick={handleSearchItemClick}
          >
            {result.nickName.includes("#") ? (
              <HashtagImg>
                <Image
                  src="/images/hashtag.jpg"
                  alt="프로필 이미지"
                  width={16}
                  height={16}
                />
              </HashtagImg>
            ) : (
              <AccountImg
                src={result.image ? result.image : "/images/noProfile.jpg"}
                alt="프로필 이미지"
                width={44}
                height={44}
              />
            )}
            <ContentArea>
              <AccountInfo>
                <Id>{result.nickName}</Id>
                <Status>
                  <Job>{result.job}</Job>
                  <Follow>{result.friendStatus ? "팔로잉" : ""}</Follow>
                </Status>
              </AccountInfo>
            </ContentArea>
          </ClickTo>
        </ItemContainer>
      )}
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
  padding: 8px 16px;
  align-items: center;
  justify-content: space-around;
`;

const HashtagImg = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 1px solid #ccc;
  border-radius: 100%;
  margin-right: 12px;
  width: 44px;
  height: 44px;
`;

const AccountImg = styled(Image)`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
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

const Status = styled.p`
  display: flex;
  flex-direction: row;
`;

const Job = styled.span`
  padding-right: 5px;
  font-size: inherit;
  color: #0095f6;
`;

const Follow = styled.span`
  font-size: inherit;
  color: #7c7c7c;
`;
