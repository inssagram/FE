import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus, faHeart } from "@fortawesome/free-regular-svg-icons";
import * as SC from "../styles/index";

const Header: React.FC = () => {
  return (
    <SC.StyledHeader>
      <div className="headerTop">
        <h1>Instagram</h1>
        <div className="iconPannels">
          <FontAwesomeIcon icon={faSquarePlus} />
          <FontAwesomeIcon icon={faHeart} />
        </div>
      </div>
    </SC.StyledHeader>
  );
};

export default Header;
