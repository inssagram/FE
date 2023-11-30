import { useState, useEffect } from "react";
import styled from "styled-components";
import { fileToDataUrl } from "@/utils/fileToDataUrl";
import {
  MemberInfoData,
  PreviousMessageData,
  SendNewMessageData,
} from "@/types/ChatRoomTypes";
import SharedPost from "@/components/Chat/SharedPost";

interface ChatRoomProps {
  userInfo: any;
  previousMessages: PreviousMessageData[];
  newMessage: SendNewMessageData[];
}

const ChatRoom: React.FC<ChatRoomProps> = ({
  userInfo,
  previousMessages,
  newMessage,
}) => {
  // const [imageDataUrls, setImageDataUrls] = useState<string[]>([]);

  // useEffect(() => {
  //   const fetchImageUrls = async () => {
  //     const urls: string[] = await Promise.all(
  //       images.map(async (image) => await fileToDataUrl(image))
  //     );
  //     setImageDataUrls(urls);
  //   };

  //   if (images.length > 0) {
  //     fetchImageUrls();
  //   }
  // }, [images]);

  // useEffect(() => {
  //   if (contentRef.current) {
  //     contentRef.current.scrollTop = contentRef.current.scrollHeight;
  //     contentRef.current.focus();
  //   }
  // }, [contentRef, messages, newMessage]);

  return (
    // <Content ref={contentRef}>
    <Content>
      <RecentTime>(일) 오후 12:00</RecentTime>
      {/* {images.length > 0 &&
        imageDataUrls.map((dataUrl, index) => (
          <ImagePreview
            key={index}
            src={dataUrl}
            alt={`Selected Image ${index}`}
          />
        ))} */}
      {previousMessages.map((message, index) => {
        return message.type === "message" ? (
          <MessageContainer key={index}>
            {message.senderMemberId === userInfo.member_id ? (
              <MyMessage>{message.message}</MyMessage>
            ) : (
              <OtherMessage>{message.message}</OtherMessage>
            )}
          </MessageContainer>
        ) : (
          <SharedPost key={index} {...message} />
        );
      })}

      {newMessage &&
        newMessage.map((message, index) => (
          <MessageContainer key={index}>
            <MyMessage>{message.message}</MyMessage>
          </MessageContainer>
        ))}
    </Content>
  );
};

export default ChatRoom;

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

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  width: 100%;
`;

const MyMessage = styled(Message)`
  color: #fff;
  background-color: #3797f0;
  align-self: flex-end;
`;

const OtherMessage = styled(Message)`
  background-color: #efefef;
  text-align: left;
  margin-right: auto;
  align-self: flex-start;
`;

const ImagePreview = styled.img`
  max-width: 235px;
  max-height: 200px;
  padding: 5px;
  border-radius: 20px;
`;
