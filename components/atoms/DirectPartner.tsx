import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

interface Item {
  userId: string;
  name: string;
  profileUrl: string;
}

const DirectPartner: React.FC<{ selectedItem: Item | null }> = ({
  selectedItem,
}) => {
  return (
    <>
      <Partner>
        {selectedItem && (
          <Picture>
            <Img>
              <Image
                src={selectedItem.profileUrl}
                alt="프로필"
                width={56}
                height={56}
              />
            </Img>
          </Picture>
        )}
        <Name>{selectedItem?.name}</Name>
        <Id>{selectedItem?.userId} Inssagram</Id>
        <Profile>
          <Link href="/my">프로필 보기</Link>
        </Profile>
      </Partner>
    </>
  );
};

export default DirectPartner;

const Partner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
  width: 100%;
`;

const Picture = styled.div`
  padding: 16px 0;
`;

const Img = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  border-radius: 100%;
`;

const Name = styled.span`
  text-align: center;
  font-size: 20px;
  font-weight: 600;
`;

const Id = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: #737373;
  padding: 12px 0 24px 0;
`;

const Profile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 103px;
  height: 32px;
  border-radius: 10px;
  background-color: #efefef;
  font-size: 14px;
`;
