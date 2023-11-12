import Image from "next/image";
import { useState, useEffect } from "react";
import styled from "styled-components";
import * as SC from "@/components/styled/notifications";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { handleError } from "@/utils/errorHandler";
import { PageHeader } from "@/components/atoms/Header";
import getNotificationAllAxios from "@/services/notificationInfo/getNotificationAll";
import deleteNotificationAxios from "@/services/notificationInfo/deleteNotification";

interface NotificationData {
  id: number;
  created_at: string;
  friend_status: boolean;
  read_status: boolean;
  post_id: number;
  post_image: string;
  message: string;
  sender_id: number;
  sender_image: string;
  sender_name: string;
}

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [deleteIconVisible, setDeleteIconVisible] = useState(false);
  const [isSwiping, setIsSwiping] = useState(false);
  const [startX, setStartX] = useState(0);
  const pageTitle = "알림";

  // 알림 조회
  const fetchNotificationAllData = async () => {
    try {
      const res = await getNotificationAllAxios();
      setNotifications(res.data);
    } catch (err) {
      handleError(err, "Error fetching notifications:");
    }
  };

  // 알림 삭제
  const handleDeleteNotificationClick = async (id: number) => {
    try {
      const res = await deleteNotificationAxios(id);
    } catch (err) {
      handleError(err, "Error deleting notifications:");
    }
  };

  const handleSwipeStart = (e) => {
    setIsSwiping(true);
    setStartX(e.clientX || e.touches[0].clientX);
  };

  const handleSwipeMove = (e) => {
    if (!isSwiping) {
      return;
    }

    const currentX = e.clientX || e.touches[0].clientX;
    const diffX = startX - currentX;

    if (diffX > 100) {
      setDeleteIconVisible(true); // Keep the delete icon visible
      setIsSwiping(false);
    }
  };

  const handleSwipeEnd = () => {
    setIsSwiping(false);
    setDeleteIconVisible(deleteIconVisible);
  };

  useEffect(() => {
    fetchNotificationAllData();
  }, []);

  return (
    <>
      <PageHeader title={pageTitle} />
      <SC.Notifications>
        <SC.Date>오늘</SC.Date>
        {/* {notifications.map((notification, index) => (
          <SC.ContentArea
            key={index}
            onMouseDown={() => handleSwipeStart(index)}
            onMouseUp={handleSwipeEnd}
            onMouseLeave={handleSwipeEnd}
            onTouchStart={() => handleSwipeStart(index)}
            onTouchEnd={handleSwipeEnd}
            style={{
              width: "300px",
              height: "300px",
              backgroundColor: swipeStarted ? "green" : "red",
            }}
          >
            <SC.Account>
              {notification.sender_image ? (
                <Image
                  src={notification.sender_image}
                  alt="프로필"
                  width={44}
                  height={44}
                  style={{ borderRadius: "100%" }}
                />
              ) : (
                <Image
                  src="/images/noProfile.jpg"
                  alt="프로필"
                  width={44}
                  height={44}
                  style={{ borderRadius: "100%" }}
                />
              )}
            </SC.Account>
            <SC.Content>
              {notification.message} {notification.created_at}
            </SC.Content>
            <SC.Board
            // style={{ borderRadius: "100%", border: "1px solid #ccc" }}
            >
              <Image
                src={
                  notification.post_image
                    ? notification.post_image
                    : "/images/noImage.svg"
                }
                alt="프로필"
                width={44}
                height={44}
                style={{ borderRadius: "100%" }}
              />
            </SC.Board>
            {deleteIconVisible === index && (
              <SC.DeleteIcon onClick={handleDeleteNotificationClick}>
                <FontAwesomeIcon icon={faTrash} style={{ color: "#0095f6" }} />
              </SC.DeleteIcon>
            )}
          </SC.ContentArea>
        ))} */}
        <ContentArea
          onMouseDown={(e) => handleSwipeStart(e)}
          onMouseMove={(e) => handleSwipeMove(e)}
          onMouseUp={handleSwipeEnd}
          onTouchStart={(e) => handleSwipeStart(e)}
          onTouchMove={(e) => handleSwipeMove(e)}
          onTouchEnd={handleSwipeEnd}
        >
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
          {deleteIconVisible && (
            <SC.DeleteIcon onClick={handleDeleteNotificationClick}>
              <FontAwesomeIcon
                icon={faTrash}
                fontSize={"24px"}
                style={{ color: "#0095f6" }}
              />
            </SC.DeleteIcon>
          )}
        </ContentArea>
      </SC.Notifications>
    </>
  );
};

export default Notifications;

const ContentArea = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 60px;
  padding: 8px 16px;
  transform: ${({ isSwiping }) =>
    isSwiping
      ? "translateX(-100px)"
      : "none"}; /* Adjust the value to your preference */
  transition: transform 0.3s ease;
`;
