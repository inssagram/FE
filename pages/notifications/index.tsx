import Image from "next/image";
import { useState, useEffect } from "react";
import * as SC from "@/components/styled/notifications";
import { PageHeader } from "@/components/atoms/Header";
import getNotificationAllAxios from "@/services/notificationInfo/getNotificationAll";

interface NotificationData {
  senderName: string;
  createdAt: string;
  message: string;
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
              <Image
                src="/images/noProfile.jpg"
                alt="프로필"
                width={44}
                height={44}
                style={{ borderRadius: "100%" }}
              />
            </SC.Account>
            <SC.Content>
              {/* {notification.senderName} */}
              {notification.message} 2시간
            </SC.Content>
            <SC.Board>
              <Image
                src="/images/noImage.svg"
                alt="게시물"
                width={44}
                height={44}
              />
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
