import Image from "next/image";
import * as SC from "./styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const Notifications: React.FC = () => {
  return (
    <>
      <SC.Header>
        <SC.BackIcon>
          <FontAwesomeIcon icon={faChevronLeft} fontSize={24} />
        </SC.BackIcon>
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
