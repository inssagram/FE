import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

const Content = styled.div`
  font-size: 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 0 16px;
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
  width: 70px;
  height: 100px;
  background-color: #ebebeb;
  padding: 5px;
`;

const DmContentsList: React.FC<{
  messages: string[];
  selectedImages: string[];
}> = ({ messages, selectedImages }) => {
  const [recieved, setReceived] = useState<string[]>([]);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3001/messages/${id}`)
        .then((response) => {
          setReceived(response.data.received);
        })
        .catch((error) => {
          console.error("데이터를 불러오는 중 오류 발생:", error);
        });
    }
  }, [id]);

  return (
    <Content>
      <RecentTime>(일) 오후 12:00</RecentTime>
      {recieved && <OtherMessage>{recieved}</OtherMessage>}
      {messages.map((message, index) => (
        <MyMessage key={index}>{message}</MyMessage>
      ))}
      {selectedImages.map((image, index) => (
        <ImagePreview key={index} src={image} alt={`Selected Image ${index}`} />
      ))}
    </Content>
  );
};

export default DmContentsList;
