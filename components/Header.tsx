import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus, faHeart } from "@fortawesome/free-regular-svg-icons";
import * as SC from "../components/styledHeader";
import { useRef } from "react";

const Header: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const createBoards = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      console.log(file);
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