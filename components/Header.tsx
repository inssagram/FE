import axios from "axios";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus, faHeart } from "@fortawesome/free-regular-svg-icons";

interface HeaderProps {
  setSelectedImage: (src: string) => void;
}

const Header: React.FC<HeaderProps> = (props) => {
  const [notificationCount, setNotificationCount] = useState(null);
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const eventSource = new EventSource(
      `${process.env.BASE_URL}/notification/subscribe/1`
    );

    eventSource.addEventListener("sse", (event) => {
      const eventData = JSON.parse(event.data);
      console.log("message: " + eventData.message);
      console.log("unreadCount: " + eventData.unreadCount);
    });

    eventSource.onerror = (error) => {
      console.error("SSE connection error:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  const createBoards = () => {
    fileInputRef.current?.click();
  };
  const [selectedImage, setSelectedImage] = useState<string>("");
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // 파일 선택하더라도 아래 이미지 주소만 사용하려고 테스트 중임다
    const fixedImageSrc =
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Bradypus.jpg/450px-Bradypus.jpg";
    setSelectedImage(fixedImageSrc);

    localStorage.setItem("selectedImage", fixedImageSrc);
    try {
      const response = await axios.post("http://localhost:4000/posts", {
        image: fixedImageSrc,
      });
      if (response.status === 201) {
        alert("Image uploaded!");
        router.push("/create");
      }
    } catch (error) {
      alert("Failed to upload the image");
    }
  };

  const handleNotification = () => {
    setNotificationCount(notificationCount + 1);
  };

  const handleNotificationRead = () => {
    if (notificationCount > 0) {
      setNotificationCount(notificationCount - 1);
    }
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
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
          accept="image/*"
        />
        <HeartBtn onClick={handleNotificationRead}>
          <Link href="/notifications">
            <FontAwesomeIcon icon={faHeart} fontSize={"24px"} />
            {/* {notificationCount > 0 && <span>{notificationCount}</span>} */}
            <NotiCount>{notificationCount}</NotiCount>
            {/* <Modal></Modal> */}
          </Link>
        </HeartBtn>
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
`;

const HeartBtn = styled.button`
  position: relative;
  border-style: none;
  background-color: transparent;
`;

const NotiCount = styled.span`
  position: absolute;
  top: 0px;
  right: -1px;
  width: 10px;
  height: 10px;
  border: 1.5px solid #fff;
  border-radius: 50%;
  color: #ffffff;
  background-color: red;
`;
