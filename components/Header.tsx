import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus, faHeart } from "@fortawesome/free-regular-svg-icons";
import * as SC from "../components/styledHeader";

const Header: React.FC = () => {
  return (
    <SC.Header>
      <h1>Instagram</h1>
      <SC.IconPannels>
        <FontAwesomeIcon icon={faSquarePlus} />
        <FontAwesomeIcon icon={faHeart} />
      </SC.IconPannels>
    </SC.Header>
  );
};

export default Header;
