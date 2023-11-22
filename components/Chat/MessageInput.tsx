import { useState, useRef } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { MemberInfoData, SendNewMessageData } from "@/types/ChatRoomTypes";

interface MessageInputProps {
  roomId: number;
  chatRoom: {
    receiver: MemberInfoData | null;
  } | null;
  onEnterKeyPress: (messageData: SendNewMessageData) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({
  roomId,
  chatRoom,
  onEnterKeyPress,
}) => {
  const [messageValue, setMessageValue] = useState<string>("");
  const receiver = chatRoom?.receiver;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMessage = event.target.value;
    setMessageValue(newMessage);
  };

  const handleSendMessage = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (receiver && roomId && event.key === "Enter") {
      event.preventDefault();
      const messageData: SendNewMessageData = {
        type: "message",
        chatRoomId: roomId,
        receiverMemberId: receiver.memberId,
        message: messageValue,
      };
      onEnterKeyPress(messageData);
      setMessageValue("");
    }
  };

  // const handleSendImage = () => {
  //   const imageFile = /* 여기에 이미지 파일을 가져오는 코드 */
  //   const messageData: MessageData = {
  //     type: "message",
  //     chatRoomId: 123,
  //     receiverMemberId: 456,
  //     message: "",
  //   };
  //   onSendMessage(messageData);
  // };

  return (
    <>
      <Container>
        <Message>
          <Input>
            <TextInput
              type="text"
              placeholder="메시지 입력..."
              value={messageValue}
              onChange={handleInputChange}
              onKeyPress={handleSendMessage}
            />
            {/* <DirectBtn>
              <UploadBtn onClick={handleSendImage}>
                <ImageIcon icon={faImage} fontSize={"24px"} />
              </UploadBtn>
            </DirectBtn> */}
          </Input>
        </Message>
      </Container>
    </>
  );
};

export default MessageInput;

const Container = styled.div`
  position: fixed;
  bottom: 0;
  width: 380px;
  margin: 16px;
  display: flex;
  flex-direction: column;
`;

const Message = styled.div`
  width: 100%;
  min-height: 44px;
  border: 1px solid #ccc;
  border-radius: 20px;
  background-color: #fff;
`;
// ${({ filesSelected }) =>
//   filesSelected
//     ? css`
//         display: flex;
//         flex-direction: row;
//       `
//     : css`
//         display: flex;
//         flex-direction: column;
//       `};

const Input = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  min-height: 44px;
  padding: 0 16px 0 11px;
`;

const TextInput = styled.input`
  display: flex;
  padding-left: 10px;
  border: none;
  outline: none;
  font-size: 16px;
  color: #222;
  background-color: transparent;
`;

const ImageInput = styled.input`
  min-height: 100px;
  display: none;
`;

const DirectBtn = styled.div`
  display: flex;
  flex-direction: row;
`;

const UploadBtn = styled.button`
  border: none;
  outline: none;
  background-color: transparent;
`;

const SendBtn = styled.button`
  border: none;
  outline: none;
  margin-left: 3px;
  font-size: 14px;
  color: #0095f6;
  background-color: transparent;
`;

const ImageIcon = styled(FontAwesomeIcon)`
  padding: 10px;
`;

const PreviewContainer = styled.div`
  display: flex;
  flex-direction: row;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  width: 100%;
  padding: 12px;
  background-color: #fff;
`;

const ImagePreview = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 12px;
`;

const Image = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 5px;
`;

const CancelIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: -10px;
  right: -10px;
`;
