import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { fileToDataUrl } from "@/utils/fileToDataUrl";

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

const DmContentsList: React.FC<{
  messages: string[];
  selectedImages: File[];
  contentRef: React.MutableRefObject<HTMLDivElement | null>;
}> = ({ messages, selectedImages, contentRef }) => {
  const [received, setReceived] = useState<string[]>([]);
  const [imageDataUrls, setImageDataUrls] = useState<string[]>([]);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      axios
        .get<{ received: string[] }>(`http://localhost:3001/messages/${id}`)
        .then((response) => {
          setReceived(response.data.received);
        })
        .catch((error) => {
          console.error("데이터를 불러오는 중 오류 발생:", error);
        });
    }
  }, [id]);

  useEffect(() => {
    const fetchImageUrls = async () => {
      const urls: string[] = await Promise.all(
        selectedImages.map(async (image) => await fileToDataUrl(image))
      );
      setImageDataUrls(urls);
    };

    if (selectedImages.length > 0) {
      fetchImageUrls();
    }
  }, [selectedImages]);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
      contentRef.current.focus();
    }
  }, [contentRef, messages, received]);

  return (
    <Content ref={contentRef}>
      <RecentTime>(일) 오후 12:00</RecentTime>
      {received && <OtherMessage>{received}</OtherMessage>}
      {selectedImages.length > 0 && (
        <>
          {imageDataUrls.map((dataUrl, index) => (
            <ImagePreview
              key={index}
              src={dataUrl}
              alt={`Selected Image ${index}`}
            />
          ))}
        </>
      )}
      {messages.map((message, index) => (
        <MyMessage key={index}>{message}</MyMessage>
      ))}
    </Content>
  );
};

export default DmContentsList;
