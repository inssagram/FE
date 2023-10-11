import React from "react";
import Link from "next/link";
import { useState, useRef } from "react";
import axios from "axios";
import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus, faHeart } from "@fortawesome/free-regular-svg-icons";

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
  border-style: none;
  background-color: transparent;
`;

interface HeaderProps {
  setSelectedImage: (src: string) => void;
}

const Header: React.FC<HeaderProps> = (props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const createBoards = () => {
    fileInputRef.current?.click();
  };
  const [selectedImage, setSelectedImage] = useState<string>("");
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // 파일 선택하더라도 아래 이미지 주소만 사용하려고 테스트 중임다
    const fixedImageSrc =
      "https://www.animals.or.kr/api/files/images/51386-cb98b35c-a5ac-484c-b365-f73e8263bd05.png";
    setSelectedImage(fixedImageSrc);

    localStorage.setItem("selectedImage", fixedImageSrc);
    try {
      const response = await axios.post("http://localhost:4000/posts", {
        image: fixedImageSrc,
      });
      if (response.status === 201) {
        alert("Image uploaded!");
      }
    } catch (error) {
      alert("Failed to upload the image");
    }
  };

  return (
    <Container>
      <Title>Inssagram</Title>
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
        <HeartBtn>
          <Link href="/notifications">
            <FontAwesomeIcon icon={faHeart} fontSize={"24px"} />
          </Link>
        </HeartBtn>
      </IconPannels>
    </Container>
  );
};

export default Header;
