import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquarePlus,
  faHeart,
  faClone,
} from "@fortawesome/free-regular-svg-icons";
import { faComment, faTable } from "@fortawesome/free-solid-svg-icons";
import * as SC from "@/components/styled/header";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@/src/redux/Posts/store";
import { createEventSource } from "@/hook/connectSSE";

interface HeaderProps {
  setSelectedImage: (src: string) => void;
}

const Header: React.FC<HeaderProps> = () => {
  const userInfo = useSelector((state: RootState) => state.user.member);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [showBubble, setShowBubble] = useState<boolean>(true);
  const router = useRouter();
  const [isModal, setIsModal] = useState(false);
  const modalRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const eventSource = createEventSource(
      userInfo?.member_id,
      (eventData: any) => {
        console.log("Header message: " + eventData.message);
        console.log("new post alarm: " + eventData.unreadCount);

        if (eventData.unreadCount !== undefined) {
          setUnreadCount(eventData.unreadCount);
        }
      }
    );
    return () => {
      eventSource.close();
    };
  }, [userInfo?.member_id]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBubble(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [userInfo?.member_id]);

  const createBoards = () => {
    setIsModal(true);
  };

  useEffect(() => {
    const handleModal = (e: React.MouseEvent<HTMLDivElement>) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setIsModal(false);
      }
    };
    document.addEventListener("click", (e: any) => handleModal(e));
    return () => {
      document.removeEventListener("click", (e: any) => handleModal(e));
    };
  }, [modalRef]);

  const handleRouter = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const className = target.className;
    console.log(className);
    if (className.includes("Board")) {
      router.push("/create/details");
    } else if (className.includes("Story")) {
      router.push("/create/story");
    }
  };

  return (
    <SC.Container>
      <SC.Title>
        <Link href="/main">Inssagram</Link>
      </SC.Title>
      <SC.IconPannels>
        <SC.PlusBtn id="createBoards" ref={modalRef} onClick={createBoards}>
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
      {isModal ? (
        <SC.Modal
          onClick={(e: React.MouseEvent<HTMLDivElement>) => handleRouter(e)}
        >
          <SC.CreateBoard>
            게시글 추가
            <FontAwesomeIcon icon={faTable} />
          </SC.CreateBoard>
          <SC.CreateStory>
            스토리 추가
            <FontAwesomeIcon icon={faClone} />
          </SC.CreateStory>
        </SC.Modal>
      ) : null}
    </SC.Container>
  );
};

export default Header;
