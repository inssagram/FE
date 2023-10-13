import Image from "next/image";
import * as SC from "@/components/styled/notifications";
import { BackChevron } from "@/components/atoms/Icons";

const Notifications: React.FC = () => {
  return (
    <>
      <SC.Header>
        <BackChevron />
        <SC.PageTitle>알림</SC.PageTitle>
      </SC.Header>
      <SC.Notifications>
        <SC.Date>오늘</SC.Date>
        <SC.ContentArea>
          <SC.Account>
            <Image
              src="/images/profile.jpg"
              alt="프로필"
              width={44}
              height={44}
              style={{ borderRadius: "100%" }}
            />
          </SC.Account>
          <SC.Content>
            king_jungho님이 회원님의 스토리를 좋아합니다. 2시간
          </SC.Content>
          <SC.Board>
            <Image
              src="/images/coffee.jpg"
              alt="게시물"
              width={44}
              height={44}
            />
          </SC.Board>
        </SC.ContentArea>
        <SC.ContentArea>
          <SC.Account>
            <Image
              src="/images/profile.jpg"
              alt="프로필"
              width={44}
              height={44}
              style={{ borderRadius: "100%" }}
            />
          </SC.Account>
          <SC.Content>
            king_jungho님이 회원님의 스토리를 좋아합니다. 2시간
          </SC.Content>
          <SC.Follow>팔로우</SC.Follow>
        </SC.ContentArea>
      </SC.Notifications>
    </>
  );
};

export default Notifications;
