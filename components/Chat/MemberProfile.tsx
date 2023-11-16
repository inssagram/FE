import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

interface MemberInfoData {
  chatRoomId: number;
  secondMemberId: number;
  secondMemberNickname: string;
  secondMemberProfile: string;
  secondMemberFollowState: boolean;
  secondMemberFollowCounts: number;
  secondMemberPostCounts: number;
}

interface MemberInfoProps {
  memberInfo: MemberInfoData | null;
}

const MemberProfile: React.FC<MemberInfoProps> = ({ memberInfo }) => {
  return (
    <>
      {memberInfo && (
        <Partner>
          <Profile>
            <Image
              src={
                memberInfo.secondMemberProfile
                  ? memberInfo.secondMemberProfile
                  : "/images/noProfile.jpg"
              }
              alt="프로필"
              width={56}
              height={56}
            />
          </Profile>
          <Name>{memberInfo.secondMemberNickname}</Name>
          <Desc>{memberInfo.secondMemberNickname} | Inssagram</Desc>
          <ClickTo>
            <Link href={`/user/${memberInfo.secondMemberId}`}>프로필 보기</Link>
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
