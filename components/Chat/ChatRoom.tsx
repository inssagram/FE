import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { fileToDataUrl } from "@/utils/fileToDataUrl";

const ChatRoom: React.FC<{
  messages: string[];
  images: File[];
  contentRef: React.MutableRefObject<HTMLDivElement | null>;
}> = ({ messages, images, contentRef }) => {
  const [imageDataUrls, setImageDataUrls] = useState<string[]>([]);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchImageUrls = async () => {
      const urls: string[] = await Promise.all(
        images.map(async (image) => await fileToDataUrl(image))
      );
      setImageDataUrls(urls);
    };

    if (images.length > 0) {
      fetchImageUrls();
    }
  }, [images]);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
      contentRef.current.focus();
    }
  }, [contentRef, messages, imageDataUrls]);

  return (
    <Content ref={contentRef}>
      <RecentTime>(일) 오후 12:00</RecentTime>
      {images.length > 0 &&
        imageDataUrls.map((dataUrl, index) => (
          <ImagePreview
            key={index}
            src={dataUrl}
            alt={`Selected Image ${index}`}
          />
        ))}
      {messages.map((message, index) => (
        <MessageContainer
          key={index}
          // mine={/* 여기에 적절한 조건을 추가하세요 */}
        >
          {/* {mine ? ( */}
          <MyMessage>{message}</MyMessage>
          {/* ) : ( */}
          <OtherMessage>{message}</OtherMessage>
          {/* )} */}
        </MessageContainer>
      ))}
    </Content>
  );
};

const Content = styled.div`
  font-size: 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 0 16px;
  height: 565px;
  overflow-y: auto;
`;

const RecentTime = styled.span`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 16px 20px;
  font-size: 12px;
`;

const Message = styled.div`
  max-width: 245px;
  padding: 8px;
  margin: 4px;
  border-radius: 8px;
`;

const MessageContainer = styled.div<{ mine?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${({ mine }) => (mine ? "flex-end" : "flex-start")};
  margin-bottom: 10px;
`;

const MyMessage = styled(Message)`
  color: #fff;
  background-color: #3797f0;
  align-self: flex-end;
`;

const OtherMessage = styled(Message)`
  background-color: #efefef;
  align-self: flex-start;
`;

const ImagePreview = styled.img`
  max-width: 235px;
  max-height: 200px;
  padding: 5px;
  border-radius: 20px;
`;

export default ChatRoom;
