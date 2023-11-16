import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import * as SC from "@/components/styled/header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus, faHeart } from "@fortawesome/free-regular-svg-icons";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { RootState } from "@/src/redux/Posts/store";

interface HeaderProps {
  setSelectedImage: (src: string) => void;
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

  const createBoards = () => {
    router.push("create/details");
  };

  return (
    <SC.Container>
      <SC.Title>
        <Link href="/">Inssagram</Link>
      </SC.Title>
      <SC.IconPannels>
        <SC.PlusBtn id="createBoards" onClick={createBoards}>
          <FontAwesomeIcon icon={faSquarePlus} fontSize={"24px"} />
        </SC.PlusBtn>
        {unreadCount > 0 && <SC.NotiAlarm />}
        {showBubble && unreadCount > 0 ? (
          <SC.HeartBtn>
            <Link href="/notifications">
              <FontAwesomeIcon icon={faHeart} fontSize={"24px"} />
            </Link>
            <SC.SpeechBubble>
              <FontAwesomeIcon
                icon={faComment}
                fontSize={"18px"}
                flip="horizontal"
              />
              <SC.NotiCount>{unreadCount}</SC.NotiCount>
            </SC.SpeechBubble>
          </SC.HeartBtn>
        ) : (
          <SC.HeartBtn>
            <Link href="/notifications">
              <FontAwesomeIcon icon={faHeart} fontSize={"24px"} />
            </Link>
          </SC.HeartBtn>
        )}
      </SC.IconPannels>
    </SC.Container>
  );
};

export default Header;
