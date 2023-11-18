import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { MemberInfoData } from "@/types/ChatRoomTypes";

interface MemberInfoProps {
  receiver: MemberInfoData | null;
}

const MemberProfile: React.FC<MemberInfoProps> = ({ receiver }) => {
  return (
    <>
      {receiver && (
        <Partner>
          <Profile>
            <Image
              src={
                receiver.memberProfile
                  ? receiver.memberProfile
                  : "/images/noProfile.jpg"
              }
              alt="프로필"
              width={56}
              height={56}
            />
          </Profile>
          <Name>{receiver.memberNickname}</Name>
          <Desc>{receiver.memberNickname} | Inssagram</Desc>
          <ClickTo>
            <Link href={`/user/${receiver.memberId}`}>프로필 보기</Link>
          </ClickTo>
        </Partner>
      )}
    </>
  );
};

export default MemberProfile;

const Partner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
  width: 100%;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  border-radius: 100%;
  padding: 16px 0;
`;

const Name = styled.span`
  text-align: center;
  font-size: 20px;
  font-weight: 600;
`;

const Desc = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: #737373;
  padding: 12px 0 24px 0;
`;

const ClickTo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 103px;
  height: 32px;
  border-radius: 10px;
  background-color: #efefef;
  font-size: 14px;
`;
