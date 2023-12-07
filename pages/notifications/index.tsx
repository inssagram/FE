import Image from "next/image";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { handleError } from "@/utils/errorHandler";
import { FollowButton } from "@/components/atoms/Button";
import { PageHeader } from "@/components/atoms/Header";
import getNotificationAllAxios from "@/services/notificationInfo/getNotificationAll";
import deleteNotificationAxios from "@/services/notificationInfo/deleteNotification";
import deleteNotificationAllAxios from "@/services/notificationInfo/deleteNotificationAll";
import postMemberFollowAxios from "@/services/userInfo/postMemberFollow";
import { NotificationData } from "@/types/NotificationTypes";

interface NotificationProps {}

const Notifications: React.FC<NotificationProps> = () => {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [deleteIconVisible, setDeleteIconVisible] = useState<
    Record<string, boolean>
  >({});
  const pageTitle = "알림";

  useEffect(() => {
    fetchNotificationAllData();
  }, []);

  const fetchNotificationAllData = async () => {
    try {
      const res = await getNotificationAllAxios();
      // 기본적으로 모든 알림 항목에 대해 삭제 아이콘 가시성을 비활성화
      const initialDeleteIconVisible = res.data.reduce(
        (acc: Record<number, boolean>, notification: NotificationData) => ({
          ...acc,
          [notification.id]: false,
        }),
        {}
      );
      setDeleteIconVisible(initialDeleteIconVisible);
      setNotifications(res.data);
    } catch (err) {
      handleError(err, "Error fetching notifications:");
    }
  };

  const handleFollowClick = async (followId: number) => {
    try {
      const res = await postMemberFollowAxios(followId);
      console.log("success", res);
      setIsFollowing((prevIsFollowing) => !prevIsFollowing);
    } catch (err) {
      handleError(err, "Error following member:");
    }
  };

  const handleDeleteNotificationAll = async () => {
    try {
      const res = await deleteNotificationAllAxios();
      console.log("delete all success", res);
      setNotifications(res);
    } catch (err) {
      handleError(err, "Error deleting notifications:");
    }
  };

  const handleDeleteNotification = async (id: number) => {
    try {
      await deleteNotificationAxios(id);

      // 삭제 버튼 가시성을 업데이트
      setDeleteIconVisible((prevDeleteIconVisible) => ({
        ...prevDeleteIconVisible,
        [id]: false,
      }));

      const updatedNotifications = notifications.filter(
        (notification) => notification.id !== id
      );
      setNotifications(updatedNotifications);
    } catch (err) {
      handleError(err, "Error deleting notifications:");
    }
  };

  const handleNotificationClick = (id: number) => {
    // 클릭한 알림 항목에 대한 삭제 아이콘 가시성을 토글합니다.
    setDeleteIconVisible(
      (prevDeleteIconVisible: { [key: number]: boolean }) => ({
        ...prevDeleteIconVisible,
        [id]: !prevDeleteIconVisible[id],
      })
    );
  };

  return (
    <>
      <PageHeader title={pageTitle} />
      <Container>
        {notifications.length > 0 ? (
          <>
            <DeleteAll>
              <DeleteBtn onClick={handleDeleteNotificationAll}>
                전체 지우기
              </DeleteBtn>
            </DeleteAll>
            <Date>오늘</Date>
          </>
        ) : (
          <Error>조회할 알림이 없습니다.</Error>
        )}
        {notifications &&
          notifications.map((notification, index) => (
            <ContentArea
              key={index}
              onClick={() => handleNotificationClick(notification.id)}
            >
              <Account>
                <Image
                  src={
                    notification.sender_image
                      ? notification.sender_image
                      : "/images/noProfile.jpg"
                  }
                  alt="프로필"
                  width={44}
                  height={44}
                  style={{ borderRadius: "100%" }}
                />
              </Account>
              <Content>
                {notification.message}
                {/* {notification.created_at} */}
              </Content>
              {notification.post_id === undefined ? (
                <FollowButton
                  onClick={() => handleFollowClick(notification.sender_id)}
                  isFollowing={isFollowing}
                />
              ) : (
                <Board>
                  <Image
                    src={
                      notification.post_image
                        ? notification.post_image
                        : "/images/noImage.svg"
                    }
                    alt="게시글"
                    width={44}
                    height={44}
                  />
                </Board>
              )}
              {deleteIconVisible[notification.id] && (
                <DeleteIcon
                  onClick={() => handleDeleteNotification(notification.id)}
                >
                  <FontAwesomeIcon
                    icon={faMinus}
                    fontSize={"16px"}
                    style={{ color: "#0095f6" }}
                  />
                </DeleteIcon>
              )}
            </ContentArea>
          ))}
      </Container>
    </>
  );
};

export default Notifications;

const Container = styled.div`
  position: absolute;
  top: 44px;
  width: 100%;
  margin-top: 20px;
`;

const DeleteAll = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 12px;
  padding-bottom: 5px;
`;

const DeleteBtn = styled.button`
  font-size: 15px;
  border: none;
  background-color: transparent;
`;

const Date = styled.span`
  display: inline-block;
  margin: 0 12px;
  padding-bottom: 16px;
  font-size: 16px;
`;

const ContentArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 8px 16px;
  gap: 3px;
`;

const Account = styled.div`
  margin-right: 14px;
  border-radius: 100%;
`;

const Content = styled.p`
  display: flex;
  min-width: 240px;
  height: 100%;
  font-size: 14px;
  align-items: center;
`;

const Board = styled.div`
  display: flex;
  margin-left: 8px;
`;

const DeleteIcon = styled.button`
  border: none;
  background-color: transparent;
  padding: 0 7px;
`;

const Error = styled.span`
  font-size: 14px;
  margin: 0 24px;
`;
