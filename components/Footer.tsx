import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faMagnifyingGlass,
  faFilm,
  faPaperPlane,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { RootState } from "@/src/redux/Posts/store";

const Footer: React.FC = () => {
  const userInfo = useSelector((state: RootState) => state.user.member);
  const [unreadChatCount, setUnreadChatCount] = useState<number>(0);
  const [showBubble, setShowBubble] = useState<boolean>(true);

  useEffect(() => {
    const eventSource = new EventSource(
      `${process.env.BASE_URL}/notification/subscribe/${userInfo?.member_id}`
    );

    eventSource.addEventListener("sse", (event) => {
      const eventData = JSON.parse(event.data);
      console.log("message: " + eventData.message);
      console.log("unreadChatCount: " + eventData.unreadChatCount);
      setUnreadChatCount(eventData.unreadChatCount);
    });

    eventSource.onerror = (error) => {
      console.error("SSE connection error:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [userInfo?.member_id]);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setShowBubble(false);
  //   }, 5000);

  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [userInfo?.member_id]);

  return (
    <Container>
      <IconPannels>
        <Icon>
          <Link href="/main">
            <FontAwesomeIcon icon={faHouse} fontSize={"24px"} />
          </Link>
        </Icon>
        <Icon>
          <Link href="/explore">
            <FontAwesomeIcon icon={faMagnifyingGlass} fontSize={"24px"} />
          </Link>
        </Icon>
        <Icon>
          <Link href="/main">
            <FontAwesomeIcon icon={faFilm} fontSize={"24px"} />
          </Link>
        </Icon>
        {showBubble && unreadChatCount > 0 ? (
          <Icon>
            <Link href="/direct">
              <FontAwesomeIcon icon={faPaperPlane} fontSize={"24px"} />
            </Link>
            <SpeechBubble>
              <NotiCount>{unreadChatCount}</NotiCount>
            </SpeechBubble>
          </Icon>
        ) : (
          <Icon>
            <Link href="/direct">
              <FontAwesomeIcon icon={faPaperPlane} fontSize={"24px"} />
            </Link>
          </Icon>
        )}
        <Icon>
          <Link href="/my">
            <FontAwesomeIcon icon={faUser} fontSize={"24px"} />
          </Link>
        </Icon>
      </IconPannels>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 49px;
  padding: 0 16px;
  border-top: 1px solid #e2e2e2;
  position: absolute;
  bottom: 0;
  background-color: #fff;
`;

const IconPannels = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const Icon = styled.div`
  position: relative;
  padding: 12px;
`;

const SpeechBubble = styled.div`
  position: absolute;
  top: 13px;
  right: 3px;
  width: 15px;
  height: 15px;
  border: 1px solid #ffffff;
  border-radius: 100%;
  background-color: #ff3040;
`;

const NotiCount = styled.span`
  display: flex;
  color: #ffffff;
  font-weight: 400;
  justify-content: center;
`;

export default Footer;
