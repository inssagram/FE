import { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";

const Container = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
`;

const Message = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 44px;
  margin: 16px;
  border-radius: 22px;
  border: 1px solid #ccc;
  background-color: #fff;
`;

const Input = styled.input`
  display: flex;
  padding-left: 10px;
  width: 100%;
  border: none;
  outline: none;
  font-size: 16px;
  color: #222;
  background-color: transparent;
`;

const ImageIcon = styled.a`
  padding: 10px;
`;

interface DirectMessageProps {
  onMessageSend: (message: string) => void;
}

const DirectMessage: React.FC<DirectMessageProps> = ({ onMessageSend }) => {
  const [message, setMessage] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSendClick = () => {
    if (message.trim() !== "") {
      onMessageSend(message);
      setMessage("");
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSendClick();
    }
  };

  return (
    <>
      <Container>
        <Message>
          <Input
            placeholder="메시지 입력..."
            value={message}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          <ImageIcon>
            <FontAwesomeIcon icon={faImage} fontSize={24} />
          </ImageIcon>
        </Message>
      </Container>
    </>
  );
};

export default DirectMessage;
