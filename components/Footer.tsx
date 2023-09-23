import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faMagnifyingGlass, faFilm, faPaperPlane, faUser } from "@fortawesome/free-solid-svg-icons";
import * as SC from "../components/styledFooter";

const Footer: React.FC = () => {
  return (
    <SC.Footer>
      <SC.IconPannels>
        <FontAwesomeIcon icon={faHouse} />
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        <FontAwesomeIcon icon={faFilm} />
        <FontAwesomeIcon icon={faPaperPlane} />
        <FontAwesomeIcon icon={faUser} />
      </SC.IconPannels>
    </SC.Footer>
  );
};

export default Footer;
