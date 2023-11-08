import Image from "next/image";
import { useState, useEffect } from "react";
import * as SC from "@/components/styled/notifications";
import { PageHeader } from "@/components/atoms/Header";
import getNotificationAllAxios from "@/services/notificationInfo/getNotificationAll";

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
  const pageTitle = "알림";
  const [notifications, setNotifications] = useState<NotificationData[]>([]);

  const fetchNotificationAllData = async () => {
    try {
      const response = await getNotificationAllAxios();
      setNotifications(response.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotificationAllData();
  }, []);

  return (
    <>
      <PageHeader title={pageTitle} />
      <SC.Notifications>
        <SC.Date>오늘</SC.Date>
        {notifications.map((notification, index) => (
          <SC.ContentArea key={index}>
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
              {notification.post_image ? (
                <Image
                  src={notification.post_image}
                  alt="프로필"
                  width={44}
                  height={44}
                  style={{ borderRadius: "100%" }}
                />
              ) : (
                <Image
                  src="/images/noImage.svg"
                  alt="프로필"
                  width={44}
                  height={44}
                  style={{ borderRadius: "100%" }}
                />
              )}
            </SC.Board>
          </SC.ContentArea>
        ))}
        {/* <SC.ContentArea>
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
        </SC.ContentArea> */}
      </SC.Notifications>
    </>
  );
};

export default Notifications;
