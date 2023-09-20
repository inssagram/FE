import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faMagnifyingGlass, faFilm, faPaperPlane, faUser } from "@fortawesome/free-solid-svg-icons";
import * as SC from "../styles/index";

const Header: React.FC = () => {
  return (
    <SC.StyledFooter>
      <div className="footerBottom">
        <div className="iconPannels">
          <FontAwesomeIcon icon={faHouse} />
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          <FontAwesomeIcon icon={faFilm} />
          <FontAwesomeIcon icon={faPaperPlane} />
          <FontAwesomeIcon icon={faUser} />
        </div>
      </div>
    </SC.StyledFooter>
  );
};

export default Header;
