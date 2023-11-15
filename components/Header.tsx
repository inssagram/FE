import axios from "axios";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus, faHeart } from "@fortawesome/free-regular-svg-icons";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import getNotificationAllAxios from "@/services/notificationInfo/getNotificationAll";
import { RootState } from "@/src/redux/Posts/store";


interface HeaderProps {
  setSelectedImage: (src: string) => void;
}

interface NotificationData {
  unreadCount: number;
}

const Header: React.FC<HeaderProps> = (props) => {
  const userInfo = useSelector((state: RootState) => state.user.member);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [showBubble, setShowBubble] = useState<boolean>(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const eventSource = new EventSource(
      `${process.env.BASE_URL}/notification/subscribe/${userInfo?.member_id}`
    );

    eventSource.addEventListener("sse", (event) => {
      const eventData = JSON.parse(event.data);
      console.log("message: " + eventData.message);
      console.log("unreadCount: " + eventData.unreadCount);
      setUnreadCount(eventData.unreadCount);
    });

    eventSource.onerror = (error) => {
      console.error("SSE connection error:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBubble(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [userInfo?.member_id]);

  // const handleNotification = () => {
  //   setNotificationCount(notificationCount + 1);
  // };

  // const handleNotificationRead = () => {
  //   if (notificationCount > 0) {
  //     setNotificationCount(notificationCount - 1);
  //   }
  // };

  const createBoards = () => {
    router.push('create/details')
    
  };

  return (
    <Container>
      <Title>
        <Link href="/">Inssagram</Link>
      </Title>
      <IconPannels>
        <PlusBtn id="createBoards" onClick={createBoards}>
          <FontAwesomeIcon icon={faSquarePlus} fontSize={"24px"} />
        </PlusBtn>
        {unreadCount > 0 && <NotiAlarm />}
        {showBubble && unreadCount > 0 ? (
          <HeartBtn>
            <Link href="/notifications">
              <FontAwesomeIcon icon={faHeart} fontSize={"24px"} />
              {/* {notificationCount > 0 && <span>{notificationCount}</span>} */}
            </Link>
            <SpeechBubble>
              <FontAwesomeIcon
                icon={faComment}
                fontSize={"18px"}
                flip="horizontal"
              />
              <NotiCount>{unreadCount}</NotiCount>
            </SpeechBubble>
          </HeartBtn>
        ) : (
          <HeartBtn>
            <Link href="/notifications">
              <FontAwesomeIcon icon={faHeart} fontSize={"24px"} />
            </Link>
          </HeartBtn>
        )}
      </IconPannels>
    </Container>
  );
};

export default Header;

const Title = styled.h1`
  font-size: 25px;
`;

const Container = styled.div`
  width: 412px;
  height: 44px;
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 16px;
  position: fixed;
  background-color: #ffffff;
  color: #222222;
  z-index: 10;
  border-bottom: 1px solid #e2e2e2;
`;

const IconPannels = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
`;

const PlusBtn = styled.button`
  border-style: none;
  background-color: transparent;
  padding: 12px;
  color: black;
`;

const HeartBtn = styled.button`
  position: relative;
  border-style: none;
  background-color: transparent;
`;

const NotiAlarm = styled.span`
  position: absolute;
  top: 10px;
  right: 15px;
  width: 10px;
  height: 10px;
  border: 1.5px solid #fff;
  border-radius: 50%;
  color: #ffffff;
  background-color: red;
  z-index: 100;
`;

const NotiCount = styled.span`
  padding-left: 2px;
`;

const SpeechBubble = styled.div`
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: -6px;
  top: 45px;
  height: 33px;
  min-width: 46px;
  max-width: 50px;
  padding: 5px;
  border-radius: 7px;
  background: #ff3040;
  color: #ffffff;

  &::before {
    content: "";
    position: absolute;
    bottom: 100%;
    left: 50%;
    border-width: 8px;
    border-style: solid;
    border-color: transparent transparent #ff3040;
    transform: translateX(-20%);
  }
`;
