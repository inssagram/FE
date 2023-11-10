import { useState, useRef } from "react";
import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faTimesCircle } from "@fortawesome/free-regular-svg-icons";

interface MessageInputProps {
  onMessageSend: (message: string, images: File[]) => void;
  images: File[];
}
const MessageInput: React.FC<MessageInputProps> = ({
  onMessageSend,
  images,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [message, setMessage] = useState<string>("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSendClick = () => {
    if (message.trim() !== "" || selectedFiles.length > 0) {
      onMessageSend(message, selectedFiles);
      setMessage("");
      setSelectedFiles([]);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSendClick();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileList = Array.from(files);
      setSelectedFiles([...selectedFiles, ...fileList]);
    }
  };

  const handleCancel = (index: number) => {
    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);
  };

  const handleUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const ImagePreviews = () => {
    return (
      <PreviewContainer>
        {selectedFiles.map((file, index) => (
          <ImagePreview key={index}>
            <Image
              src={URL.createObjectURL(file)}
              alt={`이미지 미리보기 ${index}`}
            />
            <CancelIcon
              icon={faTimesCircle}
              fontSize={"18px"}
              onClick={() => handleCancel(index)}
            />
          </ImagePreview>
        ))}
      </PreviewContainer>
    );
  };

  return (
    <>
      <Container>
        <Message data-files-selected={selectedFiles.length > 0}>
          {selectedFiles.length > 0 && <ImagePreviews />}
          <Input>
            <TextInput
              type="text"
              placeholder="메시지 입력..."
              value={message}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
            />
            <ImageInput
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              ref={fileInputRef}
              multiple
            />
            <DirectBtn>
              <UploadBtn onClick={handleUpload}>
                <ImageIcon icon={faImage} fontSize={"24px"} />
              </UploadBtn>
              {selectedFiles.length > 0 && (
                <SendBtn onClick={handleSendClick}>보내기</SendBtn>
              )}
            </DirectBtn>
          </Input>
        </Message>
      </Container>
    </>
  );
};

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

  ${({ filesSelected }) =>
    filesSelected
      ? css`
          display: flex;
          flex-direction: row;
        `
      : css`
          display: flex;
          flex-direction: column;
        `};
`;

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

export default MessageInput;
