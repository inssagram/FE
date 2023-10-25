import { useState, useRef } from "react";
import * as SC from "./styled";
import { faImage, faTimesCircle } from "@fortawesome/free-regular-svg-icons";

interface DirectMessageProps {
  onMessageSend: (message: string, images: File[], imageUrls: string[]) => void;
  selectedImages: File[];
}

const DirectMessage: React.FC<DirectMessageProps> = ({
  onMessageSend,
  selectedImages,
}) => {
  const [message, setMessage] = useState<string>("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSendClick = () => {
    if (message.trim() !== "" || selectedFiles.length > 0) {
      onMessageSend(message, selectedFiles, []);
      setMessage("");
      setSelectedFiles([]);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
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

  const handleRemove = (index: number) => {
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
      <SC.PreviewContainer>
        {selectedFiles.map((file, index) => (
          <SC.ImagePreview key={index}>
            <SC.Image
              src={URL.createObjectURL(file)}
              alt={`이미지 미리보기 ${index}`}
            />
            <SC.CloseIcon
              icon={faTimesCircle}
              fontSize={18}
              onClick={() => handleRemove(index)}
            />
          </SC.ImagePreview>
        ))}
      </SC.PreviewContainer>
    );
  };

  return (
    <>
      <SC.Container>
        <SC.Message data-files-selected={selectedFiles.length > 0}>
          {selectedFiles.length > 0 && <ImagePreviews />}
          <SC.Input>
            <SC.TextInput
              type="text"
              placeholder="메시지 입력..."
              value={message}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
            />
            <SC.ImageInput
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              ref={fileInputRef}
              multiple
            />
            <SC.DirectBtn>
              <SC.UploadBtn onClick={handleUpload}>
                <SC.ImageIcon icon={faImage} fontSize={24} />
              </SC.UploadBtn>
              {selectedFiles.length > 0 && (
                <SC.SendBtn onClick={handleSendClick}>보내기</SC.SendBtn>
              )}
            </SC.DirectBtn>
          </SC.Input>
        </SC.Message>
      </SC.Container>
    </>
  );
};

export default DirectMessage;
