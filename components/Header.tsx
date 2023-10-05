import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus, faHeart } from "@fortawesome/free-regular-svg-icons";
import * as SC from "../components/styledHeader";
import { useRef } from "react";
import axios from "axios";

const Header: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const createBoards = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // 파일 선택하더라도 정해진 이미지 주소만 사용
    const fixedImageSrc = "https://www.animals.or.kr/api/files/images/51386-cb98b35c-a5ac-484c-b365-f73e8263bd05.png";

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
    <SC.Header>
      <h1>Instagram</h1>
      <SC.IconPannels>
        <SC.Button id="createBoards" onClick={createBoards}>
          <FontAwesomeIcon icon={faSquarePlus} />
        </SC.Button>
        <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: "none" }} accept="image/*" />
        <SC.Button>
          <FontAwesomeIcon icon={faHeart} />
        </SC.Button>
      </SC.IconPannels>
    </SC.Header>
  );
};

export default Header;
