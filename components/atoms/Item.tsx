import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { CloseButton } from "@/components/atoms/Button";

interface SearchItemData {
  memberId: number;
  email: string;
  nickName: string;
  friendStatus: boolean;
  job: string;
  image: string;
}

interface SearchItemProps {
  result: SearchItemData;
  onClick?: (memberId: number) => void;
  isHistory?: boolean;
}

export const SearchItem: React.FC<SearchItemProps> = ({
  result,
  onClick,
  isHistory,
}) => {
  const handleItemClick = () => {
    if (onClick) {
      onClick(result.memberId);
    }
  };
  return (
    <>
      <ItemContainer>
        <ClickTo href="/" onClick={handleItemClick}>
          <AccountImg
            src={result.image}
            alt="프로필 이미지"
            width={44}
            height={44}
          />
          <ContentArea>
            <AccountInfo>
              <Id>{result.nickName}</Id>
              <Status>
                <Job>{result.job}</Job>
                <Follow>{result.friendStatus ? "" : "팔로잉"}</Follow>
              </Status>
            </AccountInfo>
            {isHistory ? <CloseButton onClick={onClick} /> : ""}
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

const AccountImg = styled(Image)`
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
