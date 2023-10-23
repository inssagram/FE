import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import DirectInHeader from "../../../components/atoms/DirectInHeader";
import DirectPartner from "../../../components/atoms/DirectPartner";
import DirectMessage from "@/components/input/DirectMessage/DirectMessage";
import DmContentsList from "@/components/list/DmContentsList";

interface Partner {
  id: number;
  name: string;
  userId: string;
  profileUrl: string;
}

const In: React.FC = () => {
  const [partner, setPartner] = useState<Partner | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const router = useRouter();
  const { id } = router.query;

  const handleSendMessage = (message: string, images: File[]) => {
    setMessages([...messages, message]);
    setSelectedImages(images);
    console.log(`전달된 메시지: ${message}`);
  };

  useEffect(() => {
    if (id) {
      axios
        .get<Partner>(`http://localhost:3001/accounts/${id}`)
        .then((response) => {
          setPartner(response.data);
        })
        .catch((error) => {
          console.error("데이터를 불러오는 중 오류 발생:", error);
        });
    }
  }, [id]);

  return (
    <>
      {partner && (
        <>
          <DirectInHeader selectedItem={partner} />
          <DirectPartner selectedItem={partner} />
          <DmContentsList messages={messages} selectedImages={selectedImages} />
          <DirectMessage onMessageSend={handleSendMessage} />
        </>
      )}
    </>
  );
};

export default In;